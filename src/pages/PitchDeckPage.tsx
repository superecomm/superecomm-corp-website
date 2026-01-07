import type { FC } from 'react';
import { useRef } from 'react';
import { Download } from 'lucide-react';
import aiGridLayerDiagram from '../assets/8-layer-model/ai-grid-layer-digram-3.png';
import productImage5 from '../assets/plusai-product-image-7.png';
import productImage6 from '../assets/plusai-product-image-8.png';
import aiUtilityBillImage1 from '../assets/ai-utility-bill-image-1.png';
import oldNewModelComparison from '../assets/8-layer-model/OLD-NEW-MODEL-COMPARISON.png';
import terryFrench from '../assets/team/Terry_French.png';
import michaelBarbine from '../assets/team/Michael_Barbine.png';
import chelseaKenney from '../assets/team/Chelsea_Kenney.png';
import armyLogo from '../assets/team/Logo_of_the_United_States_Army.svg 1.png';
import airForceLogo from '../assets/team/US_Air_Force_Logo_Solid_Colour 1.png';
import uhManoaLogo from '../assets/team/UH_Manoa_Logo 1.png';
import foxioLogo from '../assets/team/foxio_llc_logo.png';
import gmuLogo from '../assets/team/george_mason_university_logo 1.png';
import image144 from '../assets/team/image 144.png';
import founderInstituteLogo from '../assets/team/founder-institute-pre-seed-accelerator-logo 2.png';

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
          <div className="max-w-6xl w-full space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Solution
            </h2>
            
            {/* Main content grid: left side text, right side image */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left side: How we deliver it + token statement */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-700">
                    How we deliver it:
                  </h3>
                  <div className="space-y-3 text-lg md:text-xl text-gray-800">
                    <p>• One account</p>
                    <p>• One meter (aiWh)</p>
                    <p>• One bill</p>
                    <p>• 1000+ models, intelligently routed</p>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-xl md:text-2xl font-semibold text-gray-900">
                    We get more out of the token than a user can.
                  </p>
                </div>
              </div>

              {/* Right side: Layer 0 section with image */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Build Layer 0 - the Utility Layer
                </h3>
                <div className="w-full">
                  <img
                    src={oldNewModelComparison}
                    alt="Old vs New Model Comparison - Layer 0 Utility Layer"
                    className="w-[70%] h-auto"
                  />
                </div>
              </div>
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
          <div className="max-w-6xl w-full space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
              How AI as a Utility Works
            </h2>
            
            <div className="w-full flex justify-center">
              <img
                src={aiGridLayerDiagram}
                alt="AI Grid Layer Diagram - How AI as a Utility Works"
                className="w-full max-w-4xl h-auto rounded-lg"
              />
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Where we capture value:
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-200">
                <div>
                  <p className="font-semibold text-blue-300">aiWh:</p>
                  <p>20–30% margins per token</p>
                  <p className="text-sm text-gray-400">(avg prompt 1200 tokens)</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-300">Self-Hosted Models:</p>
                  <p>50–60% margins</p>
                  <p className="text-sm text-gray-400">(the models we own)</p>
                </div>
              </div>
              <p className="text-lg text-white font-semibold border-t border-gray-800 pt-4">
                aiWh maximizes value per token.
              </p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 7 - COMPETITIVE LANDSCAPE */}
        <Slide index={6} slideNumber={6}>
          <div className="max-w-4xl space-y-8 w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Competitive Landscape
            </h2>

            <div className="space-y-6 text-xl md:text-2xl text-gray-700">
              <div>
                <p><span className="font-semibold text-gray-900">AI Gateways:</span> enterprise plumbing</p>
              </div>
              <div>
                <p><span className="font-semibold text-gray-900">AI Apps:</span> surface-level bundling</p>
              </div>
              <div>
                <p><span className="font-semibold text-gray-900">Hyperscalers:</span> raw compute</p>
              </div>
            </div>

            <div className="pt-8 space-y-6">
              <p className="text-2xl md:text-3xl text-gray-600">
                Super eComm operates at a new layer:
              </p>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 italic">
                AI as a Utility — Layer 0
              </p>
            </div>

            <div className="pt-8 border-t-2 border-gray-300 space-y-4 text-xl md:text-2xl text-gray-800">
              <p>We are <span className="font-semibold text-gray-900">not</span> replacing models.</p>
              <p>We are <span className="font-semibold text-gray-900">not</span> competing on features.</p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                We are standardizing how intelligence is delivered and billed.
              </p>
            </div>
          </div>
        </Slide>

        {/* SLIDE 8 - MARKET */}
        <Slide index={7} slideNumber={7}>
          <div className="max-w-5xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Market Opportunity
            </h2>

            {/* Market Metrics */}
            <div className="grid md:grid-cols-3 gap-8 text-gray-800">
              <div>
                <h3 className="text-xl font-bold text-gray-600">Total TAM</h3>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">$400–700B</p>
                <p className="text-base text-gray-600">annually</p>
                <p className="text-sm text-gray-600">annual AI consumption</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-600">Total SAM</h3>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">$180–350B</p>
                <p className="text-base text-gray-600">annually</p>
                <p className="text-sm text-gray-600">annual AI consumption</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-600">Total SOM</h3>
                <p className="text-base text-gray-700">AI Consumption Routed (by 2030)</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">$1.25B</p>
                <p className="text-base text-gray-700">Revenue (3% margin) <span className="font-bold text-gray-900">$37.5M</span></p>
              </div>
            </div>

            {/* Beachhead Strategy - Horizontal Layout */}
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              {/* Supply-Side Beachhead */}
              <div className="bg-white p-6 rounded-lg border-2 border-gray-800 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Supply-Side Beachhead (Models)</h3>
                <p className="text-base text-gray-700">Smaller and mid-sized model providers who:</p>
                <div className="space-y-1 text-sm text-gray-700 pl-3">
                  <p>• cannot compete with hyperscalers on distribution</p>
                  <p>• want usage, not just benchmarks</p>
                  <p>• are willing to:</p>
                  <div className="pl-4 space-y-0.5 text-gray-600">
                    <p>• lease grid capacity</p>
                    <p>• pay for discoverability</p>
                    <p>• accept routing optimization in exchange for demand</p>
                  </div>
                </div>
                <p className="text-sm italic text-gray-800 pt-2">
                  Layer 0 gives them something hyperscalers don't: distribution to real users.
                </p>
              </div>

              {/* Demand-Side Beachhead */}
              <div className="bg-white p-6 rounded-lg border-2 border-gray-800 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Demand-Side Beachhead (Users)</h3>
                <p className="text-base text-gray-700">Consumers and SMBs who already:</p>
                <div className="space-y-1 text-sm text-gray-700 pl-3">
                  <p>• pay for 2–5 AI subscriptions</p>
                  <p>• are confused by token pricing</p>
                  <p>• want predictable monthly spend</p>
                  <p>• don't care <span className="italic">which</span> model runs — only that it works</p>
                </div>
                <p className="text-sm italic text-gray-800 pt-2">
                  They are already over-paying for fragmented access.
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 9 - REVENUE MODEL */}
        <Slide index={8} slideNumber={8}>
          <div className="max-w-5xl w-full space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Revenue Model
            </h2>

            {/* Revenue Streams - Horizontal Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Consumer Revenue */}
              <div className="bg-white p-6 rounded-lg border-2 border-gray-800 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Consumers Subscribe to AI Access</h3>
                <div className="space-y-1 text-base text-gray-700 pl-3">
                  <p>• Free</p>
                  <p>• +AI</p>
                  <p>• Super +AI</p>
                </div>
              </div>

              {/* Model Provider Revenue */}
              <div className="bg-white p-6 rounded-lg border-2 border-gray-800 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Model Providers Lease Grid Address to Pay For</h3>
                <div className="space-y-1 text-base text-gray-700 pl-3">
                  <p>• Distribution</p>
                  <p>• Discoverability</p>
                  <p>• Usage at scale</p>
                </div>
              </div>
            </div>

            {/* Super eComm Role */}
            <div className="pt-4">
              <p className="text-xl text-gray-800 text-center">
                Super eComm builds and manages the arena as the utility layer.
              </p>
            </div>

            {/* Grid Address Leasing */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-800 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Grid Address Leasing</h3>
              
              <div className="space-y-3">
                <p className="text-base text-gray-700">
                  Providers lease capacity on the AI Grid
                </p>
                
                <p className="text-base text-gray-700">
                  More grid presence = higher routing probability
                </p>
                
                <div className="pt-2">
                  <p className="text-base font-semibold text-gray-900">Tiered pricing based on:</p>
                  <div className="space-y-1 text-sm text-gray-700 pl-4 pt-1">
                    <p>• Throughput</p>
                    <p>• Latency</p>
                    <p>• Priority</p>
                  </div>
                </div>
                
                <p className="text-base italic text-gray-800 pt-3 border-t border-gray-300">
                  The Grid becomes neutral infrastructure — not a marketplace auction.
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 10 - TRACTION */}
        <Slide index={9} slideNumber={9}>
          <div className="max-w-5xl w-full space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Product Progress
            </h2>

            <h3 className="text-2xl font-bold text-gray-700">
              Phase 1: MVP Launch & Infrastructure Validation
            </h3>

            {/* December 11, 2025 - Founder Institute */}
            <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-2">
              <h4 className="text-lg font-bold text-gray-900">December 11, 2025</h4>
              <p className="text-base font-semibold text-gray-800">Founder Institute Graduation</p>
              <div className="space-y-1 text-sm text-gray-700 pl-3">
                <p>• Category thesis validated</p>
                <p>• Layer 0 positioned as infrastructure, not SaaS</p>
                <p>• Initial investor and advisor alignment</p>
              </div>
            </div>

            {/* December 2025 – January 2026 - +AI Beta */}
            <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-2">
              <h4 className="text-lg font-bold text-gray-900">December 2025 – January 2026</h4>
              <p className="text-base font-semibold text-gray-800">+AI (Consumer Entry Point) — Beta 1 Live</p>
              <div className="space-y-1 text-sm text-gray-700 pl-3">
                <p>• 111 total users onboarded</p>
                <p>• 16 DAU average</p>
                <p>• Multi-model access through a unified interface</p>
                <p>• Early usage confirms demand for consolidation</p>
              </div>
            </div>

            {/* December 2025 – January 2026 - Layer 0 MVP */}
            <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-2">
              <h4 className="text-lg font-bold text-gray-900">December 2025 – January 2026</h4>
              <p className="text-base font-semibold text-gray-800">Layer 0 (Infrastructure) — MVP Phase 1 Implemented</p>
              <div className="space-y-1 text-sm text-gray-700 pl-3">
                <p>• aiWh metering system implemented (v1)</p>
                <p>• Grid routing architecture live (v1)</p>
                <p>• Provider abstraction layer implemented</p>
                <p>• Models treated as interchangeable vendors</p>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-2">
              <h4 className="text-lg font-bold text-gray-900">Current Status (as of Jan 4, 2026)</h4>
              <div className="space-y-1 text-sm text-gray-700 pl-3">
                <p>• Iterating MVP toward Phase 2</p>
                <p>• Sales motion active for LOIs and pilot programs</p>
                <p>• Phase 2 scheduled — January 2026</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 11 - TEAM */}
        <Slide index={10} slideNumber={10}>
          <div className="max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 lg:gap-8">
              {/* Founding Team Section */}
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center">
                  Founding Team
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                  {/* Terry French - CEO */}
                  <div className="bg-white p-3 lg:p-4 rounded-lg border-2 border-gray-300 shadow-md">
                    <img src={terryFrench} alt="Terry French" className="w-full h-32 sm:h-40 lg:h-48 object-contain rounded-lg mb-2 lg:mb-3" />
                    <p className="text-xs sm:text-sm font-bold text-blue-600 text-center mb-1">FOUNDER, CEO</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2 lg:mb-3">Terry</h3>
                    <div className="space-y-0.5 lg:space-y-1 text-xs text-gray-700">
                      <p>• US Army Veteran – Signal</p>
                      <p>• 20 year IT Pro</p>
                      <p>• IT Infra SMB Owner Operator ( VA Hospital )</p>
                      <p>• AI/ML Startup www.bikeablescore.com</p>
                    </div>
                    <div className="flex justify-center gap-2 lg:gap-3 mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-gray-300">
                      <img src={armyLogo} alt="US Army" className="h-6 lg:h-8 object-contain" />
                      <img src={founderInstituteLogo} alt="Founder Institute" className="h-6 lg:h-8 object-contain" />
                    </div>
                  </div>

                  {/* Mike Barbine - CTO */}
                  <div className="bg-white p-3 lg:p-4 rounded-lg border-2 border-gray-300 shadow-md">
                    <img src={michaelBarbine} alt="Michael Barbine" className="w-full h-32 sm:h-40 lg:h-48 object-contain rounded-lg mb-2 lg:mb-3" />
                    <p className="text-xs sm:text-sm font-bold text-blue-600 text-center mb-1">CTO</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2 lg:mb-3">Mike</h3>
                    <div className="space-y-0.5 lg:space-y-1 text-xs text-gray-700">
                      <p>• <span className="font-bold">Exited</span> Fingerprint technology for Network Devices Startup</p>
                      <p>• <span className="font-bold">Amazon Web Services launches</span> support for <span className="font-bold">JA4 fingerprinting</span></p>
                      <p>• F23 Cyber Accelerator Alumni and Mentor</p>
                    </div>
                    <div className="flex justify-center gap-2 lg:gap-3 mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-gray-300">
                      <img src={foxioLogo} alt="Foxio LLC" className="h-6 lg:h-8 object-contain" />
                      <img src={gmuLogo} alt="George Mason University" className="h-6 lg:h-8 object-contain" />
                      <img src={image144} alt="Logo" className="h-6 lg:h-8 object-contain" />
                    </div>
                  </div>

                  {/* Chelsea Kenney - COO */}
                  <div className="bg-white p-3 lg:p-4 rounded-lg border-2 border-gray-300 shadow-md">
                    <img src={chelseaKenney} alt="Chelsea Kenney" className="w-full h-32 sm:h-40 lg:h-48 object-contain rounded-lg mb-2 lg:mb-3" />
                    <p className="text-xs sm:text-sm font-bold text-blue-600 text-center mb-1">COO</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2 lg:mb-3">Chelsea</h3>
                    <div className="space-y-0.5 lg:space-y-1 text-xs text-gray-700">
                      <p>• Graduate of University of Hawaii– BS Sociology</p>
                      <p>• <span className="font-bold">3 years in D2C sales</span></p>
                      <p>• Active Duty AirForce Spouse</p>
                    </div>
                    <div className="flex justify-center gap-2 lg:gap-3 mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-gray-300">
                      <img src={uhManoaLogo} alt="UH Manoa" className="h-6 lg:h-8 object-contain" />
                      <img src={airForceLogo} alt="US Air Force" className="h-6 lg:h-8 object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Distributed System Engineer</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
                  <div className="bg-gray-100 p-2 lg:p-3 rounded-lg border border-gray-300">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">Usama Naveed</p>
                    <p className="text-xs text-gray-700">Principle Distributed System Engineer</p>
                    <p className="text-xs text-gray-700">Ai/ML Mathematician</p>
                    <p className="text-xs text-gray-700">Full time</p>
                  </div>

                  <div className="bg-gray-100 p-2 lg:p-3 rounded-lg border border-gray-300">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">Jacob Barhak</p>
                    <p className="text-xs text-gray-700">Sr. AI/mL Eng</p>
                    <p className="text-xs text-gray-700">Pending Funding (Contract)</p>
                  </div>

                  <div className="bg-gray-100 p-2 lg:p-3 rounded-lg border border-gray-300">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">Chris Cowan</p>
                    <p className="text-xs text-gray-700">Sr. Software Eng</p>
                    <p className="text-xs text-gray-700">and Architect</p>
                    <p className="text-xs text-gray-700">Pending Funding (Contract)</p>
                  </div>
                </div>

                {/* Advisor Section */}
                <div className="pt-3 lg:pt-4 space-y-2 lg:space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Advisor</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
                    <div className="bg-gray-100 p-2 lg:p-3 rounded-lg border border-gray-300">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Dr. Marlon K John</p>
                      <p className="text-xs text-gray-700">Business Lawyer</p>
                      <p className="text-xs text-gray-700">US Army Veteran</p>
                    </div>

                    <div className="bg-gray-100 p-2 lg:p-3 rounded-lg border border-gray-300">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Nicholas McGinnis</p>
                      <p className="text-xs text-gray-700">AI Infra, Sr. UX Eng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLIDE 12 - THE ASK */}
        <Slide index={11} slideNumber={11}>
          <div className="max-w-5xl w-full space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              The Ask
            </h2>
            
            <p className="text-2xl md:text-3xl font-semibold text-gray-800">
              Pre-Seed / Bridge Round
            </p>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Capital Use (Next 90–120 Days):
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Box 1 - Layer 0 Grid Infrastructure */}
                <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-3">
                  <h4 className="text-base font-bold text-gray-900">• Expand Layer 0 Grid Infrastructure</h4>
                  <div className="pl-4 space-y-1 text-sm text-gray-700">
                    <p>– Harden aiWh metering accuracy</p>
                    <p>– Improve multi-model routing & provider abstraction</p>
                  </div>
                </div>

                {/* Box 2 - Billing & Utility Operations */}
                <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-3">
                  <h4 className="text-base font-bold text-gray-900">• Billing & Utility Operations</h4>
                  <div className="pl-4 space-y-1 text-sm text-gray-700">
                    <p>– Secure usage-based billing (aiWh → invoice)</p>
                    <p>– Payment reliability, auditability, and reporting</p>
                  </div>
                </div>

                {/* Box 3 - Pilot Utility Distribution */}
                <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-3">
                  <h4 className="text-base font-bold text-gray-900">• Pilot Utility Distribution Channels</h4>
                  <div className="pl-4 space-y-1 text-sm text-gray-700">
                    <p>– LOIs & pilots with coworking spaces, accelerators, and SMB groups</p>
                    <p>– Early provider onboarding (capacity lease model)</p>
                  </div>
                </div>

                {/* Box 4 - +AI Demand Validation */}
                <div className="bg-white p-5 rounded-lg border-2 border-gray-800 space-y-3">
                  <h4 className="text-base font-bold text-gray-900">• +AI Demand Validation & Growth</h4>
                  <div className="pl-4 space-y-1 text-sm text-gray-700">
                    <p>– Convert beta users to paid plans</p>
                    <p>– Test referral and reservation mechanics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom centered statement */}
            <div className="pt-6 text-center">
              <p className="text-lg md:text-xl font-semibold text-gray-800 italic">
                "This round is about proving product-market fit for AI as a utility — not scaling headcount."
              </p>
            </div>
          </div>
        </Slide>

        {/* FINAL SLIDE - COPYRIGHT & EXPORT */}
        <Slide index={12}>
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
