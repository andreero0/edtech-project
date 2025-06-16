
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import AnimatedWord from './AnimatedWord';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this really free?",
      answer: "Yes! This interactive session is completely free. We believe every Nigerian school should have access to AI education insights to stay competitive globally."
    },
    {
      question: "Do we need technical expertise to attend?",
      answer: "Not at all! This session is designed for educators, not technicians. We explain AI concepts in simple, practical terms that any educator can understand and apply."
    },
    {
      question: "Can multiple staff members from our school attend?",
      answer: "Absolutely! We encourage bringing your entire team. The more educators from your school who attend, the better you can implement AI solutions together."
    },
    {
      question: "Will we receive materials after the session?",
      answer: "Yes! All attendees will receive a comprehensive resource pack including session recordings, implementation guides, and ongoing support materials via email."
    },
    {
      question: "How does this relate to WAEC and NECO exams?",
      answer: "We'll show you how AI tools can specifically help students excel in WAEC, NECO, and JAMB examinations by personalizing learning paths and identifying knowledge gaps early."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="relative container mx-auto px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Information</AnimatedWord>
            <AnimatedWord delay={150}>Database</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={300}>Frequently</AnimatedWord>
            <AnimatedWord delay={450}>Asked</AnimatedWord>
            <AnimatedWord delay={600}>Questions</AnimatedWord>
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-blue-400/5 rounded-lg blur-xl group-hover:bg-blue-400/10 transition-all duration-500"></div>
              <div className="relative bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-400/40 transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-500/5 transition-all duration-200"
                >
                  <h4 className="text-lg font-light text-blue-200 pr-4">{faq.question}</h4>
                  {openIndex === index ? 
                    <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" /> : 
                    <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  }
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent mb-4"></div>
                    <p className="text-gray-300 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-300 font-mono text-sm uppercase tracking-wider">
            <AnimatedWord delay={1000}>More</AnimatedWord>
            <AnimatedWord delay={1150}>questions?</AnimatedWord>
            <AnimatedWord delay={1300}>We'll</AnimatedWord>
            <AnimatedWord delay={1450}>answer</AnimatedWord>
            <AnimatedWord delay={1600}>them</AnimatedWord>
            <AnimatedWord delay={1750}>live</AnimatedWord>
            <AnimatedWord delay={1900}>during</AnimatedWord>
            <AnimatedWord delay={2050}>the</AnimatedWord>
            <AnimatedWord delay={2200}>session</AnimatedWord>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
