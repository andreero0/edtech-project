
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import AnimatedWord from './AnimatedWord';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What neural pathways will be enhanced?",
      answer: "Our AI systems optimize cognitive pathways for mathematics, sciences, languages, and critical thinking. Each student receives personalized neural enhancement protocols."
    },
    {
      question: "How does the consciousness interface work?",
      answer: "Through advanced machine learning algorithms, our AI adapts to each student's unique learning patterns, creating personalized educational experiences that evolve in real-time."
    },
    {
      question: "What quantum results can I expect?",
      answer: "Schools typically see 5x-10x improvement in learning velocity, with 85% of students experiencing significant grade elevation within the first neural cycle."
    },
    {
      question: "Is the neural link compatible with existing systems?",
      answer: "Yes, our AI seamlessly integrates with current educational infrastructure while enhancing rather than replacing traditional teaching methods."
    },
    {
      question: "What security protocols protect the data matrix?",
      answer: "All student data is encrypted using quantum-level security protocols, ensuring complete privacy and compliance with educational data protection standards."
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
            <AnimatedWord delay={0}>Knowledge</AnimatedWord>
            <AnimatedWord delay={150}>Database</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={300}>System</AnimatedWord>
            <AnimatedWord delay={450}>Inquiries</AnimatedWord>
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
            <AnimatedWord delay={1000}>Additional</AnimatedWord>
            <AnimatedWord delay={1150}>queries</AnimatedWord>
            <AnimatedWord delay={1300}>processed</AnimatedWord>
            <AnimatedWord delay={1450}>during</AnimatedWord>
            <AnimatedWord delay={1600}>neural</AnimatedWord>
            <AnimatedWord delay={1750}>briefing</AnimatedWord>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
