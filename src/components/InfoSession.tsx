
import { Calendar, Clock, Users } from 'lucide-react';
import AnimatedWord from './AnimatedWord';

const InfoSession = () => {
  return (
    <section className="relative py-20 bg-gray-950 text-white overflow-hidden">
      {/* Floating particles */}
      <div className="floating-particle" style={{top: '20%', left: '10%', animationDelay: '2s'}}></div>
      <div className="floating-particle" style={{top: '70%', left: '80%', animationDelay: '4s'}}></div>
      
      <div className="relative container mx-auto px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Initiation</AnimatedWord>
            <AnimatedWord delay={150}>Protocol</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight mb-6">
            <AnimatedWord delay={300}>Join</AnimatedWord>
            <AnimatedWord delay={450}>the</AnimatedWord>
            <AnimatedWord delay={600}>Neural</AnimatedWord>
            <AnimatedWord delay={750}>Convergence</AnimatedWord>
          </h3>
          <p className="text-xl text-blue-200 font-light leading-relaxed max-w-2xl mx-auto">
            <AnimatedWord delay={900}>Experience</AnimatedWord>
            <AnimatedWord delay={1050}>the</AnimatedWord>
            <AnimatedWord delay={1200}>future</AnimatedWord>
            <AnimatedWord delay={1350}>of</AnimatedWord>
            <AnimatedWord delay={1500}>education</AnimatedWord>
            <AnimatedWord delay={1650}>in</AnimatedWord>
            <AnimatedWord delay={1800}>our</AnimatedWord>
            <AnimatedWord delay={1950}>exclusive</AnimatedWord>
            <AnimatedWord delay={2100}>digital</AnimatedWord>
            <AnimatedWord delay={2250}>briefing</AnimatedWord>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Calendar,
              title: "Next Session",
              value: "December 28, 2024",
              subtitle: "7:00 PM WAT"
            },
            {
              icon: Clock,
              title: "Duration",
              value: "90 Minutes",
              subtitle: "Deep Dive Protocol"
            },
            {
              icon: Users,
              title: "Capacity",
              value: "Limited Slots",
              subtitle: "Elite Access Only"
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 hover:border-blue-400/50 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h4 className="font-mono text-sm text-blue-300 uppercase tracking-wider mb-2">{item.title}</h4>
                  <p className="text-2xl font-light text-white mb-1">{item.value}</p>
                  <p className="text-sm text-gray-400">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-6 bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg">
            <p className="text-blue-200 font-light mb-2">
              🔒 <AnimatedWord delay={2500}>Secure</AnimatedWord> <AnimatedWord delay={2650}>transmission</AnimatedWord> <AnimatedWord delay={2800}>via</AnimatedWord> <AnimatedWord delay={2950}>encrypted</AnimatedWord> <AnimatedWord delay={3100}>Zoom</AnimatedWord> <AnimatedWord delay={3250}>portal</AnimatedWord>
            </p>
            <p className="text-sm text-gray-400 font-mono">Access coordinates will be transmitted upon registration</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSession;
