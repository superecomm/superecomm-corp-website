import { useState, useEffect, type FC } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import layerModelImage from '../assets/8-layer-model/8-LAYER-MODEL.png';
import aiGridLayerIcon from '../assets/corp-brand-assets/ai-grid-layer-icon-color-336x295.png';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Layer0PageProps {
  darkMode: boolean;
  setCurrentPage: (page: string) => void;
}

const Layer0Page: FC<Layer0PageProps> = ({ darkMode }) => {
  // SEO Meta Tags
  useEffect(() => {
    // Update page title
    document.title = 'Layer 0 - The AI Utility Layer | Super eComm';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Layer 0 is the AI Utility Layer that democratizes access to artificial intelligence. Learn about the 8 Layer AI Architecture Model and how Super eComm is building infrastructure that makes AI accessible, affordable, and equitable for everyone.');
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'AI Utility Layer, Layer 0, Gridnet, AI infrastructure, AI democratization, AI architecture, 8 layer model, AI metering, AI routing, Super eComm, artificial intelligence utility, AI as a utility');
    
    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Layer 0 - The AI Utility Layer | Super eComm' },
      { property: 'og:description', content: 'Layer 0 is the AI Utility Layer that democratizes access to artificial intelligence. Building infrastructure that makes AI accessible, affordable, and equitable for everyone.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://superecomm-corp-website.web.app/layer0' },
      { property: 'og:site_name', content: 'Super eComm' },
    ];
    
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
    
    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Layer 0 - The AI Utility Layer | Super eComm' },
      { name: 'twitter:description', content: 'Layer 0 is the AI Utility Layer that democratizes access to artificial intelligence. Building infrastructure that makes AI accessible, affordable, and equitable for everyone.' },
    ];
    
    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
    
    // Geo tags for location-based SEO
    const geoTags = [
      { name: 'geo.region', content: 'US-TX' },
      { name: 'geo.placename', content: 'Austin, Texas' },
      { name: 'geo.position', content: '30.2672;-97.7431' },
      { name: 'ICBM', content: '30.2672, -97.7431' },
    ];
    
    geoTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://superecomm-corp-website.web.app/layer0');
    
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Super eComm - AI as a Utility';
    };
  }, []);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubmitError('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await addDoc(collection(db, 'layer0_signups'), {
        email,
        timestamp: serverTimestamp(),
        source: 'layer0_page',
      });

      setSubmitSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Structured Data (JSON-LD) for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Layer 0 - The AI Utility Layer",
          "description": "Layer 0 is the AI Utility Layer that democratizes access to artificial intelligence. Learn about the 8 Layer AI Architecture Model and how Super eComm is building infrastructure that makes AI accessible, affordable, and equitable for everyone.",
          "author": {
            "@type": "Organization",
            "name": "Super eComm, Inc.",
            "url": "https://superecomm-corp-website.web.app",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
          },
          "publisher": {
            "@type": "Organization",
            "name": "Super eComm, Inc.",
            "logo": {
              "@type": "ImageObject",
              "url": "https://superecomm-corp-website.web.app/assets/corp-brand-assets/GRIDNET-icon-black-336x336.png"
            }
          },
          "datePublished": "2025-01-03",
          "dateModified": "2025-01-03",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://superecomm-corp-website.web.app/layer0"
          },
          "keywords": "AI Utility Layer, Layer 0, Gridnet, AI infrastructure, AI democratization, AI architecture, 8 layer model, AI metering, AI routing",
          "about": {
            "@type": "Thing",
            "name": "Artificial Intelligence Infrastructure",
            "description": "Infrastructure layer that makes AI consumable like a utility"
          }
        })}
      </script>
      
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`py-24 px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              The 8 Layer AI Architecture Model
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Understanding the foundational infrastructure that powers the future of artificial intelligence
            </p>
          </div>

          {/* 8 Layer Model Image */}
          <div className="max-w-2xl mx-auto mb-16">
            <img
              src={layerModelImage}
              alt="8 Layer AI Architecture Model"
              className="w-full h-auto"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </div>
      </section>

      {/* Layer 0 Section */}
      <section className={`py-20 px-4 sm:px-6 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
            {/* Icon */}
            <div className="flex-shrink-0">
              <img
                src={aiGridLayerIcon}
                alt="Gridnet Icon"
                className="w-32 h-32 md:w-40 md:h-40"
              />
            </div>

            {/* Title and Content */}
            <div className="flex-1">
              <h2 className={`text-3xl md:text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Layer 0 — The AI Utility Layer (Gridnet)
              </h2>

              <div className={`space-y-6 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>
                  AI's rapid advancement has the potential to greatly enhance productivity, creativity, and economic opportunity. However, it is also accelerating the technology gap, privileging organizations and populations with early access to powerful models and deep technical expertise while leaving others behind. Without infrastructure that democratizes access, AI risks becoming a bifurcated system in which only the well-resourced can take full advantage of its capabilities.
                </p>

                <p>
                  The AI Utility Layer offers a solution by standardizing access and measurement across models and providers, enabling equitable consumption regardless of technical background or organization size. By treating intelligence as a universal resource—much like electricity or internet connectivity—Layer 0 can help close the technology gap, expand access to underserved communities, and ensure that the benefits of AI are broadly distributed rather than concentrated among a privileged few.
                </p>

                <p>
                  Layer 0 is the missing infrastructure layer that makes AI consumable like a utility. Instead of treating AI as isolated apps, subscriptions, or vendor-specific APIs, the AI Utility Layer introduces standardized metering and intelligent routing so AI usage can be measured transparently and delivered efficiently across models and providers. In practical terms, Layer 0 functions like a grid: it abstracts away the complexity of compute and model selection, enabling users and organizations to access the right intelligence on demand—reliably, affordably, and at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement Section */}
      <section className={`py-20 px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Closing Statement
          </h2>

          <div className={`space-y-6 text-lg leading-relaxed mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              At Super eComm, we are not observing the emergence of the AI Utility Layer—we are actively building it. We believe intelligence should be dependable, measurable, and accessible in the same way electricity and connectivity became essential infrastructure. Layer 0 is our commitment to making AI simpler to access, fairer to distribute, and practical for everyday use across homes, small businesses, and communities—not just large enterprises.
            </p>

            <p>
              This work is foundational, long-term, and deeply human: building infrastructure that expands opportunity rather than widening the technology gap.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`py-20 px-4 sm:px-6 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Call to Action
          </h2>

          <p className={`text-xl mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            If you want to understand how the AI Utility Layer is being built—and how it can shape a more accessible future for intelligence—learn more and join our early community.
          </p>

          {/* Email Signup Form */}
          <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 rounded-lg border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Thank You!
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  You'll receive updates, research releases, and early access information.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Get updates, research releases, and early access
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
                  />
                </div>

                {submitError && (
                  <p className="text-red-500 text-sm">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Layer0Page;

