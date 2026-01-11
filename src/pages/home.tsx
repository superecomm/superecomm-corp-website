import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Zap, Brain, Plug, Shield, Database, Wallet, Coffee, Briefcase, Smartphone, Home as HomeIcon, Loader2, CheckCircle2, AlertCircle, Moon, Sun } from "lucide-react";
import heroHorizon from "../assets/horizon-612x612.jpg";
import meterImage from "../assets/aiWh-meter-transparent-background-new.png";
import productImage from "../assets/plusai-product-image-7.png";
import modelSelectorImage from "../assets/plusai-product-image-8.png";
import marketingImage24 from '../assets/marketing-images/marketing-image24.jpg';
import marketingImage34 from '../assets/marketing-images/marketing-image34.jpg';
import marketingImage29 from '../assets/marketing-images/marketing-image29.jpg';
import marketingImage27 from '../assets/marketing-images/marketing-image27.jpg';
import marketingImage230 from '../assets/marketing-images/marketing-image230.jpg';
import aiUtilityBillImage from '../assets/ai-utility-bill-image-1.png';
import gridnetScreenshot from '../assets/gridnet-screenshot.png';
import bipaBadge from '../assets/bipa-badge.png';
import founderInstituteLogo from '../assets/founder-institute-pre-seed-accelerator-logo.png';
import gridnetFullLogo from '../assets/corp-brand-assets/gridnet-white-full-logo.png';
import ReservePage from "./ReservePage";
import DashboardPage from "./DashboardPage";
import GridnetPage from "./GridnetPage";
import GridnetBrowserPage from "./GridnetBrowserPage";
import AIXPage from "./AIXPage";
import FAQPage from "./FAQPage";
import PitchDeckPage from "./PitchDeckPage";
import Layer0Page from "./Layer0Page";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { UserProfile } from "../types/grid";

type HomePageProps = {
  darkMode: boolean;
  onJoinEarlyAccess: () => void;
};

