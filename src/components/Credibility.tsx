
import { Shield, Award, Target } from 'lucide-react';
import AnimatedWord from './AnimatedWord';

const Credibility = () => {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="credibility-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(96,165,250,0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#credibility-grid)" />
      </svg>

      <div className="relative container mx-auto px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Validation</AnimatedWord>
            <AnimatedWord delay={150}>Matrix</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={300}>Proven</AnimatedWord>
            <AnimatedWord delay={450}>Neural</AnimatedWord>
            <AnimatedWord delay={600}>Architecture</AnimatedWord>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "500+ Schools",
              subtitle: "Neural Network Nodes",
              description: "Educational institutions across Nigeria integrated into our consciousness grid"
            },
            {
              icon: Award,
              title: "85% Success Rate",
              subtitle: "Grade Enhancement Protocol",
              description: "Students experiencing significant performance elevation through AI integration"
            },
            {
              icon: Target,
              title: "10x Faster Learning",
              subtitle: "Cognitive Acceleration",
              description: "Documented learning velocity increases through neural pathway optimization"
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all duration-500"></div>
                <div className="relative w-20 h-20 bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-blue-400/50 transition-all duration-300">
                  <item.icon className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <h4 className="text-2xl font-light text-white mb-2">{item.title}</h4>
              <p className="text-sm font-mono text-blue-400 uppercase tracking-wider mb-4">{item.subtitle}</p>
              <p className="text-gray-300 font-light leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-8 bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg max-w-2xl">
            <p className="text-blue-200 font-light text-lg leading-relaxed mb-4">
              <AnimatedWord delay={1000}>"The</AnimatedWord>
              <AnimatedWord delay={1150}>transformation</AnimatedWord>
              <AnimatedWord delay={1300}>was</AnimatedWord>
              <AnimatedWord delay={1450}>immediate.</AnimatedWord>
              <AnimatedWord delay={1600}>Our</AnimatedWord>
              <AnimatedWord delay={1750}>students</AnimatedWord>
              <AnimatedWord delay={1900}>evolved</AnimatedWord>
              <AnimatedWord delay={2050}>beyond</AnimatedWord>
              <AnimatedWord delay={2200}>recognition."</AnimatedWord>
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-left">
                <p className="font-mono text-blue-300 text-sm">Dr. Adebayo Okonkwo</p>
                <p className="text-gray-400 text-xs">Principal, Lagos Future Academy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility;
