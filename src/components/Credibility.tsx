
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
            <AnimatedWord delay={0}>Expertise</AnimatedWord>
            <AnimatedWord delay={150}>Matrix</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={300}>Your</AnimatedWord>
            <AnimatedWord delay={450}>Facilitators</AnimatedWord>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "500+ Schools",
              subtitle: "Already Exploring AI",
              description: "Nigerian educational institutions discovering AI education transformation"
            },
            {
              icon: Award,
              title: "Nigerian Experts",
              subtitle: "Based in Canada",
              description: "Deep understanding of both Nigerian education and global AI trends"
            },
            {
              icon: Target,
              title: "EdTech Specialists",
              subtitle: "AI Implementation",
              description: "Specialized in bridging the global technology gap for African education"
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
          <div className="inline-block p-8 bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg max-w-3xl">
            <p className="text-blue-200 font-light text-lg leading-relaxed mb-6">
              <AnimatedWord delay={1000}>Nigerian</AnimatedWord>
              <AnimatedWord delay={1150}>education</AnimatedWord>
              <AnimatedWord delay={1300}>experts</AnimatedWord>
              <AnimatedWord delay={1450}>bringing</AnimatedWord>
              <AnimatedWord delay={1600}>global</AnimatedWord>
              <AnimatedWord delay={1750}>AI</AnimatedWord>
              <AnimatedWord delay={1900}>expertise</AnimatedWord>
              <AnimatedWord delay={2050}>home</AnimatedWord>
            </p>
            <div className="space-y-3 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-gray-300 font-light">Based in Canada with deep understanding of Nigerian education system</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-gray-300 font-light">Specialized in EdTech and AI implementation for African schools</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <p className="text-gray-300 font-light">Committed to bridging the global technology gap in education</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility;