const HomePage: FC<HomePageProps> = ({
  darkMode,
  onJoinEarlyAccess,
}) => (
  <div className="min-h-screen bg-black relative">
    {/* Electric Grid Background */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        boxShadow: "inset 0 0 100px rgba(59, 130, 246, 0.05)",
      }}
    />
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
          src={heroHorizon}
          alt="Earth's horizon from space - Building the internet for AI"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full px-6">
        <div className="max-w-5xl mx-auto text-center py-24 md:py-32">
          <img
            src={gridnetFullLogo}
            alt="Gridnet Logo"
            className="h-16 md:h-24 w-auto mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            The internet for AI.
          </h1>
          <p className="text-lg md:text-xl font-bold text-white">
            One meter. One bill. All the AI you need.
          </p>
        </div>
      </div>
    </section>

    {/* Mission Section */}
    <section className="px-6 py-24 relative z-50">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Our Mission
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-200">
          Gridnet is the internet for AI.
        </p>
      </div>
    </section>

    {/* Vision Section */}
    <section className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          A simple way to understand Gridnet
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className={`p-6 rounded-lg border ${
            darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
          }`}>
            <h3
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Index
            </h3>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              How much ai do i get for $1?
            </h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              A standardized measure of computational intelligence pricing.
            </p>
          </div>

          <div className={`p-6 rounded-lg border ${
            darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
          }`}>
            <h3
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              aiWh
            </h3>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              The gigabyte for ai
            </h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Ai Watt Hour is like cents per MB/GB—pay for what you use.
            </p>
          </div>

          <div className={`p-6 rounded-lg border ${
            darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
          }`}>
            <h3
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Gridnet
            </h3>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              The new internet for ai
            </h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Where ai models are the new websites.
            </p>
          </div>

          <div className={`p-6 rounded-lg border ${
            darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white"
          }`}>
            <h3
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Gridnet Browser
            </h3>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              The web browser for AI
            </h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              One interface to access a new world of possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Why You Need This Section */}
    <section className="px-6 py-24 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Meter - Top on mobile */}
          <div className="order-1 md:order-1 relative z-50">
            <div className="relative w-full max-w-lg mx-auto p-8 z-50">
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
                → Gridnet
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
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* A Day In Life on the AI Grid Layer */}
    <section className="py-12 relative z-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className={`text-2xl md:text-3xl font-light mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          A Day In Life on the <span className="whitespace-nowrap">Gridnet</span>
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
              Gridnet follows you everywhere
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
            Reserve Your <span className="whitespace-nowrap">Gridnet</span> Account
          </button>
        </div>
      </div>
    </section>

    {/* What You Get Section */}
    <section className="px-6 py-24 relative z-50">
      <div className="max-w-7xl mx-auto">
        <h3
          className={`text-3xl md:text-4xl font-light mb-12 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          What You Get When You Join Gridnet
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
                <div className="order-2 md:order-2 space-y-4 relative z-50 hidden md:block">
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
                          Gridnet finds the right model for every task.
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
                          Plug Into Gridnet
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
    <section className="px-6 py-24 relative z-50">
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
            Choose manually or let Gridnet do it for you
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
            <div className="space-y-8 hidden md:block">
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
                  Gridnet chooses for you. Optimal performance.
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

        {/* Utility Bill Image Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3
              className={`text-2xl md:text-3xl font-light mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              One Bill. All Your AI.
            </h3>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Metered in aiWh — just like your electricity
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={aiUtilityBillImage}
              alt="AI Utility Bill showing aiWh metering"
              className="w-full max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

const SupereCommWebsite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || "home"; // Remove leading slash
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Navigation helper function
  const navigateToPage = (page: string) => {
    navigate(`/${page === "home" ? "" : page}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      navigateToPage("home");
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
    { name: "Browser", id: "browser" as const },
    { name: "Gridnet", id: "gridnet" as const },
    { name: "AIX", id: "aix" as const },
    { name: "Layer 0", id: "layer0" as const },
    { name: "Plans & Pricing", id: "plans-pricing" as const },
    { name: "How It Works", id: "how-it-works" as const },
    { name: "Security", id: "security" as const },
    { name: "FAQ", id: "faq" as const },
    { name: "About", id: "about" as const },
    { name: "Careers", id: "careers" as const },
    // Hidden from public - Founder's Letter
    // {
    //   name: "Investors",
    //   items: [{ name: "Founders' Letters", id: "founders-letters" as const }],
    // },
  ];
  const SecurityPage = () => (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 ${
      darkMode ? 'bg-gray-950' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Image - BIPA Badge */}
        <div className="mb-12">
          <div className={`inline-block p-8 rounded-2xl ${
            darkMode ? 'bg-white' : 'bg-white shadow-xl'
          }`}>
            <img
              src={bipaBadge}
              alt="BIPA - Biometric Information Protection Act Compliance"
              className="h-48 md:h-56 w-auto mx-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light mb-6 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Security
        </h1>

        {/* Subtitle */}
        <p className={`text-2xl md:text-3xl font-light mb-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Security is foundational.
        </p>

        {/* Thesis Statement */}
        <p className={`text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Identity, voice, image, and likeness are protected by default.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigateToPage('reserve')}
          className={`px-8 py-4 rounded-lg text-lg font-medium transition-all ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Reserve Your Gridnet Account
        </button>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1
          className={`text-4xl md:text-5xl font-light mb-8 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          About Super eComm
        </h1>
        <p
          className={`text-xl leading-relaxed mb-12 text-center ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Building the internet for AI
        </p>

        {/* Founder Institute Logo */}
        <div className="flex justify-center mb-8">
          <div className={`p-6 rounded-xl ${
            darkMode ? 'bg-white' : 'bg-white'
          }`}>
            <img
              src={founderInstituteLogo}
              alt="Founder Institute Pre-Seed Accelerator"
              className="h-32 md:h-40 w-auto"
            />
          </div>
        </div>

        <p className={`text-lg leading-relaxed text-center ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Gridnet was founded through the <span className="font-semibold">Founder Institute Austin 2025 cohort</span>. We're building the world's first AI utility grid, making artificial intelligence accessible, affordable, and metered like electricity.
        </p>
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
                  Want to experience AI as a utility? Reserve your Gridnet account now.
                </p>
                <button
                  onClick={() => navigateToPage('reserve')}
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
              onClick={() => navigateToPage('home')}
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
            Help us build the internet for AI. We're looking for passionate people who want to shape the future of AI.
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
                        onClick={() => navigateToPage('reserve')}
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
                        onClick={() => navigateToPage('reserve')}
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
                    Why do you want to join Gridnet? <span className="text-red-500">*</span>
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

        {/* AI Grid Layer Diagram */}
        <div className="mb-8">
          <div className={`rounded-xl overflow-hidden border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <img
              src={gridnetScreenshot}
              alt="Gridnet - The internet for AI"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Explanation */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className={`text-lg leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            The Gridnet is where thousands of AI models live. When you send a prompt, our intelligent routing system analyzes your request, breaks it into optimized tasks, and distributes them across the most cost-effective models on the grid. Each task is measured in <span className="font-semibold">aiWh</span> (AI Watt-hours)—a universal unit that tracks your AI consumption just like electricity. The result? You get the best AI performance at a fraction of the cost, while we handle all the complexity behind the scenes.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigateToPage('reserve')}
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
            The internet for AI
          </h1>
          <p
            className={`text-lg sm:text-xl max-w-3xl mx-auto mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Pay for AI like you pay for electricity. One meter, one bill, unlimited intelligence.
          </p>
          <button
            onClick={() => navigateToPage('reserve')}
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
                  Reserve your Gridnet account now. Be among the first to experience the internet for AI.
                </p>
                <button
                  onClick={() => navigateToPage('reserve')}
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
          My Gridnet Account
        </h1>
        <p className={darkMode ? "text-gray-400 mb-8" : "text-gray-600 mb-8"}>
          Sign in to view your bill, track aiWh usage, and manage your
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
      className="relative min-h-screen bg-black text-gray-100 transition-colors duration-300"
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
          className="fixed top-0 inset-x-0 z-[100] shadow-sm backdrop-blur-lg bg-black/95"
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  navigateToPage("home");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center"
              >
                <img 
                  src={gridnetFullLogo} 
                  alt="Gridnet" 
                  className="h-8 w-auto"
                />
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
                                navigateToPage(subItem.id);
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
                      onClick={() => navigateToPage((item as any).id)}
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
                        navigateToPage("reserve");
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
                          navigateToPage("dashboard");
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
                        navigateToPage("reserve");
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
                          navigateToPage("dashboard");
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
                            navigateToPage(subItem.id);
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
                        navigateToPage(item.id);
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
              onJoinEarlyAccess={() => navigateToPage("reserve")}
            />
          )}
          {currentPage === "reserve" && (
            <ReservePage
              darkMode={darkMode}
              onNavigateToDashboard={() => navigateToPage("dashboard")}
            />
          )}
          {currentPage === "dashboard" && (
            <DashboardPage
              darkMode={darkMode}
              onNavigate={(page) => navigateToPage(page as any)}
            />
          )}
          {currentPage === "browser" && <GridnetBrowserPage darkMode={darkMode} setCurrentPage={navigateToPage} />}
          {currentPage === "gridnet" && <GridnetPage darkMode={darkMode} setCurrentPage={navigateToPage} />}
          {currentPage === "aix" && <AIXPage darkMode={darkMode} setCurrentPage={navigateToPage} />}
          {currentPage === "layer0" && <Layer0Page darkMode={darkMode} setCurrentPage={navigateToPage} />}
          {currentPage === "security" && <SecurityPage />}
          {currentPage === "faq" && <FAQPage />}
          {currentPage === "about" && <AboutPage />}
          {currentPage === "plans-pricing" && <PlansAndBillingPage />}
          {currentPage === "how-it-works" && <HowItWorksPage />}
          {currentPage === "careers" && <CareersPage />}
          {currentPage === "account" && <MyAccountPage />}
          {currentPage === "pitchdeck" && <PitchDeckPage darkMode={darkMode} />}

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
        <footer className="relative mt-8 px-6 py-12 backdrop-blur bg-black/95">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={gridnetFullLogo} 
                  alt="Gridnet" 
                  className="h-6 w-auto mb-4"
                />
                <p className="text-gray-400">
                  Building the internet for AI
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end gap-3 text-sm">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-gray-800"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <p className="text-gray-400">
                  © 2025 Gridnet, Inc. All rights reserved.
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
