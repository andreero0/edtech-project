
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "Is this really free?",
      answer: "Yes, absolutely! This info session is completely free. We believe in giving educators the knowledge they need to make informed decisions about AI in their schools. There's no hidden costs or surprise charges."
    },
    {
      question: "Do we need technical expertise to attend?",
      answer: "Not at all! This session is designed for educators of all technical backgrounds. We explain AI concepts in simple, practical terms that anyone can understand, regardless of their tech experience."
    },
    {
      question: "Can multiple staff members from our school attend?",
      answer: "Yes! We encourage school teams to attend together. You can register additional teachers using the form above. Group attendance often leads to better implementation and school-wide adoption."
    },
    {
      question: "Will we receive materials after the session?",
      answer: "Absolutely! All attendees will receive comprehensive follow-up materials including presentation slides, resource links, implementation guides, and access to our exclusive AI education toolkit."
    },
    {
      question: "How long is the session and what time zone?",
      answer: "The session is 90 minutes long and conducted in West Africa Time (WAT). We'll send you the exact time and Zoom link 24 hours before the session."
    },
    {
      question: "Will this work with our current curriculum?",
      answer: "Yes! Our AI solutions are designed to enhance your existing curriculum, not replace it. We'll show you how to integrate AI tools seamlessly with WAEC, NECO, and JAMB preparation."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about the AI Education Info Session
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openItems.includes(index)}
                onOpenChange={() => toggleItem(index)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-green-900 text-left">
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        className={`w-5 h-5 text-green-600 transition-transform duration-200 ${
                          openItems.includes(index) ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="bg-white border border-green-100 rounded-lg p-6 mt-2">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
