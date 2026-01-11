/**
 * Gridnet Account Management
 * 
 * This module handles the creation and management of Gridnet accounts.
 * Each account gets a unique Grid ID in the format: GRID-HOME-US-TX-XXXXXX
 * 
 * Future expansion points:
 * - Add more tiers (BUSINESS, ENTERPRISE)
 * - Add more countries/regions
 * - Implement aiWh metering when ready
 * - Add usage tracking
 */

import { db } from '../../config/firebase';
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import type {
  GridAccount,
  GridAccountDocument,
  GridCounter,
  CreateGridAccountResult,
  GridTier,
  GridCountry,
  GridRegion
} from '../../types/grid';

/**
 * Generate a random 32-character hexadecimal string for grid address
 */
function generateGridAddress(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return 'ga:' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Pad a number to 6 digits
 */
function padSerial(serial: number): string {
  return serial.toString().padStart(6, '0');
}

/**
 * Create a new Gridnet account for a user
 * 
 * This function:
 * 1. Uses a Firestore transaction to atomically increment the counter
 * 2. Generates a unique Grid ID
 * 3. Creates a document in grid_accounts collection
 * 4. Updates the user's document with gridAccount data
 * 
 * @param userId - The Firebase Auth UID of the user
 * @param tier - Account tier (default: "HOME")
 * @param country - Country code (default: "US")
 * @param region - Region/state code (default: "TX")
 * @returns Result object with gridAccountId and success status
 */
export async function createGridAccountForUser(
  userId: string,
  tier: GridTier = "HOME",
  country: GridCountry = "US",
  region: GridRegion = "TX"
): Promise<CreateGridAccountResult> {
  try {
    // Check if user already has a grid account
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().gridAccount) {
      return {
        gridAccountId: userDoc.data().gridAccount.displayId,
        gridAddress: userDoc.data().gridAccount.gridAddress,
        success: true,
        error: 'User already has a grid account'
      };
    }

    // Counter document ID format: TIER_COUNTRY_REGION
    const counterKey = `${tier}_${country}_${region}`;
    const counterRef = doc(db, 'counters', counterKey);

    // Run transaction to get and increment counter
    const result = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      let serial: number;
      
      if (!counterDoc.exists()) {
        // Initialize counter starting at 100000 for HOME tier
        serial = 100000;
        const counterData: GridCounter = { nextSerial: serial + 1 };
        transaction.set(counterRef, counterData);
      } else {
        // Increment existing counter
        const data = counterDoc.data() as GridCounter;
        serial = data.nextSerial;
        transaction.update(counterRef, { nextSerial: serial + 1 });
      }

      // Build Grid Account ID
      const serialPadded = padSerial(serial);
      const displayId = `GRID-${tier}-${country}-${region}-${serialPadded}`;
      const gridAddress = generateGridAddress();

      // Create grid_accounts document
      const gridAccountDoc: GridAccountDocument = {
        gridAccountId: displayId,
        uid: userId,
        tier,
        country,
        region,
        serial: serialPadded,
        gridAddress,
        createdAt: serverTimestamp() as any, // Will be converted to Date
        edition: "FoundingGrid"
      };

      const gridAccountRef = doc(db, 'grid_accounts', displayId);
      transaction.set(gridAccountRef, gridAccountDoc);

      // Create gridAccount data for user document
      const gridAccount: GridAccount = {
        displayId,
        tier,
        country,
        region,
        edition: "FoundingGrid",
        reservedAt: serverTimestamp() as any, // Will be converted to Date
        activated: false,
        gridAddress
      };

      // Update user document with gridAccount
      transaction.update(userRef, {
        gridAccount,
        updatedAt: serverTimestamp()
      });

      return { displayId, gridAddress };
    });

    return {
      gridAccountId: result.displayId,
      gridAddress: result.gridAddress,
      success: true
    };

  } catch (error) {
    console.error('Error creating grid account:', error);
    return {
      gridAccountId: '',
      gridAddress: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get a user's grid account information
 */
export async function getUserGridAccount(userId: string): Promise<GridAccount | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().gridAccount) {
      return userDoc.data().gridAccount as GridAccount;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user grid account:', error);
    return null;
  }
}

/**
 * Check if a user has a valid reservation
 */
export async function userHasReservation(userId: string): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const reservation = userDoc.data().reservation;
      return reservation && reservation.paid === true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking user reservation:', error);
    return false;
  }
}

