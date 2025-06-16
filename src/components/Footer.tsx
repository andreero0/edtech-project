
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
            <AnimatedWord delay={0}>Don't</AnimatedWord>
            <AnimatedWord delay={150}>Let</AnimatedWord>
            <AnimatedWord delay={300}>Your</AnimatedWord>
            <AnimatedWord delay={450}>School</AnimatedWord>
            <AnimatedWord delay={600}>Fall</AnimatedWord>
            <AnimatedWord delay={750}>Behind</AnimatedWord>
          </h3>
          
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          
          <p className="text-blue-200 font-light mb-8 max-w-2xl mx-auto">
            <AnimatedWord delay={900}>Join</AnimatedWord>
            <AnimatedWord delay={1050}>the</AnimatedWord>
            <AnimatedWord delay={1200}>AI</AnimatedWord>
            <AnimatedWord delay={1350}>education</AnimatedWord>
            <AnimatedWord delay={1500}>revolution</AnimatedWord>
            <AnimatedWord delay={1650}>and</AnimatedWord>
            <AnimatedWord delay={1800}>transform</AnimatedWord>
            <AnimatedWord delay={1950}>your</AnimatedWord>
            <AnimatedWord delay={2100}>students'</AnimatedWord>
            <AnimatedWord delay={2250}>future.</AnimatedWord>
          </p>

          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-lg px-6 py-3">
              <p className="text-xs font-mono text-blue-300 uppercase tracking-wider">
                Questions? Email us at info@aieducation.ng
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-500/20">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
              <AnimatedWord delay={2500}>©</AnimatedWord>
              <AnimatedWord delay={2650}>2024</AnimatedWord>
              <AnimatedWord delay={2800}>•</AnimatedWord>
              <AnimatedWord delay={2950}>AI</AnimatedWord>
              <AnimatedWord delay={3100}>Education</AnimatedWord>
              <AnimatedWord delay={3250}>Nigeria</AnimatedWord>
              <AnimatedWord delay={3400}>•</AnimatedWord>
              <AnimatedWord delay={3550}>Transforming</AnimatedWord>
              <AnimatedWord delay={3700}>Nigerian</AnimatedWord>
              <AnimatedWord delay={3850}>Education</AnimatedWord>
              <AnimatedWord delay={4000}>with</AnimatedWord>
              <AnimatedWord delay={4150}>AI</AnimatedWord>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
