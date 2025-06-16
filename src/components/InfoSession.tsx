
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
            <AnimatedWord delay={0}>Learning</AnimatedWord>
            <AnimatedWord delay={150}>Protocol</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight mb-6">
            <AnimatedWord delay={300}>What</AnimatedWord>
            <AnimatedWord delay={450}>You'll</AnimatedWord>
            <AnimatedWord delay={600}>Learn</AnimatedWord>
            <AnimatedWord delay={750}>in</AnimatedWord>
            <AnimatedWord delay={900}>This</AnimatedWord>
            <AnimatedWord delay={1050}>FREE</AnimatedWord>
            <AnimatedWord delay={1200}>Session</AnimatedWord>
          </h3>
        </div>

        <div className="mb-12 bg-gray-900/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8">
          <div className="space-y-4">
            {[
              "What AI really is - explained simply for educators",
              "Global success stories of AI transforming education",
              "The current AI landscape in Nigerian education", 
              "Live demonstrations of AI tools for your classroom",
              "Interactive Q&A and personalized recommendations"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <p className="text-gray-300 font-light leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
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
              subtitle: "Interactive Workshop"
            },
            {
              icon: Users,
              title: "Format",
              value: "Online via Zoom",
              subtitle: "Join from anywhere in Nigeria"
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
              🔒 <AnimatedWord delay={2500}>Secure</AnimatedWord> <AnimatedWord delay={2650}>access</AnimatedWord> <AnimatedWord delay={2800}>via</AnimatedWord> <AnimatedWord delay={2950}>encrypted</AnimatedWord> <AnimatedWord delay={3100}>Zoom</AnimatedWord> <AnimatedWord delay={3250}>portal</AnimatedWord>
            </p>
            <p className="text-sm text-gray-400 font-mono">Session details will be sent to your email upon registration</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSession;
