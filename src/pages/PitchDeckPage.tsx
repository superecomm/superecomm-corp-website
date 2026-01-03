import type { FC } from 'react';
import { useRef } from 'react';
import { Download } from 'lucide-react';
import aiGridLayerDiagram from '../assets/ai-grid-layer-digram.png';
import productImage5 from '../assets/plusai-product-image-7.png';
import productImage6 from '../assets/plusai-product-image-8.png';
import aiUtilityBillImage1 from '../assets/ai-utility-bill-image-1.png';

interface PitchDeckPageProps {
  darkMode: boolean;
}

const PitchDeckPage: FC<PitchDeckPageProps> = () => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const downloadSlideAsPNG = async (index: number) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(slide, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        ignoreElements: (element) => {
          // Exclude download buttons from the capture
          return element.classList.contains('download-button');
        },
      });
      
      const link = document.createElement('a');
      link.download = `ai-as-a-utility-slide-${index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error downloading slide:', err);
      alert('Download feature requires additional setup. Please use browser screenshot tools instead.');
    }
  };

  const downloadAllAsPDF = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      // Create PDF in landscape mode with letter size (11" x 8.5")
      const pdf = new jsPDF('l', 'mm', 'letter');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < slideRefs.current.length; i++) {
        const slide = slideRefs.current[i];
        if (!slide) continue;

        const canvas = await html2canvas(slide, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          ignoreElements: (element) => {
            // Exclude download buttons from the capture
            return element.classList.contains('download-button');
          },
        });

        const imgData = canvas.toDataURL('image/png');
        
        // Calculate dimensions to fit the page while maintaining aspect ratio
        const imgAspectRatio = canvas.width / canvas.height;
        const pageAspectRatio = pageWidth / pageHeight;
        
        let imgWidth, imgHeight, xOffset = 0, yOffset = 0;
        
        if (imgAspectRatio > pageAspectRatio) {
          // Image is wider than page ratio - fit to width
          imgWidth = pageWidth;
          imgHeight = pageWidth / imgAspectRatio;
          yOffset = (pageHeight - imgHeight) / 2;
        } else {
          // Image is taller than page ratio - fit to height
          imgHeight = pageHeight;
          imgWidth = pageHeight * imgAspectRatio;
          xOffset = (pageWidth - imgWidth) / 2;
        }

        if (i > 0) pdf.addPage();
        
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      }

      pdf.save('AI-as-a-Utility-Pitch-Deck.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('PDF generation requires additional setup. Please use browser print-to-PDF instead.');
    }
  };

  const Footer: FC = () => (
    <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
      © 2025 Super eComm, Inc. | Confidential and Proprietary
    </div>
  );

  const Slide: FC<{ 
    children: React.ReactNode; 
    index: number;
    className?: string;
    slideNumber?: number;
    showPresenter?: boolean;
  }> = ({ children, index, className = '', slideNumber, showPresenter = false }) => (
    <div
      ref={(el) => { slideRefs.current[index] = el; }}
      className={`relative min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center p-8 md:p-16 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    >
      {children}
      <Footer />
      {showPresenter && (
        <div className="absolute bottom-2 left-4 text-xs text-gray-600">
          Presented by Super eComm Inc.
        </div>
      )}
      {slideNumber && (
        <div className="absolute bottom-2 right-4 text-xs text-gray-600">
          {slideNumber}
        </div>
      )}
      <button
        onClick={() => downloadSlideAsPNG(index)}
        className="download-button absolute bottom-16 right-4 p-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors z-10"
        aria-label="Download slide as PNG"
      >
        <Download className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );

  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      
      <div className="bg-white">
        {/* SLIDE 1 - COVER */}
        <Slide index={0} showPresenter={true}>
          <div className="text-center space-y-8 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900">
              AI as a Utility
            </h1>
            <p className="text-2xl md:text-4xl text-gray-700 font-light">
              One meter. One bill. All the AI you need.
            </p>
          </div>
        </Slide>

        {/* SLIDE 1 - PROBLEM */}
        <Slide index={1} slideNumber={1}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Problem
            </h2>
            <div className="space-y-4 text-xl md:text-2xl text-gray-700">
              <p>• Access and memory is fragmented across tools and vendors</p>
              <p>• Token pricing is opaque and unpredictable</p>
              <p>• Subscription stacking is complex and expensive</p>
              <p>• There is no public intelligence layer</p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 2 - VISION */}
        <Slide index={2} slideNumber={2}>
          <div className="max-w-4xl space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Vision
            </h2>
            <div className="text-3xl md:text-5xl text-gray-600 space-y-4 font-light">
              <p>Gas bill.</p>
              <p>Water bill.</p>
              <p>Power bill.</p>
              <p className="text-gray-900 font-normal">AI bill.</p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 3 - SOLUTION */}
        <Slide index={3} slideNumber={3}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
              Solution
            </h2>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-300 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-700">
                How we deliver it:
              </h3>
              <div className="space-y-4 text-xl md:text-2xl text-gray-800">
                <p>• One account</p>
                <p>• One meter (aiWh)</p>
                <p>• One bill</p>
                <p>• 1000+ models, intelligently routed</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-2xl md:text-3xl font-semibold text-gray-900">
                We get more out of the token than a user can.
              </p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 4 - PRODUCT */}
        <Slide index={4} slideNumber={4}>
          <div className="max-w-6xl w-full space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
                Product
              </h2>
              <p className="text-2xl md:text-3xl text-gray-700">
                +AI: 1000 AI Models in Your Pocket
              </p>
            </div>
            
            {/* Feature 1 - Accessible */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1">
                <img
                  src={productImage5}
                  alt="+AI Mobile Interface"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
              <div className="order-1 md:order-2 text-center md:text-left space-y-3">
                <div className="text-4xl">✓</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Accessible</h3>
                <p className="text-lg md:text-xl text-gray-600">Ask once, the Grid routes automatically</p>
              </div>
            </div>

            {/* Feature 2 - Affordable */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-center md:text-left space-y-3">
                <div className="text-4xl">✓</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Affordable</h3>
                <p className="text-lg md:text-xl text-gray-600">Utility pricing, metered in aiWh</p>
              </div>
              <div>
                <img
                  src={productImage6}
                  alt="+AI Model Selection & Grid Routing"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
            </div>

            {/* Feature 3 - Actionable */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1">
                <img
                  src={aiUtilityBillImage1}
                  alt="aiWh Meter Display & Utility Billing"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
              <div className="order-1 md:order-2 text-center md:text-left space-y-3">
                <div className="text-4xl">✓</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Actionable</h3>
                <p className="text-lg md:text-xl text-gray-600">One bill to access all the AI you need</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 6 - HOW IT WORKS */}
        <Slide index={5} slideNumber={5}>
          <div className="max-w-6xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-900">
              How AI as a Utility Works
            </h2>
            
            <div className="w-full">
              <img
                src={aiGridLayerDiagram}
                alt="AI Grid Layer Diagram - How AI as a Utility Works"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </Slide>

        {/* SLIDE 7 - COMPETITIVE LANDSCAPE */}
        <Slide index={6} slideNumber={6}>
          <div className="max-w-5xl space-y-12 w-full">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                Competitive Landscape
              </h2>
              <p className="text-xl text-gray-400">
                This is a role comparison — not a feature comparison.
              </p>
            </div>

            <div className="bg-gray-900 p-6 md:p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Model Providers (Vendors)
              </h3>
              <div className="text-lg md:text-xl text-gray-300 space-y-2 mb-6">
                <p>• OpenAI</p>
                <p>• Anthropic</p>
                <p>• Google</p>
                <p>• Others</p>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-white border-t border-gray-800 pt-6">
                We are their distribution + CAC layer.
              </p>
            </div>

            <div className="bg-gray-900 p-6 md:p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                AI Gateways & Orchestrators
              </h3>
              <p className="text-lg text-gray-400 mb-4">
                Portkey, LiteLLM, Helicone, Kong AI Gateway, TrueFoundry, Vercel AI Gateway
              </p>
              <p className="text-xl text-gray-300 mb-4">
                They solve enterprise plumbing problems.
              </p>
              <div className="text-lg text-gray-300 space-y-2">
                <p>• Enterprise IT / DevOps focus</p>
                <p>• API governance, caching, observability</p>
                <p>• Per-token or per-request pricing</p>
                <p>• Feature competition</p>
              </div>
            </div>

            <div className="bg-blue-950 p-6 md:p-8 rounded-lg border border-blue-800">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                AI as a Utility (Us)
              </h3>
              <div className="text-lg md:text-xl text-gray-200 space-y-2">
                <p>• Public / consumer-facing infrastructure</p>
                <p>• Utility-scale distribution</p>
                <p>• aiWh metering (universal unit)</p>
                <p>• One account, one bill</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 8 - TOKEN vs AIWH */}
        <Slide index={7} slideNumber={7}>
          <div className="max-w-5xl space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold">
              Tokens vs aiWh
            </h2>
            
            <h3 className="text-2xl md:text-3xl text-gray-300">
              Why We Get More Out of the Token
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-gray-400">TOKENS (Today)</h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p>• Provider-specific</p>
                  <p>• Internal abstraction</p>
                  <p>• Confusing to users</p>
                  <p>• Unpredictable costs</p>
                  <p>• Users can't optimize</p>
                </div>
              </div>
              
              <div className="bg-blue-950 p-8 rounded-lg border border-blue-800">
                <h3 className="text-2xl font-bold mb-6">AIWH (AI as a Utility)</h3>
                <div className="space-y-3 text-lg text-gray-200">
                  <p>• Universal unit</p>
                  <p>• Human-readable</p>
                  <p>• Utility-grade</p>
                  <p>• Predictable billing</p>
                  <p>• Grid optimizes routing</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">
                We get more out of the token than a user can:
              </h4>
              <div className="space-y-3 text-lg text-gray-300">
                <p>✓ Route to lowest-cost model for task type</p>
                <p>✓ Batch similar requests for efficiency</p>
                <p>✓ Negotiate wholesale pricing with providers</p>
                <p>✓ Meter in universal units (aiWh)</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 9 - MARKET */}
        <Slide index={8} slideNumber={8}>
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                Market Opportunity
              </h2>
              <p className="text-xl md:text-2xl text-gray-400">
                AI consumption is becoming a utility-scale market.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Total Addressable Market (TAM):
                </h3>
                <p className="text-3xl md:text-5xl font-bold text-white mb-4">
                  $400–700B
                </p>
                <p className="text-lg text-gray-400 mb-4">annual AI consumption</p>
                
                <div className="text-lg text-gray-300 space-y-2">
                  <p>This includes:</p>
                  <p>• IaaS AI compute</p>
                  <p>• Model API consumption</p>
                  <p>• GPU cloud services</p>
                  <p>• Enterprise AI spend</p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <p className="text-xl text-gray-400 mb-2">
                  This is not SaaS revenue.
                </p>
                <p className="text-xl font-semibold text-white">
                  This is infrastructure consumption.
                </p>
              </div>
            </div>

            <div className="bg-blue-950 p-8 rounded-lg border border-blue-800">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Utility Economics
              </h3>
              <div className="space-y-3 text-lg text-gray-200">
                <p>Utility margin capture (2–5%):</p>
                <p>• 2% of $500B = <span className="font-bold text-white">$10B annual revenue</span></p>
                <p>• 5% of $500B = <span className="font-bold text-white">$25B annual revenue</span></p>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Comparable to power, water, and broadband utility margins.
              </p>
            </div>

            <p className="text-xl md:text-2xl font-semibold text-center">
              This is infrastructure-scale.
            </p>
          </div>
        </Slide>

        {/* SLIDE 10 - TRACTION */}
        <Slide index={9} slideNumber={9}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              Early Traction
            </h2>
            
            <div className="bg-blue-950 p-8 rounded-lg border border-blue-800">
              <h3 className="text-2xl font-bold mb-4">+AI (Beta)</h3>
              <div className="space-y-3 text-lg text-gray-200">
                <p>• Live beta application</p>
                <p>• Active daily users</p>
                <p>• Viral referral mechanic built into onboarding</p>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">AI Grid Layer (Infrastructure)</h3>
              <div className="space-y-3 text-lg text-gray-300">
                <p>• Founding Grid reservations opening</p>
                <p>• aiWh metering system in development</p>
                <p>• Multi-model routing active</p>
              </div>
            </div>

            <div className="text-center mt-8 space-y-2">
              <p className="text-2xl text-gray-300">Technology validated.</p>
              <p className="text-2xl text-white font-semibold">Market demand confirmed.</p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 11 - TEAM */}
        <Slide index={10} slideNumber={10}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              Founding Team
            </h2>
            <h3 className="text-2xl md:text-3xl text-gray-400">
              Building Layer 0 for AI
            </h3>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="space-y-4 text-xl md:text-2xl text-gray-300">
                <p>• Infrastructure-first mindset</p>
                <p>• Security & trust emphasis</p>
                <p>• Long-term utility stewardship</p>
                <p>• Deep technical expertise</p>
              </div>
            </div>

            <div className="bg-blue-950 p-8 rounded-lg border border-blue-800">
              <h4 className="text-xl font-bold mb-4">AI as a Utility requires:</h4>
              <div className="space-y-3 text-lg text-gray-200">
                <p>✓ Distributed systems expertise</p>
                <p>✓ Real-time routing & metering</p>
                <p>✓ Security & identity architecture</p>
                <p>✓ Utility-scale operations</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-2xl md:text-3xl font-light text-gray-400 text-center">
                Investors invest in founders and founding teams.
              </p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 12 - THE ASK */}
        <Slide index={11} slideNumber={11}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              The Ask
            </h2>
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl text-gray-300">
                Pre-seed / bridge round
              </p>
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <p className="text-xl md:text-2xl mb-4 text-gray-400">Funds used to:</p>
                <div className="space-y-3 text-lg md:text-xl text-gray-300">
                  <p>• Expand Grid metering infrastructure</p>
                  <p>• Secure billing infrastructure</p>
                  <p>• Pilot utility distribution channels</p>
                  <p>• Scale +AI user acquisition</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* APPENDIX DIVIDER */}
        <Slide index={12}>
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-600">
              APPENDIX
            </h2>
          </div>
        </Slide>

        {/* APPENDIX A - TAM/SAM/SOM */}
        <Slide index={13} className="items-start justify-start">
          <div className="max-w-5xl space-y-8 w-full">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold">
                TAM / SAM / SOM (Layer 0 Utility Model)
              </h2>
            </div>

            {/* TAM */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                TAM (Layer 0) — Total Addressable Market
              </h3>
              <p className="text-lg text-gray-400">
                All AI compute consumption that can be metered and billed through utility infrastructure.
              </p>
              <div className="text-base md:text-lg text-gray-300 space-y-2">
                <p className="font-semibold text-white">Components (2030 estimates):</p>
                <p>• IaaS AI compute: $100–150B</p>
                <p>• Model API consumption: $90–295B</p>
                <p>• GPU cloud services: $50–100B</p>
                <p>• Enterprise AI spend: $150–200B</p>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  Total TAM: $400–700B
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Same TAM as before — now justified by Layer 0 positioning.
                </p>
              </div>
            </div>

            {/* SAM */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                SAM — Serviceable Available Market
              </h3>
              <p className="text-lg text-gray-400">
                AI consumption reachable through utility-style distribution channels.
              </p>
              <div className="text-base md:text-lg text-gray-300 space-y-2">
                <p className="font-semibold text-white">Components:</p>
                <p>• Consumer AI subscriptions: $50–100B</p>
                <p>• SMB AI spend: $80–150B</p>
                <p>• Coworking & shared spaces: $5–10B</p>
                <p>• Residential AI bundles (future): $20–40B</p>
                <p>• ISP-distributed AI (future): $30–60B</p>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Total SAM: $180–350B
                </p>
                <p className="text-lg text-gray-300">
                  Utility economics: 3% margin → $5.4B–$10.5B revenue potential
                </p>
              </div>
            </div>

            {/* SOM */}
            <div className="bg-blue-950 p-6 rounded-lg border border-blue-800 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                SOM — Serviceable Obtainable Market
              </h3>
              <p className="text-lg text-gray-300 mb-4">
                Realistic capture scenarios (timeline-based):
              </p>
              
              <div className="space-y-4 text-base md:text-lg">
                <div className="border-l-4 border-gray-600 pl-4">
                  <p className="font-bold text-gray-400">Conservative (0.5% by 2030):</p>
                  <p className="text-gray-300">$1.25B AI consumption</p>
                  <p className="text-white">3% margin → $37.5M revenue</p>
                </div>
                
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-bold text-gray-300">Base Case (1% by 2030):</p>
                  <p className="text-gray-200">$2.5B AI consumption</p>
                  <p className="text-white font-semibold">3% margin → $75M revenue</p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="font-bold text-white">Optimistic (2% by 2032):</p>
                  <p className="text-gray-200">$6B AI consumption</p>
                  <p className="text-white font-semibold">3% margin → $180M revenue</p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="font-bold text-green-300">Aggressive (5% by 2035):</p>
                  <p className="text-gray-200">$20B AI consumption</p>
                  <p className="text-white font-bold">3% margin → $600M revenue</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-300 border-t border-blue-900 pt-4 mt-4">
                High-margin infrastructure business (60–70% gross margin).
              </p>
            </div>
          </div>
        </Slide>

        {/* APPENDIX B - AIWH & THE AI GRID LAYER */}
        <Slide index={14}>
          <div className="max-w-5xl space-y-8 w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-400">
              aiWh & The AI Grid Layer
            </h2>
            <p className="text-xl text-gray-500">WHERE ALL THE AI MODELS LIVE</p>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg border-2 border-blue-600 p-8 mb-4">
                  <p className="text-2xl font-bold mb-6">AI GRID LAYER (Layer 0)</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-black/30 p-4 rounded">
                      <p className="font-bold text-blue-300">Routing Engine</p>
                      <p className="text-sm text-gray-400 mt-2">Intelligent task routing</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded">
                      <p className="font-bold text-blue-300">Metering (aiWh)</p>
                      <p className="text-sm text-gray-400 mt-2">Universal measurement</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded mb-6">
                    <p className="font-bold text-white mb-3">1000+ AI Models</p>
                    <p className="text-sm text-gray-300">OpenAI • Anthropic • Google • Meta • Mistral • xAI • Cohere • Perplexity • 1000+</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black/30 p-4 rounded">
                      <p className="font-bold text-blue-300">Security</p>
                      <p className="text-sm text-gray-400 mt-2">Identity protection</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded">
                      <p className="font-bold text-blue-300">Identity</p>
                      <p className="text-sm text-gray-400 mt-2">Consent-first design</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-950 p-8 rounded-lg border border-blue-800 space-y-6">
              <h3 className="text-2xl font-bold">aiWh (AI Watt-hour)</h3>
              <p className="text-lg text-gray-200">
                Universal unit for measuring AI compute consumption.
              </p>
              <div className="text-base text-gray-300 space-y-3">
                <p><span className="text-white font-semibold">Similar to kWh for electricity:</span></p>
                <p>• Provider-agnostic</p>
                <p>• Human-readable</p>
                <p>• Utility-grade metering</p>
                <p>• Predictable billing</p>
              </div>
              <p className="text-lg text-white font-semibold border-t border-blue-900 pt-4 mt-4">
                The Grid optimizes routing to maximize value per aiWh consumed.
              </p>
            </div>
          </div>
        </Slide>

        {/* APPENDIX C - SECURITY */}
        <Slide index={15}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-400">
              Security & Trust
            </h2>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="space-y-4 text-xl md:text-2xl text-gray-300">
                <p>• Voice, name, image, and likeness protected</p>
                <p>• Consent-first identity</p>
                <p>• BIPA-aligned design</p>
              </div>
            </div>
            <p className="text-lg text-gray-500 text-center">
              Privacy and identity protection are foundational to AI as a Utility.
            </p>
          </div>
        </Slide>

        {/* APPENDIX D - REFERENCES */}
        <Slide index={16}>
          <div className="max-w-4xl space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-400">
              Research References
            </h2>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="space-y-6">
                <div>
                  <p className="text-xl text-white font-semibold mb-2">
                    "AI as a Public Utility — Why Americans Deserve Free AI Access"
                  </p>
                  <a 
                    href="https://medium.com/@brian-curry-research/ai-as-a-public-utility-why-americans-deserve-free-ai-access-3c1e75cdafdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 break-all text-sm md:text-base"
                  >
                    medium.com/@brian-curry-research/ai-as-a-public-utility-why-americans-deserve-free-ai-access-3c1e75cdafdf
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* FINAL SLIDE - COPYRIGHT & EXPORT */}
        <Slide index={17}>
          <div className="text-center space-y-12 max-w-4xl">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                AI as a Utility
              </h2>
              <p className="text-xl md:text-2xl text-gray-400">
                Building the utility layer for everyone
              </p>
            </div>

            <button
              onClick={downloadAllAsPDF}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-lg transition-colors flex items-center space-x-3 mx-auto"
            >
              <Download className="w-6 h-6" />
              <span>Download All (PDF)</span>
            </button>

            <div className="text-sm text-gray-500 space-y-2 max-w-2xl mx-auto">
              <p>Individual slides can be downloaded using the icon in the bottom-right corner of each slide.</p>
              <p className="text-xs text-gray-600">
                Note: Download features load libraries from CDN. If downloads don't work, use browser print-to-PDF (Ctrl/Cmd+P).
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-gray-600 space-y-4 text-xs">
              <p className="font-semibold text-sm">© 2025 Super eComm, Inc. All rights reserved.</p>
              <p>This presentation contains trade secrets and proprietary information.</p>
              <p>Unauthorized reproduction or distribution is prohibited.</p>
              <p className="mt-4">AI as a Utility™ | AI Grid Layer™ | +AI™ | aiWh™</p>
              <p className="text-gray-700">Trademarks of Super eComm, Inc.</p>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
};

export default PitchDeckPage;
