
import { Button } from '@/components/ui/button';
import AnimatedWord from './AnimatedWord';
import ShaderBackground from './ShaderBackground';

interface HeroProps {
  registrationCount: number;
}

const Hero = ({ registrationCount }: HeroProps) => {
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <ShaderBackground />
      
      {/* Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(96,165,250,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <line x1="0" y1="25%" x2="100%" y2="25%" className="grid-line" style={{animationDelay: '1s'}} />
        <line x1="0" y1="75%" x2="100%" y2="75%" className="grid-line" style={{animationDelay: '1.5s'}} />
        <line x1="25%" y1="0" x2="25%" y2="100%" className="grid-line" style={{animationDelay: '2s'}} />
        <line x1="75%" y1="0" x2="75%" y2="100%" className="grid-line" style={{animationDelay: '2.5s'}} />
        
        <circle cx="25%" cy="25%" r="3" className="corner-dot" style={{animationDelay: '3s'}} />
        <circle cx="75%" cy="25%" r="3" className="corner-dot" style={{animationDelay: '3.2s'}} />
        <circle cx="25%" cy="75%" r="3" className="corner-dot" style={{animationDelay: '3.4s'}} />
        <circle cx="75%" cy="75%" r="3" className="corner-dot" style={{animationDelay: '3.6s'}} />
        <circle cx="50%" cy="50%" r="2" className="corner-dot" style={{animationDelay: '4s'}} />
      </svg>

      {/* Floating Particles */}
      <div className="floating-particle" style={{top: '20%', left: '10%', animationDelay: '2s'}}></div>
      <div className="floating-particle" style={{top: '60%', left: '85%', animationDelay: '3s'}}></div>
      <div className="floating-particle" style={{top: '80%', left: '15%', animationDelay: '4s'}}></div>
      <div className="floating-particle" style={{top: '30%', left: '90%', animationDelay: '5s'}}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 backdrop-overlay">
        {/* Top Section */}
        <div className="text-center mb-12">
          <h2 className="text-xs md:text-sm font-mono font-light text-blue-300 uppercase tracking-[0.3em] opacity-80">
            <AnimatedWord delay={0}>Transform</AnimatedWord>
            <AnimatedWord delay={200}>Nigerian</AnimatedWord>
            <AnimatedWord delay={400}>Education</AnimatedWord>
            <AnimatedWord delay={600}>Forever</AnimatedWord>
          </h2>
          <div className="mt-4 w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight text-white text-glow mb-8">
            <div className="mb-6">
              <AnimatedWord delay={800}>Enter</AnimatedWord>
              <AnimatedWord delay={950}>the</AnimatedWord>
              <AnimatedWord delay={1100}>Future</AnimatedWord>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-thin text-blue-200 leading-relaxed">
              <AnimatedWord delay={1400}>Where</AnimatedWord>
              <AnimatedWord delay={1550}>AI</AnimatedWord>
              <AnimatedWord delay={1700}>meets</AnimatedWord>
              <AnimatedWord delay={1850}>education</AnimatedWord>
              <AnimatedWord delay={2000}>and</AnimatedWord>
              <AnimatedWord delay={2150}>infinite</AnimatedWord>
              <AnimatedWord delay={2300}>possibilities</AnimatedWord>
              <AnimatedWord delay={2450}>unfold</AnimatedWord>
            </div>
          </h1>

          {/* Central Focus Element */}
          <div className="relative inline-block mt-8 mb-8">
            <div className="w-4 h-4 bg-blue-400 rounded-full opacity-0" style={{animation: 'pulse-glow 3s ease-in-out infinite', animationDelay: '3s'}}></div>
            <div className="absolute inset-0 w-4 h-4 border border-blue-300 rounded-full opacity-0" style={{animation: 'pulse-glow 3s ease-in-out infinite', animationDelay: '3.5s'}}></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-white font-light px-8 py-4 text-lg rounded-none border border-blue-400 backdrop-blur-sm bg-blue-500/20 hover:bg-blue-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] opacity-0"
              style={{animation: 'word-appear 1s ease-out forwards', animationDelay: '2.8s'}}
            >
              Enter the Portal
            </Button>
            
            <div className="flex items-center gap-2 text-blue-300 font-mono text-sm opacity-0" style={{animation: 'word-appear 1s ease-out forwards', animationDelay: '3.2s'}}>
              <span>{registrationCount} educators already inside</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="mb-4 w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
          <h2 className="text-xs md:text-sm font-mono font-light text-blue-300 uppercase tracking-[0.3em] opacity-80">
            <AnimatedWord delay={2800}>Join</AnimatedWord>
            <AnimatedWord delay={2950}>the</AnimatedWord>
            <AnimatedWord delay={3100}>AI</AnimatedWord>
            <AnimatedWord delay={3250}>revolution</AnimatedWord>
          </h2>
          
          <div className="mt-8 flex justify-center space-x-6 opacity-0" style={{animation: 'word-appear 1s ease-out forwards', animationDelay: '4s'}}>
            <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
