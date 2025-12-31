import { useState } from "react";
import type { FC } from "react";
import { Menu, X, ChevronRight, Zap, Brain, Plug, Shield, Database, Wallet } from "lucide-react";
import heroOffice from "../assets/hero-office.webp";
import { AnimatedAiWhMeter } from "../components/AnimatedAiWhMeter";

type HomePageProps = {
  darkMode: boolean;
  onJoinEarlyAccess: () => void;
  onGoToSubsidiaries: () => void;
};

const HomePage: FC<HomePageProps> = ({
  darkMode,
  onJoinEarlyAccess,
  onGoToSubsidiaries,
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
    <section className="px-6 py-24 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Meter - Top on mobile */}
          <div className="order-1 md:order-1">
            <AnimatedAiWhMeter darkMode={darkMode} />
          </div>

          {/* Right: Content */}
          <div className="order-2 md:order-2">
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

        {/* What You Get Section - Full Width */}
        <div className="mt-24">
              <h3
                className={`text-3xl md:text-4xl font-light mb-12 text-center ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What You Get When You Join +AI
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Product Image - Left Column */}
                <div className="order-1 md:order-1">
                  <img
                    src={new URL('../assets/plusai-product-image-1.png', import.meta.url).href}
                    alt="+AI App Interface showing unified AI access"
                    className={`w-full h-auto rounded-lg shadow-2xl ${
                      darkMode ? "border border-gray-700" : "border border-gray-200"
                    }`}
                  />
                </div>

                {/* Feature Cards - Right Column */}
                <div className="order-2 md:order-2 space-y-4">
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
                          Unlimited AI Power
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
  </div>
);

const SupereCommWebsite = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const navigation = [
    { name: "Home", id: "home" as const },
    {
      name: "Plans & Pricing",
      items: [
        { name: "Individual", id: "plan-individual" as const },
        { name: "Home & Family", id: "plan-home" as const },
        { name: "Business", id: "plan-business" as const },
      ],
    },
    { name: "How It Works", id: "how-it-works" as const },
    { name: "Support", id: "support" as const },
    { name: "Contact", id: "contact" as const },
    {
      name: "Investors",
      items: [{ name: "Founders' Letters", id: "founders-letters" as const }],
    },
    { name: "Subsidiaries", id: "subsidiaries" as const },
  ];

  const FoundersLettersPage = () => (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1
          className={`text-4xl md:text-5xl font-light mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          The Pivot
        </h1>
        <p
          className={`text-lg mb-12 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Founder Letter
        </p>

        <div
          className={`prose prose-lg max-w-none ${
            darkMode ? "prose-invert" : ""
          }`}
        >
          <p
            className={`text-xl leading-relaxed mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
                            
                I founded Super eComm in Texas on August 11th, 2025, guided by a single intuition:
                the output we get from AI — computational intelligence — will become the highest-grossing commodity in global ecommerce for the next 100 years.
                At the time of this writing, the average person already pays for three separate AI subscriptions. In less than half a decade, the AI market has surged toward $100 billion — over $70 billion more than the entire global music industry earned in 2024. Early on, AI helped me accomplish in weeks what once took months — then weeks became days, days became hours. My gut told me we were witnessing the birth of the next great utility.
                Growing up in Mobile, Alabama, hurricanes often knocked out our power for hours — sometimes days. We lit kerosene lamps until the lights returned. As the storm roared, my mother would whisper, “hush… the Lord is talking,” and we’d sit quietly, watching the storm like a Netflix special. I would read or craft comic books — sunlight by day, moonlight by night. I still remember the moment the lights snapped back on — how it felt like civilization rebooting.
                That is exactly how AI feels today.
                When tokens run out, the kerosene lamps return. Innovation slows. Work pauses. Creativity dims. AI has not yet reached its Edison moment. It is still early, still fragile, still powered by candles. Electricity only scaled once we standardized the bulb, the meter, and the monthly bill — not when we made better candles. And that’s when the clarity came: AI must become a utility — not a luxury, not a subscription treadmill, not a fragmented marketplace. It needs a power company. A meter. A bill. A grid.
                </p>
                <p>
                Pivot on the X-Axis
                For months at Founder Institute in Austin, I practiced and pitched a startup concept that fell flat in the eyes of investors. I pivoted and built an AI cyber-security tool that turned your voice into a fingerprint. Interesting work — yet the same question always returned:
                is this a feature or a product?
                I did not have time to philosophize. Graduation was two weeks away, and I was on the edge of collapse. Krishnamurti wrote, “The observer is the observed.” So I observed. Every founder, mentor, and advisor used transportation to get to class — car, bus, bike, rideshare. But we also used AI to make the money that paid for that transportation — slides, research, messaging, navigation, work. Even those who walked or biked still used AI somewhere in the value chain — to earn money for the bike or the shoes.
                A single mother told me her teenager snaps a photo of the fridge and asks ChatGPT what to cook. Another used AI to communicate with an ex-spouse during tense co-parenting moments. AI was no longer “tech” — it had entered the kitchen, the living room, the family chat thread.
                And in my case, it went even deeper. In 2025, I spent more money on AI tools than I spent on food. Black-eyed peas and rice were cheap. AI was not. Every penny after rent went to subscriptions. I hunted free tokens, wrote surgical prompts, burned through credits. Once you experience AI-powered productivity — there is no going back.
                If you know, you know.
                AI is the new oil — expensive, fragmented, unpredictable, and capped.
                We juggle platforms. We hit token walls. We wait for resets like early electricity before the grid. It felt like the Hunger Games of compute.
                </p>
                <p>
                Pivot on the Y-Axis
                </p>
                <p>
                My favorite slide in any pitch deck has always been “Why Now?” — yet timing is meaningless if you’re working on the wrong problem. I was down to my last bag of black-eyed peas when I built myself a dashboard to unify all my AI tools. It was messy, imperfect — but it solved my chaos.
                Sitting in class, it dawned on me that pivots don’t only happen horizontally (X) or vertically (Y). Sometimes innovation requires going down — deeper — into the Z-axis. I asked myself:
                Who else is on their last meal because of AI — or for AI?
                Could this janky survival dashboard become a real product?
                Two weeks before graduation, I pivoted hard. On December 11th, 2025, I launched our first product publicly at graduation: +AI Labs — 1,000 AI Models in Your Pocket, while protecting voice, name, image & likeness.
                The applause felt like a Michael Jordan buzzer-beater — but victory was short. Within 72 hours we had eleven users — real humans, real interest — and one question that sliced through everything:
                “How do you make it affordable?”
                I couldn’t — not yet.
                I had optimized output, not cost.
                My first invoice arrived and I was already underwater.
                YC echoed in my mind: “Do things that don’t scale.” So I kept building. Prompt efficiency was an art — not a system. Wholesale access didn’t fix the pricing. I could prompt like a magician — but expecting millions to do the same was unrealistic.
                Something deeper was required.
                </p>
                <p>
                Pivot on the Z-Axis
                Christmas Eve 2025. Graduation behind me. Back in San Antonio — still building, still hoping. I asked a member of the cleaning staff, a veteran and mother, if she had ever used AI. “No,” she said. “What would I use it for?” That sentence hit harder than any investor critique.
                So I told her:
                “We have light bills for light.
                We have water bills for water.
                We have phone bills for phones.
                I’m building your AI bill — because AI can lower every other bill,
                help you stay healthy, save money, save memories.
                If AI could save you $1,200 a year — would you use it?”
                She said yes — and lightning struck the kite string.
                It wasn’t tokens that mattered. Not even output.
                Access mattered. Affordability mattered. Utility mattered.
                The Z-axis sharpened everything. Back at my desk, years of experience converged. Prompting wasn’t input → output. It was cost per output — efficiency per watt.
                Lightning in a bottle. Taming the tokenized beast.
                Buildings operate through departments — maintenance, cleaning, security, management. Why shouldn’t AI workloads operate through model specialization, routed to the most efficient engine for each task? What if intelligence flowed like electricity — measured, metered, billed fairly?
                But first the job must be clear. People want AI that helps them:
                • lower bills
                • communicate better
                • get healthier
                • save money
                • remember what matters
                If AI saves a family $1,200/year — adoption becomes instinctive. That night, a theory crystallized. Not every task requires the most expensive model — smaller models often outperform when routed correctly. I had seen it while debugging in Cursor. So I built routing — and the breakthrough landed:
                aiWh — Artificial Intelligence Watt-Hour
                A meter for compute. A unit for cost. A path to utility.
                This changes everything.
                Instead of burning tokens blindly → we meter AI like power.
                Instead of stacking subscriptions → we bill like electricity.
                Instead of AI as luxury → we build public infrastructure.
                Now I understand why the pivot had to happen, and why now. Lightning is in the bottle — but most of the world is still using kerosene lamps.
                The X-axis changed direction.
                The Y-axis changed the product.
                The Z-axis revealed the source.
                Super eComm now champions a new commodity — one that will shape the future of generative commerce. We are not building another AI app. We are building artificial intelligence as an accessible, affordable, actionable utility.
                As of this letter:
                three months incorporated,
                three pivots completed,
                two weeks post-graduation,
                three days from 2026.
                We must iterate and return to the customer — always forward.
                Yesterday is gone. Tomorrow waits.
                And presently — the future is here.
                My hope is that this letter becomes a lightbulb moment for someone — because every grid begins with a single spark.
                

          </p>
          {/* ...rest of letter can go here... */}
        </div>
      </div>
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

  const PlansAndBillingPage = () => (
    <div className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`text-4xl md:text-5xl font-light mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Plans &amp; Pricing
        </h1>
        <p
          className={`text-lg mb-12 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Start your AI bill with the option that fits you best. All usage is
          metered in <span className="font-semibold">aiWh</span>, just like
          electricity is measured in kWh.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className={`rounded-xl p-6 border ${
              darkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Subscription Account
            </h2>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Simple monthly subscription, no credit check. Perfect for
              individuals and families who want predictable AI access.
            </p>
          </div>

          <div
            className={`rounded-xl p-6 border ${
              darkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Billing Account
            </h2>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Usage-based AI bill with meters and detailed statements. Pay for
              the intelligence you actually use.
            </p>
          </div>

          <div
            className={`rounded-xl p-6 border ${
              darkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Business Account
            </h2>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              AI for teams, departments, and enterprises — with shared meters,
              seats, and consolidated billing.
            </p>
          </div>
        </div>

        <p
          className={`mt-10 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Online signup is coming soon. For early access, investors and
          partners can contact us directly.
        </p>
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
        className="pointer-events-none absolute inset-0"
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
          className={`fixed top-0 inset-x-0 z-40 border-b shadow-sm ${
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
                  "items" in item ? (
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
                          {item.items!.map((subItem) => (
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
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      className={`px-4 py-2 rounded text-sm ${
                        currentPage === item.id
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

                {/* My Account button (desktop) */}
                <button
                  onClick={() => setCurrentPage("account")}
                  className={`ml-3 px-3 py-1 rounded-full text-xs font-medium border ${
                    darkMode
                      ? "border-blue-500 text-blue-300 hover:bg-blue-500/10"
                      : "border-blue-600 text-blue-700 hover:bg-blue-50"
                  } transition-colors`}
                >
                  My Account
                </button>
              </div>

              {/* Mobile Right Side */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => {
                    setCurrentPage("account");
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    darkMode
                      ? "border-blue-500 text-blue-300"
                      : "border-blue-600 text-blue-700"
                  }`}
                >
                  My Account
                </button>
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
                  "items" in item ? (
                    <div key={item.name}>
                      <div
                        className={`px-4 py-2 font-medium text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </div>
                      {item.items!.map((subItem) => (
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
              onJoinEarlyAccess={() => setCurrentPage("account")}
              onGoToSubsidiaries={() => setCurrentPage("subsidiaries")}
            />
          )}
          {currentPage === "about" && <AboutPage />}
          {currentPage === "subsidiaries" && <SubsidiariesPage />}
          {currentPage === "founders-letters" && <FoundersLettersPage />}
          {(currentPage === "plan-individual" ||
            currentPage === "plan-home" ||
            currentPage === "plan-business") && <PlansAndBillingPage />}
          {currentPage === "account" && <MyAccountPage />}

          {(currentPage === "how-it-works" ||
            currentPage === "support" ||
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
