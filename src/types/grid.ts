// TypeScript types for AI Grid Layer Reservation System

export interface GridAccount {
  displayId: string;        // "GRID-HOME-US-TX-120457"
  tier: "HOME";             // Literal for now, expandable later
  country: string;          // "US"
  region: string;           // "TX"
  edition: "FoundingGrid";  // Marks early signups
  reservedAt: Date;
  activated: boolean;       // false initially (true when metering goes live)
  gridAddress: string;      // "ga:..." format
}

export interface Reservation {
  paid: boolean;
  amount: number;            // 10
  stripePaymentId: string;   // Stripe session or payment ID
  refundable: boolean;       // true
  createdAt: Date;
}

export interface EmailPreferences {
  productUpdates: boolean;   // default true for reservation users
  newsletter?: boolean;
  marketing?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  gridAccount?: GridAccount;
  reservation?: Reservation;
  emailPreferences?: EmailPreferences;
}

export interface GridAccountDocument {
  gridAccountId: string;     // "GRID-HOME-US-TX-120457" (doc id)
  uid: string;               // user uid
  tier: GridTier;
  country: GridCountry;
  region: GridRegion;
  serial: string;            // "120457"
  gridAddress: string;       // "ga:..."
  createdAt: Date;
  edition: "FoundingGrid";
}

export interface GridCounter {
  nextSerial: number;        // start at 100000 for HOME, increment by 1
}

export type GridTier = "HOME"; // Expandable later: "HOME" | "BUSINESS" | "ENTERPRISE"
export type GridCountry = "US"; // Expandable later
export type GridRegion = "TX" | "CA" | "NY" | "FL"; // Expandable later

export interface CreateGridAccountResult {
  gridAccountId: string;
  gridAddress: string;
  success: boolean;
  error?: string;
}

