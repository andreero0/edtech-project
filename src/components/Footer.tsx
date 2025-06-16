
import AnimatedWord from './AnimatedWord';

const Footer = () => {
  return (
    <footer className="relative py-16 bg-gray-950 text-white overflow-hidden border-t border-blue-500/20">
      {/* Floating particles */}
      <div className="floating-particle" style={{top: '30%', left: '15%', animationDelay: '2s'}}></div>
      <div className="floating-particle" style={{top: '70%', left: '80%', animationDelay: '4s'}}></div>

      <div className="relative container mx-auto px-8">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-extralight text-white text-glow mb-4">
            <AnimatedWord delay={0}>Neural</AnimatedWord>
            <AnimatedWord delay={150}>Network</AnimatedWord>
            <AnimatedWord delay={300}>Established</AnimatedWord>
          </h3>
          
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          
          <p className="text-blue-200 font-light mb-8 max-w-2xl mx-auto">
            <AnimatedWord delay={450}>Your</AnimatedWord>
            <AnimatedWord delay={600}>educational</AnimatedWord>
            <AnimatedWord delay={750}>transformation</AnimatedWord>
            <AnimatedWord delay={900}>begins</AnimatedWord>
            <AnimatedWord delay={1050}>with</AnimatedWord>
            <AnimatedWord delay={1200}>a</AnimatedWord>
            <AnimatedWord delay={1350}>single</AnimatedWord>
            <AnimatedWord delay={1500}>neural</AnimatedWord>
            <AnimatedWord delay={1650}>connection.</AnimatedWord>
            <AnimatedWord delay={1800}>Join</AnimatedWord>
            <AnimatedWord delay={1950}>the</AnimatedWord>
            <AnimatedWord delay={2100}>consciousness</AnimatedWord>
            <AnimatedWord delay={2250}>grid.</AnimatedWord>
          </p>

          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-lg px-6 py-3">
              <p className="text-xs font-mono text-blue-300 uppercase tracking-wider">
                AI Education Nigeria • Neural Enhancement Protocol
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-500/20">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
              <AnimatedWord delay={2500}>©</AnimatedWord>
              <AnimatedWord delay={2650}>2024</AnimatedWord>
              <AnimatedWord delay={2800}>•</AnimatedWord>
              <AnimatedWord delay={2950}>Quantum</AnimatedWord>
              <AnimatedWord delay={3100}>Learning</AnimatedWord>
              <AnimatedWord delay={3250}>Systems</AnimatedWord>
              <AnimatedWord delay={3400}>•</AnimatedWord>
              <AnimatedWord delay={3550}>All</AnimatedWord>
              <AnimatedWord delay={3700}>neural</AnimatedWord>
              <AnimatedWord delay={3850}>pathways</AnimatedWord>
              <AnimatedWord delay={4000}>reserved</AnimatedWord>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
