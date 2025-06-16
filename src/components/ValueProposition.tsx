
import { TrendingUp, Globe, Bolt } from 'lucide-react';

const ValueProposition = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Help C and D grade students achieve A and B level performance through personalized AI learning paths"
    },
    {
      icon: Globe,
      title: "Made for Nigeria",
      description: "Solutions designed specifically for the Nigerian educational context, WAEC, NECO, and JAMB preparation"
    },
    {
      icon: Bolt,
      title: "Stay Competitive",
      description: "Don't let your school fall behind in the global AI revolution - lead the transformation in your community"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Why AI Education Matters for Nigerian Schools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The future of education is here. Schools that embrace AI today will lead tomorrow's educational landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-400 transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-white group-hover:text-green-900" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
