
import { Award, Globe, Heart } from 'lucide-react';

const Credibility = () => {
  const credentials = [
    {
      icon: Globe,
      title: "Global Expertise, Local Understanding",
      description: "Based in Canada with deep understanding of Nigerian education system and challenges"
    },
    {
      icon: Award,
      title: "Specialized in EdTech & AI",
      description: "Advanced expertise in Educational Technology and AI implementation for learning institutions"
    },
    {
      icon: Heart,
      title: "Bridging the Technology Gap",
      description: "Committed to bringing world-class AI education solutions to Nigerian schools"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Your Facilitators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nigerian education experts bringing global AI expertise home to transform learning outcomes
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {credentials.map((credential, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="bg-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <credential.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">{credential.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{credential.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-xl text-green-100 leading-relaxed max-w-3xl mx-auto">
              "We believe every Nigerian student deserves access to world-class education technology. 
              Our goal is to empower educators with AI tools that make learning more engaging, 
              personalized, and effective - helping students achieve their full potential."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility;
