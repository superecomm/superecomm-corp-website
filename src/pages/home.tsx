import { useState, useEffect } from "react";
import type { FC } from "react";
import { Menu, X, ChevronRight, ChevronDown, Zap, Brain, Plug, Shield, Database, Wallet, Coffee, Briefcase, Smartphone, Home as HomeIcon, ArrowRight, Users, Target, Network, Gauge, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import heroOffice from "../assets/hero-office.webp";
import meterImage from "../assets/aiWh-meter-transparent-background-new.png";
import productImage from "../assets/plusai-product-image-3.png";
import modelSelectorImage from "../assets/plusai-product-image-4.png";
import marketingImage24 from '../assets/marketing-images/marketing-image24.jpg';
import marketingImage34 from '../assets/marketing-images/marketing-image34.jpg';
import marketingImage29 from '../assets/marketing-images/marketing-image29.jpg';
import marketingImage27 from '../assets/marketing-images/marketing-image27.jpg';
import marketingImage230 from '../assets/marketing-images/marketing-image230.jpg';
import aiUtilityBillImage from '../assets/ai-utility-bill-image.png';
import aiGridLayerDiagram from '../assets/ai-grid-layer-digram.png';
import ReservePage from "./ReservePage";
import DashboardPage from "./DashboardPage";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { UserProfile } from "../types/grid";

type HomePageProps = {
  darkMode: boolean;
  onJoinEarlyAccess: () => void;
  onGoToSubsidiaries: () => void;
  openFaq: number | null;
  toggleFaq: (index: number) => void;
};

const HomePage: FC<HomePageProps> = ({
  darkMode,
  onJoinEarlyAccess,
  onGoToSubsidiaries,
  openFaq,
  toggleFaq,
}) => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section
      className="
        relative -mt-16 md:-mt-20
        overflow-hidden
        min-h-[75vh] md:min-h-[85vh]
        flex items-center
      "
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroOffice}
          alt="Team using laptops and collaborating in a modern workspace"
          className="w-full h-full object-cover"
        />
        {/* overlay so text is readable in light/dark */}
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-950/70 backdrop-blur-sm" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full px-6">
        <div className="max-w-5xl mx-auto text-center py-24 md:py-32">
          <h1
            className={`text-5xl md:text-7xl font-light mb-8 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Providing You With AI as a Utility
          </h1>
          <p
            className={`text-lg md:text-xl ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            One meter. One bill. All the AI you need.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onJoinEarlyAccess}
              className={`px-6 py-3 rounded-full text-sm font-medium shadow-sm
                ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
                transition-colors
              `}
            >
              Join Early Access
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Mission Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-light mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Our Mission
        </h2>
        <p
          className={`text-lg md:text-xl leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Super eComm is building the world’s AI utility grid — providing computational intelligence on tap for all mankind.
        </p>
      </div>
    </section>

    {/* Vision Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div
              className={`text-6xl font-light mb-4 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              aiWh
            </div>
            <h3
              className={`text-xl font-medium mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              The AI Utility Meter
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              AI Watt-Hours is how we measure your use of Ai and make it affordable for you on a daily basis  
            </p>
          </div>

          <div>
            <div
              className={`text-6xl font-light mb-4 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              1000+
            </div>
            <h3
              className={`text-xl font-medium mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              AI Models
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Access thousands of AI models through a single interface. One
              login, one bill, one solution.
            </p>
          </div>

          <div>
            <div
              className={`text-6xl font-light mb-4 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              ∞
            </div>
            <h3
              className={`text-xl font-medium mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Global Scale
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Building the infrastructure to empower human capability at
              global scale.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Why You Need This Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Meter - Top on mobile */}
          <div className="order-1 md:order-1 relative z-50">
            <div className={`relative w-full max-w-lg mx-auto p-8 rounded-lg z-50 ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}>
              <img
                src={meterImage}
                alt="aiWh Meter showing AI usage tracking"
                className="w-full h-auto drop-shadow-2xl relative z-50"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 md:order-2 relative z-50">
            {/* Punchy headline */}
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              You're Already on the AI Treadmill
            </h2>

            {/* Setup */}
            <p
              className={`text-xl mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Too many subscriptions. Too many accounts. Too many models.
            </p>

            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              AI is becoming like electricity — constant, essential, always running.
            </p>

            {/* Pain points - bullet list */}
            <div className="mb-8">
              <p
                className={`text-lg font-medium mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Today you:
              </p>
              <ul className="space-y-3">
                <li
                  className={`flex items-start text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">•</span>
                  <span>Pay multiple AI subscriptions every month</span>
                </li>
                <li
                  className={`flex items-start text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">•</span>
                  <span>Jump between ChatGPT, Claude, Gemini, Deepseek, Mid Journey, Dalle, LLama, Grok… and many more</span>
                </li>
                <li
                  className={`flex items-start text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">•</span>
                  <span>Buy credits, tokens, upgrades, plugins</span>
                </li>
                <li
                  className={`flex items-start text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">•</span>
                  <span>Manage limits, rate caps, and billing chaos</span>
                </li>
              </ul>
            </div>

            <p
              className={`text-lg mb-8 font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              And the price keeps rising.
            </p>

            {/* Data insight */}
            <div
              className={`p-6 rounded-lg mb-8 border-l-4 ${
                darkMode
                  ? "border-blue-500 bg-gray-900/50"
                  : "border-blue-600 bg-blue-50"
              }`}
            >
              <p
                className={`text-lg mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                The average person now pays for <span className="font-bold">2–5 AI tools</span>.
              </p>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Enterprises pay <span className="font-bold">dozens</span>.
              </p>
            </div>

            {/* Value proposition */}
            <div className="mb-8">
              <p
                className={`text-2xl font-light mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What if AI worked like electricity?
              </p>
              <p
                className={`text-xl font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                One meter. One bill. Unlimited power.
              </p>
              <p
                className={`text-2xl font-semibold ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                → The AI Utility Grid.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onJoinEarlyAccess}
                className={`w-full md:w-auto px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                  ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                  transition-all duration-200 transform hover:scale-105
                `}
              >
                Join the AI Grid
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* A Day In Life on the AI Grid Layer */}
    <section className="py-12 border-t border-gray-200 dark:border-gray-800 relative z-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className={`text-2xl md:text-3xl font-light mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          A Day In Life on the <span className="whitespace-nowrap">AI Grid Layer</span>
        </h2>

        {/* Compact 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* 6:30 AM */}
          <div className="space-y-2">
            <img 
              src={marketingImage24}
              alt="Morning AI assistant"
              className="w-full h-[140px] object-cover rounded-lg"
            />
            <div className="flex items-center gap-2">
              <Coffee className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6:30 AM
              </h3>
            </div>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              AI prepares your day while you sleep
            </p>
          </div>

          {/* 9:00 AM */}
          <div className="space-y-2">
            <img 
              src={marketingImage34}
              alt="Working with AI"
              className="w-full h-[140px] object-cover rounded-lg"
            />
            <div className="flex items-center gap-2">
              <Briefcase className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9:00 AM
              </h3>
            </div>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              1000+ models through your tools
            </p>
          </div>

          {/* 3:00 PM */}
          <div className="space-y-2">
            <img 
              src={marketingImage29}
              alt="AI on mobile"
              className="w-full h-[140px] object-cover rounded-lg"
            />
            <div className="flex items-center gap-2">
              <Smartphone className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3:00 PM
              </h3>
            </div>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              AI follows you everywhere
            </p>
          </div>

          {/* 7:00 PM */}
          <div className="space-y-2">
            <img 
              src={marketingImage27}
              alt="AI at home"
              className="w-full h-[140px] object-cover rounded-lg"
            />
            <div className="flex items-center gap-2">
              <HomeIcon className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7:00 PM
              </h3>
            </div>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Family shares, pay per aiWh
            </p>
          </div>

        </div>

        {/* Single CTA */}
        <div className="text-center mt-8">
          <button
            onClick={onJoinEarlyAccess}
            className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
          >
            Reserve Your <span className="whitespace-nowrap">AI Grid Layer</span> Account
          </button>
        </div>
      </div>
    </section>

    {/* What You Get Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto">
        <h3
          className={`text-3xl md:text-4xl font-light mb-12 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          What You Get When You Join +AI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Product Image - Left Column */}
                <div className="order-1 md:order-1 relative z-50">
                  <img
                    src={productImage}
                    alt="+AI App Interface showing unified AI access"
                    className="w-full h-auto relative z-50"
                  />
                </div>

                {/* Feature Cards - Right Column */}
                <div className="order-2 md:order-2 space-y-4 relative z-50">
                  {/* Feature 1: Unlimited AI Power */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-500/20" : "bg-blue-50"}`}>
                        <Zap className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          AI Power on Tap!
                        </h4>
                        <p
                          className={`text-base ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          One meter. One bill. 1000+ models behind one interface.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 2: Intelligent Routing */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-500/20" : "bg-purple-50"}`}>
                        <Brain className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Intelligent Routing (aiWh)
                        </h4>
                        <p
                          className={`text-base ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Tasks automatically route across the AI Grid to the most efficient model.
                        </p>
                        <p
                          className={`text-sm mt-1 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          The grid finds the right model for every task.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3: Plug Into The AI Grid */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-green-500/20" : "bg-green-50"}`}>
                        <Plug className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Plug Into The AI Grid
                        </h4>
                        <p
                          className={`text-base ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          No more subscriptions, tokens, plugins — one account, one interface.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 4: Cyber Security */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-red-500/20" : "bg-red-50"}`}>
                        <Shield className={`w-6 h-6 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Cyber Security
                        </h4>
                        <p
                          className={`text-base ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Your data, identity, and work protected by default.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 5: Unified Memory & History */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-indigo-500/20" : "bg-indigo-50"}`}>
                        <Database className={`w-6 h-6 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Unified Memory & History
                        </h4>
                        <p
                          className={`text-base ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Keep all conversations and work across models in one place.
                        </p>
                        <p
                          className={`text-sm mt-1 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Your AI remembers — across every model.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature 6: Budget Alerts & Spend Control */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-emerald-500/20" : "bg-emerald-50"}`}>
                        <Wallet className={`w-6 h-6 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-lg font-semibold mb-1 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Budget Alerts & Spend Control
                        </h4>
                        <p
                          className={`text-base ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Set usage limits, track consumption, and avoid runaway costs.
                        </p>
                        <p
                          className={`text-sm mt-1 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Never overspend. You stay in control.
                        </p>
                      </div>
                    </div>
                  </div>
          </div>
        </div>
      </div>
    </section>

    {/* Model Selection Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-light mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            1000+ AI Models at Your Fingertips
          </h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Choose manually or let the AI Grid route intelligently
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Model Selector Image */}
          <div className="order-2 md:order-1">
            <img
              src={modelSelectorImage}
              alt="AI Model Selector showing 1000+ available models"
              className="w-full h-auto relative z-50"
            />
          </div>

          {/* Explanation */}
          <div className="order-1 md:order-2">
            <div className="space-y-8">
              {/* Manual Selection */}
              <div>
                <h3
                  className={`text-2xl font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Manual Selection
                </h3>
                <p
                  className={`text-lg mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  You choose the model. Full control.
                </p>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Pick from ChatGPT, Claude, Gemini, Llama, Grok, and 1000+ more models. Switch between them instantly. No new subscriptions. No new logins. One interface. One bill.
                </p>
              </div>

              {/* Intelligent Routing */}
              <div>
                <h3
                  className={`text-2xl font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Intelligent Routing
                </h3>
                <p
                  className={`text-lg mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The AI Grid chooses for you. Optimal performance.
                </p>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Like Cursor, the system analyzes your task and automatically routes it to the most efficient model — balancing speed, cost, and quality. You get the best result without thinking about it.
                </p>
              </div>

              {/* aiWh Metering */}
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  darkMode
                    ? "border-blue-500 bg-gray-900/50"
                    : "border-blue-600 bg-blue-50"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  <strong>aiWh Metering:</strong> Whether you choose manually or let the grid route automatically, every task is metered in aiWh — so you only pay for the intelligence you actually use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Products Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-light mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Products
        </h2>

        <div
          className={`border rounded-lg p-8 ${
            darkMode
              ? "border-gray-700 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center mb-4">
            <span
              className={`text-3xl font-bold mr-3 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              +
            </span>
            <h3
              className={`text-2xl font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              AI App
            </h3>
          </div>
          <p
            className={`text-lg mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            The Power of 1000 AI Models in Your Pocket
          </p>
          <p
            className={
              darkMode ? "text-gray-400 mb-6" : "text-gray-600 mb-6"
            }
          >
            Top talent from aroud the world developing AI as a utility. Go from juggling mutliple subscriptions to a single workspace and a single bill instantly. 
          </p> 
          <button
            onClick={onGoToSubsidiaries}
            className={`flex items-center text-sm ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            Learn more <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800 relative z-50">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-light mb-4 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          FAQ
        </h2>
        
        <div className="mt-12 space-y-4">
          {/* FAQ 1 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(0)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What is aiW and aiWh?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 0 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 0 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>aiW (Artificial Intelligence Watt)</strong> is a unit that measures computational work performed by AI — similar to how watts measure electrical power.
                </p>
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>aiWh (Artificial Intelligence Watt-Hour)</strong> measures AI power consumption over time — similar to kWh in electricity.
                </p>
                <p
                  className={`font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  In simple terms: aiWh tracks how much intelligence you use — like a power meter for AI.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(1)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What is the AI Grid Layer?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 1 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 1 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The AI Grid Layer is the utility infrastructure that routes, meters, and distributes AI computation across multiple models and systems.
                </p>
                <p
                  className={`mb-4 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  It acts like the electrical grid — but for intelligence.
                </p>
                <p
                  className={`mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Instead of subscribing to several AI platforms separately, the AI Grid lets you:
                </p>
                <ul
                  className={`list-disc list-inside space-y-1 ml-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>access many models through one interface</li>
                  <li>route tasks intelligently to the best model</li>
                  <li>meter usage like electricity</li>
                  <li>receive one unified bill instead of many</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(2)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What does your company do?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 2 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 2 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={` ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Super eComm is building the world's AI Utility Grid, providing computational intelligence on tap so anyone can access and run 1,000+ AI models in their pocket — instantly and affordably.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(3)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                How big is the market?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 3 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 3 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={` ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  The global artificial intelligence market is projected to exceed <strong className={darkMode ? "text-white" : "text-gray-900"}>$1.8 trillion by 2030</strong>, driven by exponential growth in consumer AI demand, distributed computation, and intelligent infrastructure adoption across every industry.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(4)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What makes Super eComm unique?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 4 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 4 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  We're not building another AI app.
                </p>
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  We are developing <strong className={darkMode ? "text-white" : "text-gray-900"}>AI as a utility</strong> — complete with metering, billing, and distribution, similar to electricity or the internet.
                </p>
                <p
                  className={`font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  One grid. One meter. One bill.<br />
                  Access to intelligence becomes a public utility.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 6 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(5)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Where are you today?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 5 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 5 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  We are building the core aiWh metering architecture, developing multi-model orchestration, and designing the +AI interface that brings "1,000 AI models in your pocket" to everyday people and businesses.
                </p>
                <p
                  className={`font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Early access is coming soon.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 7 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(6)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Are you raising capital?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 6 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 6 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={` ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Super eComm is raising <strong className={darkMode ? "text-white" : "text-gray-900"}>$___</strong> to scale engineering, finalize distributed metering infrastructure, and launch early access to the AI Utility Grid.
                </p>
                <p
                  className={`text-sm mt-2 ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  (Optional — fill in amount when ready.)
                </p>
              </div>
            )}
          </div>

          {/* FAQ 8 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(7)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What market are you in?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 7 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 7 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Super eComm operates in the <strong className={darkMode ? "text-white" : "text-gray-900"}>AI Infrastructure & Utility Market</strong>, specifically the emerging category of AI as a Utility — where artificial intelligence is delivered like electricity or internet access.
                </p>
                <p
                  className={`mb-2 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Not SaaS.<br />
                  Not just AI apps.
                </p>
                <p
                  className={`font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  We are AI distribution, metering, and compute delivery infrastructure.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 9 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(8)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Why Texas?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 8 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 8 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Super eComm began in the Founder Institute Austin 2025 cohort, and we chose to build here because Texas is quietly becoming one of the most important regions for AI infrastructure in the U.S. With strong data center growth, access to power, and supportive conditions for compute expansion, Texas is a practical launch point for the AI Utility Grid.
                </p>
                <p
                  className={`mb-2 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Key reasons we're starting here:
                </p>
                <ul
                  className={`list-disc list-inside space-y-1 ml-4 mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>Founded in Austin, TX through Founder Institute</li>
                  <li>Texas is gaining momentum as an AI infrastructure hub</li>
                  <li>Over 400 operating data centers across the state</li>
                  <li>Major tech investment (including Google's $40B commitment)</li>
                  <li>Large-scale buildouts such as the Stargate project</li>
                  <li>Data capacity in Dallas–Fort Worth projected to double by 2026</li>
                  <li>Energy resources and land availability support long-term scale</li>
                </ul>
                <p
                  className={`font-medium italic ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Texas was once the oil state, then the energy state — now it has the potential to become a leader in AI infrastructure, and we're building alongside that growth.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 10 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(9)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Are you another AI app like ChatGPT?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 9 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 9 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No. +AI is not "just another AI chatbot."
                </p>
                <div
                  className={`mb-4 space-y-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <p>ChatGPT = app</p>
                  <p>Claude/Gemini = model</p>
                  <p>AWS/Azure = cloud</p>
                  <p className="font-semibold">+AI = the utility layer on top of all of them</p>
                </div>
                <p
                  className={` ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  We route, meter, and deliver compute across many AI models using aiWh, similar to how power companies route electricity across the grid.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 11 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(10)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                If not SaaS, then what are you?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 10 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 10 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  We are an AI utility provider — like a power company, but for intelligence.
                </p>
                <div
                  className={`mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <p className="mb-2">SaaS = sells features</p>
                  <p className="font-semibold">AI Utility = sells computation (aiWh)</p>
                </div>
                <p
                  className={`font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Think: AI → on tap. Pay only for what you use. Like electricity.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 12 */}
          <div
            className={`border rounded-lg overflow-hidden ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFaq(11)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-50 bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Why build AI as a Utility now?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 11 ? "rotate-180" : ""
                } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {openFaq === 11 && (
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "border-gray-700 bg-gray-900/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`mb-4 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Because the infrastructure moment is happening:
                </p>
                <ul
                  className={`list-disc list-inside space-y-1 ml-4 mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>Cloud + GPU spending is exploding</li>
                  <li>Data centers are accelerating especially in Texas</li>
                  <li>Multi-model use is becoming normal</li>
                  <li>Businesses don't want subscription chaos — they want one bill</li>
                  <li>Real-time compute metering is missing from the industry</li>
                </ul>
                <div
                  className={`space-y-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <p>Electricity had <strong className={darkMode ? "text-white" : "text-gray-900"}>kWh</strong></p>
                  <p>AI will have <strong className={darkMode ? "text-white" : "text-gray-900"}>aiWh</strong></p>
                </div>
                <p
                  className={`mt-4 font-medium italic ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  And you are the one defining the standard.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is aiW and aiWh?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "aiW (Artificial Intelligence Watt) is a unit that measures computational work performed by AI — similar to how watts measure electrical power. aiWh (Artificial Intelligence Watt-Hour) measures AI power consumption over time — similar to kWh in electricity. In simple terms: aiWh tracks how much intelligence you use — like a power meter for AI."
                }
              },
              {
                "@type": "Question",
                "name": "What is the AI Grid Layer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The AI Grid Layer is the utility infrastructure that routes, meters, and distributes AI computation across multiple models and systems. It acts like the electrical grid — but for intelligence. Instead of subscribing to several AI platforms separately, the AI Grid lets you: access many models through one interface, route tasks intelligently to the best model, meter usage like electricity, and receive one unified bill instead of many."
                }
              },
              {
                "@type": "Question",
                "name": "What does your company do?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Super eComm is building the world's AI Utility Grid, providing computational intelligence on tap so anyone can access and run 1,000+ AI models in their pocket — instantly and affordably."
                }
              },
              {
                "@type": "Question",
                "name": "How big is the market?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The global artificial intelligence market is projected to exceed $1.8 trillion by 2030, driven by exponential growth in consumer AI demand, distributed computation, and intelligent infrastructure adoption across every industry."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Super eComm unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We're not building another AI app. We are developing AI as a utility — complete with metering, billing, and distribution, similar to electricity or the internet. One grid. One meter. One bill. Access to intelligence becomes a public utility."
                }
              },
              {
                "@type": "Question",
                "name": "Where are you today?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are building the core aiWh metering architecture, developing multi-model orchestration, and designing the +AI interface that brings '1,000 AI models in your pocket' to everyday people and businesses. Early access is coming soon."
                }
              },
              {
                "@type": "Question",
                "name": "Are you raising capital?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Super eComm is raising capital to scale engineering, finalize distributed metering infrastructure, and launch early access to the AI Utility Grid."
                }
              },
              {
                "@type": "Question",
                "name": "What market are you in?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Super eComm operates in the AI Infrastructure & Utility Market, specifically the emerging category of AI as a Utility — where artificial intelligence is delivered like electricity or internet access. Not SaaS. Not just AI apps. We are AI distribution, metering, and compute delivery infrastructure."
                }
              },
              {
                "@type": "Question",
                "name": "Why Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Super eComm began in the Founder Institute Austin 2025 cohort. Texas is quietly becoming one of the most important regions for AI infrastructure in the U.S. With over 400 operating data centers, major tech investment (including Google's $40B commitment), and the Stargate project, Texas offers strong data center growth, access to power, and supportive conditions for compute expansion."
                }
              },
              {
                "@type": "Question",
                "name": "Are you another AI app like ChatGPT?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. +AI is not 'just another AI chatbot.' ChatGPT = app, Claude/Gemini = model, AWS/Azure = cloud, +AI = the utility layer on top of all of them. We route, meter, and deliver compute across many AI models using aiWh, similar to how power companies route electricity across the grid."
                }
              },
              {
                "@type": "Question",
                "name": "If not SaaS, then what are you?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are an AI utility provider — like a power company, but for intelligence. SaaS sells features. AI Utility sells computation (aiWh). Think: AI on tap. Pay only for what you use. Like electricity."
                }
              },
              {
                "@type": "Question",
                "name": "Why build AI as a Utility now?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Because the infrastructure moment is happening: Cloud + GPU spending is exploding, data centers are accelerating especially in Texas, multi-model use is becoming normal, businesses don't want subscription chaos — they want one bill, and real-time compute metering is missing from the industry. Electricity had kWh. AI will have aiWh. And you are the one defining the standard."
                }
              }
            ]
          })
        }}
      />
    </section>
  </div>
);

const SupereCommWebsite = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      setCurrentPage("home");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Listen to auth state changes and load user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Load user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-menu-container')) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const navigation = [
    { name: "Home", id: "home" as const },
    { name: "Plans & Pricing", id: "plans-pricing" as const },
    { name: "How It Works", id: "how-it-works" as const },
    { name: "Careers", id: "careers" as const },
    { name: "Support", id: "support" as const },
    { name: "Contact", id: "contact" as const },
    // Hidden from public - Founder's Letter
    // {
    //   name: "Investors",
    //   items: [{ name: "Founders' Letters", id: "founders-letters" as const }],
    // },
    { name: "Subsidiaries", id: "subsidiaries" as const },
  ];

  const FoundersLettersPage = () => (
    <div className="min-h-screen px-4 sm:px-6 py-16 sm:py-24">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-light mb-4 leading-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            The Pivot
          </h1>
          <div className={`flex items-center gap-4 text-sm ${
            darkMode ? "text-gray-500" : "text-gray-500"
          }`}>
            <span>Founder's Letter</span>
            <span>•</span>
            <span>December 2025</span>
          </div>
        </header>

        {/* Essay Content */}
        <div className="space-y-8">
          {/* Opening */}
          <p className={`text-lg sm:text-xl leading-relaxed first-letter:text-5xl first-letter:font-light first-letter:mr-1 first-letter:float-left ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            I founded Super eComm in Texas on August 11th, 2025, guided by a single intuition: the output we get from AI — computational intelligence — will become the highest-grossing commodity in global ecommerce for the next 100 years.
          </p>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            At the time of this writing, the average person already pays for three separate AI subscriptions. In less than half a decade, the AI market has surged toward $100 billion — over $70 billion more than the entire global music industry earned in 2024. Early on, AI helped me accomplish in weeks what once took months — then weeks became days, days became hours. My gut told me we were witnessing the birth of the next great utility.
          </p>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Growing up in Mobile, Alabama, hurricanes often knocked out our power for hours — sometimes days. We lit kerosene lamps until the lights returned. As the storm roared, my mother would whisper, "hush… the Lord is talking," and we'd sit quietly, watching the storm like a Netflix special. I would read or craft comic books — sunlight by day, moonlight by night. I still remember the moment the lights snapped back on — how it felt like civilization rebooting.
          </p>

          <div className={`py-6 my-8 border-l-4 pl-6 ${
            darkMode ? "border-blue-500 bg-blue-500/5" : "border-blue-600 bg-blue-50"
          }`}>
            <p className={`text-xl sm:text-2xl font-light italic ${
              darkMode ? "text-blue-300" : "text-blue-900"
            }`}>
              That is exactly how AI feels today.
            </p>
          </div>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            When tokens run out, the kerosene lamps return. Innovation slows. Work pauses. Creativity dims. AI has not yet reached its Edison moment. It is still early, still fragile, still powered by candles. Electricity only scaled once we standardized the bulb, the meter, and the monthly bill — not when we made better candles. And that's when the clarity came: AI must become a utility — not a luxury, not a subscription treadmill, not a fragmented marketplace. It needs a power company. A meter. A bill. A grid.
          </p>

          {/* Section 1 */}
          <div className="pt-12">
            <h2 className={`text-2xl sm:text-3xl font-light mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Pivot on the X-Axis
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              For months at Founder Institute in Austin, I practiced and pitched a startup concept that fell flat in the eyes of investors. I pivoted and built an AI cyber-security tool that turned your voice into a fingerprint. Interesting work — yet the same question always returned: <em>is this a feature or a product?</em>
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              I did not have time to philosophize. Graduation was two weeks away, and I was on the edge of collapse. Krishnamurti wrote, "The observer is the observed." So I observed. Every founder, mentor, and advisor used transportation to get to class — car, bus, bike, rideshare. But we also used AI to make the money that paid for that transportation — slides, research, messaging, navigation, work. Even those who walked or biked still used AI somewhere in the value chain — to earn money for the bike or the shoes.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              A single mother told me her teenager snaps a photo of the fridge and asks ChatGPT what to cook. Another used AI to communicate with an ex-spouse during tense co-parenting moments. AI was no longer "tech" — it had entered the kitchen, the living room, the family chat thread.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              And in my case, it went even deeper. In 2025, I spent more money on AI tools than I spent on food. Black-eyed peas and rice were cheap. AI was not. Every penny after rent went to subscriptions. I hunted free tokens, wrote surgical prompts, burned through credits. Once you experience AI-powered productivity — there is no going back.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 italic ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              If you know, you know.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              AI is the new oil — expensive, fragmented, unpredictable, and capped. We juggle platforms. We hit token walls. We wait for resets like early electricity before the grid. It felt like the Hunger Games of compute.
            </p>
          </div>

          {/* Section 2 */}
          <div className="pt-12">
            <h2 className={`text-2xl sm:text-3xl font-light mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Pivot on the Y-Axis
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              My favorite slide in any pitch deck has always been "Why Now?" — yet timing is meaningless if you're working on the wrong problem. I was down to my last bag of black-eyed peas when I built myself a dashboard to unify all my AI tools. It was messy, imperfect — but it solved my chaos.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Sitting in class, it dawned on me that pivots don't only happen horizontally (X) or vertically (Y). Sometimes innovation requires going down — deeper — into the Z-axis. I asked myself: <em>Who else is on their last meal because of AI — or for AI?</em> Could this janky survival dashboard become a real product?
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Two weeks before graduation, I pivoted hard. On December 11th, 2025, I launched our first product publicly at graduation: +AI Labs — 1,000 AI Models in Your Pocket, while protecting voice, name, image & likeness.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              The applause felt like a Michael Jordan buzzer-beater — but victory was short. Within 72 hours we had eleven users — real humans, real interest — and one question that sliced through everything: <em>"How do you make it affordable?"</em>
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              I couldn't — not yet. I had optimized output, not cost. My first invoice arrived and I was already underwater.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              YC echoed in my mind: "Do things that don't scale." So I kept building. Prompt efficiency was an art — not a system. Wholesale access didn't fix the pricing. I could prompt like a magician — but expecting millions to do the same was unrealistic. Something deeper was required.
            </p>
          </div>

          {/* Section 3 */}
          <div className="pt-12">
            <h2 className={`text-2xl sm:text-3xl font-light mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Pivot on the Z-Axis
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Christmas Eve 2025. Graduation behind me. Back in San Antonio — still building, still hoping. I asked a member of the cleaning staff, a veteran and mother, if she had ever used AI. "No," she said. "What would I use it for?" That sentence hit harder than any investor critique.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              So I told her:
            </p>

            <blockquote className={`pl-6 py-4 my-6 border-l-4 ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}>
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                "We have light bills for light.<br/>
                We have water bills for water.<br/>
                We have phone bills for phones.<br/>
                I'm building your AI bill — because AI can lower every other bill, help you stay healthy, save money, save memories.<br/>
                If AI could save you $1,200 a year — would you use it?"
              </p>
            </blockquote>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              She said yes — and lightning struck the kite string.
            </p>

            <div className={`py-6 my-8 border-l-4 pl-6 ${
              darkMode ? "border-purple-500 bg-purple-500/5" : "border-purple-600 bg-purple-50"
            }`}>
              <p className={`text-lg sm:text-xl font-light ${
                darkMode ? "text-purple-300" : "text-purple-900"
              }`}>
                It wasn't tokens that mattered. Not even output.<br/>
                Access mattered. Affordability mattered. Utility mattered.
              </p>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              The Z-axis sharpened everything. Back at my desk, years of experience converged. Prompting wasn't input → output. It was cost per output — efficiency per watt. Lightning in a bottle. Taming the tokenized beast.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Buildings operate through departments — maintenance, cleaning, security, management. Why shouldn't AI workloads operate through model specialization, routed to the most efficient engine for each task? What if intelligence flowed like electricity — measured, metered, billed fairly?
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              But first the job must be clear. People want AI that helps them:
            </p>

            <ul className={`list-none space-y-2 mb-6 pl-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              <li className="text-base sm:text-lg">• lower bills</li>
              <li className="text-base sm:text-lg">• communicate better</li>
              <li className="text-base sm:text-lg">• get healthier</li>
              <li className="text-base sm:text-lg">• save money</li>
              <li className="text-base sm:text-lg">• remember what matters</li>
            </ul>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              If AI saves a family $1,200/year — adoption becomes instinctive. That night, a theory crystallized. Not every task requires the most expensive model — smaller models often outperform when routed correctly. I had seen it while debugging in Cursor. So I built routing — and the breakthrough landed:
            </p>

            <div className={`text-center py-8 my-8 ${
              darkMode ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30" : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
            } rounded-lg`}>
              <p className={`text-3xl sm:text-4xl font-light mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-900"
              }`}>
                aiWh
              </p>
              <p className={`text-base sm:text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Artificial Intelligence Watt-Hour
              </p>
              <p className={`text-sm sm:text-base mt-2 ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}>
                A meter for compute. A unit for cost. A path to utility.
              </p>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              This changes everything.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Instead of burning tokens blindly → we meter AI like power.<br/>
              Instead of stacking subscriptions → we bill like electricity.<br/>
              Instead of AI as luxury → we build public infrastructure.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Now I understand why the pivot had to happen, and why now. Lightning is in the bottle — but most of the world is still using kerosene lamps.
            </p>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              The X-axis changed direction.<br/>
              The Y-axis changed the product.<br/>
              The Z-axis revealed the source.
            </p>
          </div>

          {/* Closing */}
          <div className="pt-12">
            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Super eComm now champions a new commodity — one that will shape the future of generative commerce. We are not building another AI app. We are building artificial intelligence as an accessible, affordable, actionable utility.
            </p>

            <div className={`py-6 my-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              <p className="text-base sm:text-lg mb-2">As of this letter:</p>
              <p className="text-base sm:text-lg">three months incorporated,</p>
              <p className="text-base sm:text-lg">three pivots completed,</p>
              <p className="text-base sm:text-lg">two weeks post-graduation,</p>
              <p className="text-base sm:text-lg">three days from 2026.</p>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              We must iterate and return to the customer — always forward. Yesterday is gone. Tomorrow waits. And presently — the future is here.
            </p>

            <p className={`text-lg sm:text-xl leading-relaxed italic pt-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              My hope is that this letter becomes a lightbulb moment for someone — because every grid begins with a single spark.
            </p>
          </div>
        </div>
      </article>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className={`text-4xl md:text-5xl font-light mb-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          About Super eComm
        </h1>
        <p
          className={`text-xl leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Building the infrastructure for the AI utility layer
        </p>
      </div>
    </div>
  );

  const SubsidiariesPage = () => (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-4xl md:text-5xl font-light mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Our Companies
        </h1>

        <div
          className={`border rounded-2xl p-12 ${
            darkMode
              ? "border-gray-700 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center mb-6">
            <span
              className={`text-5xl font-bold mr-4 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              +
            </span>
            <h2
              className={`text-4xl font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              AI Labs
            </h2>
          </div>
          {/* ...rest of subsidiary content... */}
        </div>
      </div>
    </div>
  );

  const CareersPage = () => {
    const [hasAccount, setHasAccount] = useState<boolean | null>(null);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      position: '',
      message: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Check if user is logged in and auto-fill
    useEffect(() => {
      if (currentUser) {
        setHasAccount(true);
        // Auto-fill with user data
        const loadUserData = async () => {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as UserProfile;
              setFormData(prev => ({
                ...prev,
                firstName: userData.displayName?.split(' ')[0] || '',
                lastName: userData.displayName?.split(' ')[1] || '',
                email: currentUser.email || '',
              }));
            } else {
              setFormData(prev => ({
                ...prev,
                email: currentUser.email || '',
              }));
            }
          } catch (err) {
            console.error('Error loading user data:', err);
          }
        };
        loadUserData();
      }
    }, [currentUser]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        // Save to Firestore
        await addDoc(collection(db, 'career_applications'), {
          ...formData,
          hasAccount,
          userId: currentUser?.uid || null,
          gridAccountId: userProfile?.gridAccount?.displayId || null,
          createdAt: serverTimestamp(),
          status: 'pending',
        });

        setSubmitted(true);
      } catch (err: any) {
        console.error('Error submitting application:', err);
        setError('Failed to submit application. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    };

    if (submitted) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24">
          <div className="max-w-md w-full text-center">
            <CheckCircle2 className={`w-20 h-20 mx-auto mb-6 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`} />
            <h1 className={`text-3xl md:text-4xl font-light mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Thank You!
            </h1>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Your application has been submitted successfully. We'll review it and get back to you soon.
            </p>
            
            {hasAccount === false && (
              <div className={`p-6 rounded-lg border mb-6 ${
                darkMode ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-200 bg-blue-50'
              }`}>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-blue-300' : 'text-blue-900'
                }`}>
                  Want to experience AI as a utility? Reserve your AI Grid Layer account now.
                </p>
                <button
                  onClick={() => setCurrentPage('reserve')}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Reserve Your Account
                </button>
              </div>
            )}

            <button
              onClick={() => setCurrentPage('home')}
              className={`text-sm ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen px-4 sm:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-light mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Join Our Team
          </h1>
          <p className={`text-lg mb-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Help us build the AI utility grid for everyone. We're looking for passionate people who want to shape the future of AI.
          </p>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className={`p-8 rounded-xl border ${
            darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white'
          }`}>
                <h2 className={`text-2xl font-semibold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Application Form
                </h2>

                {/* Account Question */}
                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Do you have an AI Grid Layer account? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setHasAccount(true)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                        hasAccount === true
                          ? darkMode
                            ? 'bg-green-600 text-white ring-2 ring-green-400'
                            : 'bg-green-600 text-white ring-2 ring-green-400'
                          : darkMode
                          ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-green-500'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-green-500'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasAccount(false)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                        hasAccount === false
                          ? darkMode
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                            : 'bg-blue-600 text-white ring-2 ring-blue-400'
                          : darkMode
                          ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-blue-500'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500'
                      }`}
                    >
                      No
                    </button>
                  </div>
                  
                  {hasAccount === true && !currentUser && (
                    <p className={`mt-3 text-sm ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Please{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentPage('reserve')}
                        className="font-semibold underline"
                      >
                        sign in
                      </button>
                      {' '}to auto-fill your information.
                    </p>
                  )}
                  
                  {hasAccount === false && (
                    <p className={`mt-3 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      No problem! You can{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentPage('reserve')}
                        className={`font-semibold underline ${
                          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        reserve your account
                      </button>
                      {' '}after submitting this application.
                    </p>
                  )}
                </div>

                {error && (
                  <div className={`p-4 rounded-lg border mb-6 flex items-start gap-2 ${
                    darkMode ? 'border-red-500/30 bg-red-500/10' : 'border-red-200 bg-red-50'
                  }`}>
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={`text-sm ${
                      darkMode ? 'text-red-400' : 'text-red-700'
                    }`}>
                      {error}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } outline-none transition-colors`}
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } outline-none transition-colors`}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Twitter/X URL
                  </label>
                  <input
                    type="url"
                    name="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Position of Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                  >
                    <option value="">Select a position</option>
                    <option value="software-engineer">Software Engineer</option>
                    <option value="ai-ml-engineer">AI/ML Engineer</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="designer">Designer</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="operations">Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Why do you want to join Super eComm? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border resize-none ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } outline-none transition-colors`}
                    placeholder="Tell us about yourself and why you're excited about building the AI utility grid..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || hasAccount === null}
                  className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
        </div>
      </div>
    );
  };

  const HowItWorksPage = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Image */}
      <div className="relative h-[60vh] sm:h-[70vh] -mt-16 md:-mt-20 flex items-center justify-center overflow-hidden">
        <img
          src={marketingImage230}
          alt="Don't Worry Just Prompt"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 drop-shadow-lg">
            Don't Worry Just Prompt
          </h1>
          <p className="text-2xl sm:text-3xl text-white/95 font-light drop-shadow-md">
            We take care of the rest
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto w-full">

        {/* Flowchart: 3 Steps + Result */}
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 mb-8 items-center">
          
          {/* Step 1 */}
          <div className="sm:col-span-2 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              darkMode ? "bg-blue-600" : "bg-blue-600"
            }`}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-base font-semibold mb-1 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Create Prompt
            </h3>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              Your request
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex justify-center">
            <ArrowRight className={`w-6 h-6 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
          </div>

          {/* Step 2 */}
          <div className="sm:col-span-2 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              darkMode ? "bg-green-600" : "bg-green-600"
            }`}>
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-base font-semibold mb-1 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Break Into Tasks
            </h3>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              Smart division
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex justify-center">
            <ArrowRight className={`w-6 h-6 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
          </div>

          {/* Step 3 */}
          <div className="sm:col-span-2 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
              darkMode ? "bg-purple-600" : "bg-purple-600"
            }`}>
              <Network className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-base font-semibold mb-1 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Route on Grid
            </h3>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              Optimal models
            </p>
          </div>
        </div>

        {/* Result: aiWh Badge */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
            darkMode ? "bg-blue-600/20 border-2 border-blue-500/50" : "bg-blue-100 border-2 border-blue-300"
          }`}>
            <Gauge className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <span className={`text-xl font-semibold ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
              = aiWh
            </span>
          </div>
        </div>

        {/* AI Grid Layer Diagram */}
        <div className="mb-12">
          <div className={`rounded-xl overflow-hidden border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <img
              src={aiGridLayerDiagram}
              alt="AI Grid Layer Architecture"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage('reserve')}
            className={`px-8 py-4 rounded-lg text-lg font-medium transition-all hover:scale-105 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } shadow-lg`}
          >
            Reserve Your Account
          </button>
        </div>
      </div>
      </div>
    </div>
    );
  };

  const PlansAndBillingPage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-light mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            AI as a Utility
          </h1>
          <p
            className={`text-lg sm:text-xl max-w-3xl mx-auto mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Pay for AI like you pay for electricity. One meter, one bill, unlimited intelligence.
          </p>
          <button
            onClick={() => setCurrentPage('reserve')}
            className={`px-8 py-4 rounded-lg text-lg font-medium transition-all hover:scale-105 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } shadow-lg`}
          >
            Reserve Your Account
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Plans Info */}
            <div className="space-y-12">
              
              {/* Subscriptions */}
              <div>
                <h2 className={`text-3xl font-light mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Subscriptions
                </h2>
                <ul className={`space-y-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 mt-1 flex-shrink-0 text-blue-500" />
                    <span>Monthly aiWh Subscription (Individuals & Creators)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 mt-1 flex-shrink-0 text-blue-500" />
                    <span>Predictable Recurring Revenue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 mt-1 flex-shrink-0 text-blue-500" />
                    <span>aiWh Credit Bundles (Usage-Tiered)</span>
                  </li>
                </ul>
              </div>

              {/* Retroactive Utility Billing */}
              <div>
                <h2 className={`text-3xl font-light mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Retroactive Utility Billing
                </h2>
                <ul className={`space-y-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-1 flex-shrink-0 text-purple-500" />
                    <span>Credit Check Required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-1 flex-shrink-0 text-purple-500" />
                    <span>Pay Only For What You Use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-1 flex-shrink-0 text-purple-500" />
                    <span>Unlimited Scaling For Enterprises</span>
                  </li>
                </ul>
              </div>

              {/* Upside Expansion */}
              <div>
                <h2 className={`text-3xl font-light mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Upside Expansion
                </h2>
                <ul className={`space-y-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" />
                    <span>AI Safety Layer (Identity/Voice Protection Add-On)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" />
                    <span>Team / Family Plans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" />
                    <span>API Access Usage Billing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" />
                    <span>Partnerships + Marketplace Fees</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className={`p-6 rounded-xl border ${
                darkMode
                  ? "border-blue-500/30 bg-blue-500/10"
                  : "border-blue-200 bg-blue-50"
              }`}>
                <p className={`text-base mb-4 ${
                  darkMode ? "text-blue-300" : "text-blue-900"
                }`}>
                  Reserve your AI Grid Layer account now. Be among the first to experience AI as a utility.
                </p>
                <button
                  onClick={() => setCurrentPage('reserve')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Get Early Access
                </button>
              </div>
            </div>

            {/* Right: AI Utility Bill Dashboard Mockup */}
            <div className="relative">
              <div className={`rounded-2xl overflow-hidden border ${
                darkMode ? "border-gray-800" : "border-gray-200"
              } shadow-2xl`}>
                <img
                  src={aiUtilityBillImage}
                  alt="AI Watt Meter - Utility Account Dashboard showing aiWh usage, billing cycle, and adaptive metering"
                  className="w-full h-auto"
                />
              </div>
              <div className={`mt-6 text-center text-sm ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}>
                <p>Preview: AI Utility Dashboard with aiWh metering</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl border ${
              darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
            }`}>
              <Plug className={`w-10 h-10 mb-4 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                1000+ AI Models
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Access any AI model through a single interface. Intelligent routing optimizes cost and performance.
              </p>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
            }`}>
              <Database className={`w-10 h-10 mb-4 ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Transparent Metering
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Every AI interaction is measured in aiWh. You see exactly what you use and what you pay.
              </p>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
            }`}>
              <Wallet className={`w-10 h-10 mb-4 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                One Monthly Bill
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                No more juggling subscriptions. One AI bill, just like your electricity or water.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MyAccountPage = () => (
    <div className="min-h-screen px-6 py-24 flex items-center justify-center">
      <div
        className={`w-full max-w-md rounded-2xl border px-8 py-10 shadow-sm ${
          darkMode
            ? "border-gray-800 bg-gray-900/90"
            : "border-gray-200 bg-white/90"
        } backdrop-blur`}
      >
        <h1
          className={`text-2xl font-light mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          My +AI Account
        </h1>
        <p className={darkMode ? "text-gray-400 mb-8" : "text-gray-600 mb-8"}>
          Sign in to view your AI bill, track aiWh usage, and manage your
          services.
        </p>

        <form className="space-y-4">
          <div>
            <label
              className={`block text-sm mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              disabled
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                darkMode
                  ? "border-gray-700 bg-gray-950 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
              placeholder="Coming soon — early access only"
            />
          </div>
          <div>
            <label
              className={`block text-sm mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              disabled
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                darkMode
                  ? "border-gray-700 bg-gray-950 text-gray-100"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
              placeholder="••••••••"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full rounded-full py-2 text-sm font-medium opacity-60 cursor-not-allowed bg-blue-600 text-white"
          >
            Sign in (beta coming soon)
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          Investors: this page will become the customer login wall for Super
          eComm’s AI utility service.
        </p>
      </div>
    </div>
  );

  return (
    <div
      className={`relative min-h-screen ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Subtle Electric Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(${
              darkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(15,23,42,0.06)"
            } 1px, transparent 1px),
            linear-gradient(90deg, ${
              darkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(15,23,42,0.06)"
            } 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Foreground content with top padding for fixed nav */}
      <div className="relative z-10 flex min-h-screen flex-col pt-16 md:pt-20">
        {/* Navigation */}
        <nav
          className={`fixed top-0 inset-x-0 z-[100] border-b shadow-sm ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg`}
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setMobileMenuOpen(false);
                }}
                className={`text-xl font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Super eComm
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) =>
                  "items" in item && (item as any).items ? (
                    <div key={item.name} className="relative">
                      <button
                        onMouseEnter={() => setOpenDropdown(item.name)}
                        onMouseLeave={() => setOpenDropdown("")}
                        className={`px-4 py-2 rounded text-sm ${
                          darkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-800"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        } transition-colors`}
                      >
                        {item.name}
                      </button>
                      {openDropdown === item.name && (
                        <div
                          onMouseEnter={() => setOpenDropdown(item.name)}
                          onMouseLeave={() => setOpenDropdown("")}
                          className={`absolute top-full left-0 mt-1 w-64 rounded-lg shadow-xl ${
                            darkMode
                              ? "bg-gray-900 border border-gray-800"
                              : "bg-white border border-gray-200"
                          } py-2 z-50`}
                        >
                          {((item as any).items as any[]).map((subItem: any) => (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                setCurrentPage(subItem.id);
                                setOpenDropdown("");
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                darkMode
                                  ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              } transition-colors`}
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      key={(item as any).id}
                      onClick={() => setCurrentPage((item as any).id)}
                      className={`px-4 py-2 rounded text-sm ${
                        currentPage === (item as any).id
                          ? darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : darkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      } transition-colors`}
                    >
                      {item.name}
                    </button>
                  )
                )}

                {/* Dashboard/Account button (desktop) */}
                <div className="relative ml-3 user-menu-container">
                  <button
                    onClick={() => {
                      if (currentUser) {
                        setShowUserMenu(!showUserMenu);
                      } else {
                        setCurrentPage("reserve");
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                      darkMode
                        ? "border-blue-500 text-blue-300 hover:bg-blue-500/10"
                        : "border-blue-600 text-blue-700 hover:bg-blue-50"
                    } transition-colors`}
                  >
                    {currentUser && userProfile?.displayName 
                      ? userProfile.displayName.split(' ')[0] 
                      : currentUser 
                      ? currentUser.email?.split('@')[0] 
                      : 'My Account'}
                  </button>
                  
                  {/* User Menu Dropdown */}
                  {currentUser && showUserMenu && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg py-1 z-50 ${
                      darkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}>
                      <button
                        onClick={() => {
                          setCurrentPage("dashboard");
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode
                            ? "text-red-400 hover:bg-gray-800"
                            : "text-red-600 hover:bg-gray-50"
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Right Side */}
              <div className="flex items-center gap-2 md:hidden">
                <div className="relative user-menu-container">
                  <button
                    onClick={() => {
                      if (currentUser) {
                        setShowUserMenu(!showUserMenu);
                      } else {
                        setCurrentPage("reserve");
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                      darkMode
                        ? "border-blue-500 text-blue-300"
                        : "border-blue-600 text-blue-700"
                    }`}
                  >
                    {currentUser && userProfile?.displayName 
                      ? userProfile.displayName.split(' ')[0] 
                      : currentUser 
                      ? currentUser.email?.split('@')[0] 
                      : 'My Account'}
                  </button>
                  
                  {/* Mobile User Menu Dropdown */}
                  {currentUser && showUserMenu && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg py-1 z-50 ${
                      darkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}>
                      <button
                        onClick={() => {
                          setCurrentPage("dashboard");
                          setShowUserMenu(false);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          darkMode
                            ? "text-red-400 hover:bg-gray-800"
                            : "text-red-600 hover:bg-gray-50"
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1"
                >
                  {mobileMenuOpen ? (
                    <X
                      className={`w-5 h-5 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  ) : (
                    <Menu
                      className={`w-5 h-5 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-3 pb-4 space-y-3">
                {navigation.map((item) =>
                  "items" in item && (item as any).items ? (
                    <div key={item.name}>
                      <div
                        className={`px-4 py-2 font-medium text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </div>
                      {((item as any).items as any[]).map((subItem: any) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setCurrentPage(subItem.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`block w-full text-left px-8 py-2 text-sm ${
                            currentPage === subItem.id
                              ? darkMode
                                ? "bg-gray-800 text-white"
                                : "bg-gray-100 text-gray-900"
                              : darkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 rounded text-sm ${
                        currentPage === item.id
                          ? darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </nav>

         {/* Page Content */}
        <main className="relative flex-1">
          {currentPage === "home" && (
            <HomePage
              darkMode={darkMode}
              onJoinEarlyAccess={() => setCurrentPage("reserve")}
              onGoToSubsidiaries={() => setCurrentPage("subsidiaries")}
              openFaq={openFaq}
              toggleFaq={toggleFaq}
            />
          )}
          {currentPage === "reserve" && (
            <ReservePage
              darkMode={darkMode}
              onNavigateToDashboard={() => setCurrentPage("dashboard")}
            />
          )}
          {currentPage === "dashboard" && (
            <DashboardPage
              darkMode={darkMode}
              onNavigate={(page) => setCurrentPage(page as any)}
            />
          )}
          {currentPage === "about" && <AboutPage />}
          {currentPage === "subsidiaries" && <SubsidiariesPage />}
          {currentPage === "founders-letters" && <FoundersLettersPage />}
          {currentPage === "plans-pricing" && <PlansAndBillingPage />}
          {currentPage === "how-it-works" && <HowItWorksPage />}
          {currentPage === "careers" && <CareersPage />}
          {currentPage === "account" && <MyAccountPage />}

          {(currentPage === "support" ||
            currentPage === "contact") && (
            <div className="min-h-screen px-6 py-24">
              <div className="max-w-4xl mx-auto text-center">
                <h1
                  className={`text-4xl md:text-5xl font-light mb-8 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Coming Soon
                </h1>
                <p
                  className={`text-xl ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  This section is currently under development as we build out
                  the full AI utility experience.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer
          className={`relative border-t mt-8 ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } px-6 py-12 bg-white/80 dark:bg-gray-950/80 backdrop-blur`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3
                  className={`text-xl font-medium mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Super eComm
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Building the AI Grid for everyone
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end gap-3 text-sm">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    darkMode
                      ? "border-gray-600 text-gray-200 hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                <p className="text-gray-500">
                  © 2025 Super eComm, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SupereCommWebsite;
