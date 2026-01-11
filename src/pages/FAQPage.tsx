import { FC, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQPageProps = {
  darkMode?: boolean;
};

const FAQPage: FC<FAQPageProps> = ({ darkMode = true }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen px-6 py-24 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Learn more about Gridnet and how we're building the internet for AI.
        </p>
        
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(0)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                What is aiW and aiWh?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 0 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 0 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 text-gray-300">
                  <strong className="text-white">aiW (Artificial Intelligence Watt)</strong> is a unit that measures computational work performed by AI — similar to how watts measure electrical power.
                </p>
                <p className="mb-4 text-gray-300">
                  <strong className="text-white">aiWh (Artificial Intelligence Watt-Hour)</strong> measures AI power consumption over time — similar to kWh in electricity.
                </p>
                <p className="font-medium text-blue-400">
                  In simple terms: aiWh tracks how much intelligence you use — like a power meter for AI.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                What is the AI Grid Layer?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 1 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 1 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 text-gray-300">
                  The AI Grid Layer is the utility infrastructure that routes, meters, and distributes AI computation across multiple models and systems.
                </p>
                <p className="mb-4 font-medium text-white">
                  It acts like the electrical grid — but for intelligence.
                </p>
                <p className="mb-2 text-gray-300">
                  Instead of subscribing to several AI platforms separately, the AI Grid lets you:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                  <li>access many models through one interface</li>
                  <li>route tasks intelligently to the best model</li>
                  <li>meter usage like electricity</li>
                  <li>receive one unified bill instead of many</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(2)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                What does your company do?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 2 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 2 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="text-gray-300">
                  Gridnet is building the world's AI Utility Grid, providing computational intelligence on tap so anyone can access and run 1,000+ AI models in their pocket — instantly and affordably.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(3)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                How big is the market?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 3 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 3 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="text-gray-300">
                  The global artificial intelligence market is projected to exceed <strong className="text-white">$1.8 trillion by 2030</strong>, driven by exponential growth in consumer AI demand, distributed computation, and intelligent infrastructure adoption across every industry.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(4)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                What makes Gridnet unique?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 4 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 4 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 text-gray-300">
                  We're not building another AI app.
                </p>
                <p className="mb-4 text-gray-300">
                  We are developing <strong className="text-white">AI as a utility</strong> — complete with metering, billing, and distribution, similar to electricity or the internet.
                </p>
                <p className="font-medium text-blue-400">
                  One grid. One meter. One bill.<br />
                  Access to intelligence becomes a public utility.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 6 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(5)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                Where are you today?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 5 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 5 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 text-gray-300">
                  We are building the core aiWh metering architecture, developing multi-model orchestration, and designing the Gridnet Browser interface that brings "1,000 AI models in your pocket" to everyday people and businesses.
                </p>
                <p className="font-medium text-blue-400">
                  Early access is coming soon.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 7 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(6)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                Are you raising capital?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 6 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 6 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="text-gray-300">
                  Gridnet is raising capital to scale engineering, finalize distributed metering infrastructure, and launch early access to the AI Utility Grid.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 8 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(7)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                What market are you in?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 7 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 7 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 text-gray-300">
                  Gridnet operates in the <strong className="text-white">AI Infrastructure & Utility Market</strong>, specifically the emerging category of AI as a Utility — where artificial intelligence is delivered like electricity or internet access.
                </p>
                <p className="mb-2 font-medium text-white">
                  Not SaaS.<br />
                  Not just AI apps.
                </p>
                <p className="font-medium text-blue-400">
                  We are AI distribution, metering, and compute delivery infrastructure.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 9 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(8)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                Why Texas?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 8 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 8 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 text-gray-300">
                  Gridnet began in the Founder Institute Austin 2025 cohort, and we chose to build here because Texas is quietly becoming one of the most important regions for AI infrastructure in the U.S. With strong data center growth, access to power, and supportive conditions for compute expansion, Texas is a practical launch point for the AI Utility Grid.
                </p>
                <p className="mb-2 font-medium text-white">
                  Key reasons we're starting here:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4 text-gray-300">
                  <li>Founded in Austin, TX through Founder Institute</li>
                  <li>Texas is gaining momentum as an AI infrastructure hub</li>
                  <li>Over 400 operating data centers across the state</li>
                  <li>Major tech investment (including Google's $40B commitment)</li>
                  <li>Large-scale buildouts such as the Stargate project</li>
                  <li>Data capacity in Dallas–Fort Worth projected to double by 2026</li>
                  <li>Energy resources and land availability support long-term scale</li>
                </ul>
                <p className="font-medium italic text-blue-400">
                  Texas was once the oil state, then the energy state — now it has the potential to become a leader in AI infrastructure, and we're building alongside that growth.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 10 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(9)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                Are you another AI app like ChatGPT?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 9 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 9 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 font-medium text-white">
                  No. Gridnet Browser is not "just another AI chatbot."
                </p>
                <div className="mb-4 space-y-1 text-gray-300">
                  <p>ChatGPT = app</p>
                  <p>Claude/Gemini = model</p>
                  <p>AWS/Azure = cloud</p>
                  <p className="font-semibold">Gridnet = the utility layer on top of all of them</p>
                </div>
                <p className="text-gray-300">
                  We route, meter, and deliver compute across many AI models using aiWh, similar to how power companies route electricity across the grid.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 11 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(10)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                If not SaaS, then what are you?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 10 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 10 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 font-medium text-white">
                  We are an AI utility provider — like a power company, but for intelligence.
                </p>
                <div className="mb-4 text-gray-300">
                  <p className="mb-2">SaaS = sells features</p>
                  <p className="font-semibold">AI Utility = sells computation (aiWh)</p>
                </div>
                <p className="font-medium text-blue-400">
                  Think: AI → on tap. Pay only for what you use. Like electricity.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 12 */}
          <div className="border rounded-lg overflow-hidden border-gray-700">
            <button
              onClick={() => toggleFaq(11)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-800 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-white">
                Why build AI as a Utility now?
              </h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openFaq === 11 ? "rotate-180" : ""
                } text-gray-400`}
              />
            </button>
            {openFaq === 11 && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                <p className="mb-4 font-medium text-white">
                  Because the infrastructure moment is happening:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4 text-gray-300">
                  <li>Cloud + GPU spending is exploding</li>
                  <li>Data centers are accelerating especially in Texas</li>
                  <li>Multi-model use is becoming normal</li>
                  <li>Businesses don't want subscription chaos — they want one bill</li>
                  <li>Real-time compute metering is missing from the industry</li>
                </ul>
                <div className="space-y-2 text-gray-300">
                  <p>Electricity had <strong className="text-white">kWh</strong></p>
                  <p>AI will have <strong className="text-white">aiWh</strong></p>
                </div>
                <p className="mt-4 font-medium italic text-blue-400">
                  And you are the one defining the standard.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
