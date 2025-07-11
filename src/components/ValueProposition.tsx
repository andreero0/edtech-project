
import AnimatedWord from './AnimatedWord';

const ValueProposition = () => {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="relative container mx-auto px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Educational</AnimatedWord>
            <AnimatedWord delay={150}>Innovation</AnimatedWord>
            <AnimatedWord delay={300}>Protocol</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={500}>Why</AnimatedWord>
            <AnimatedWord delay={650}>AI</AnimatedWord>
            <AnimatedWord delay={800}>Education</AnimatedWord>
            <AnimatedWord delay={950}>Matters</AnimatedWord>
            <AnimatedWord delay={1100}>for</AnimatedWord>
            <AnimatedWord delay={1250}>Nigerian</AnimatedWord>
            <AnimatedWord delay={1400}>Schools</AnimatedWord>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "C & D → A & B",
              subtitle: "Proven Results",
              description: "Help C and D grade students achieve A and B level performance through AI-powered learning",
              delay: 1600
            },
            {
              title: "Made for Nigeria",
              subtitle: "Local Context",
              description: "Solutions designed specifically for the Nigerian educational system and WAEC/NECO standards",
              delay: 1800
            },
            {
              title: "Stay Competitive",
              subtitle: "Future-Ready",
              description: "Don't let your school fall behind in the global AI education revolution",
              delay: 2000
            }
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8 h-full hover:border-blue-400/40 transition-all duration-300">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-400/30 transition-all duration-300">
                      <div className="w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h4 className="text-2xl font-light text-blue-300 mb-2" style={{animation: 'word-appear 1s ease-out forwards', animationDelay: `${item.delay}ms`}}>
                    {item.title}
                  </h4>
                  <p className="text-sm font-mono text-blue-400/80 uppercase tracking-wider mb-4" style={{animation: 'word-appear 1s ease-out forwards', animationDelay: `${item.delay + 200}ms`}}>
                    {item.subtitle}
                  </p>
                  <p className="text-gray-300 font-light leading-relaxed" style={{animation: 'word-appear 1s ease-out forwards', animationDelay: `${item.delay + 400}ms`}}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
