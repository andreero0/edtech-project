
import { useState } from 'react';
import { toast } from 'sonner';
import AnimatedWord from './AnimatedWord';

interface RegistrationFormProps {
  registrationCount: number;
  setRegistrationCount: (count: number) => void;
}

const RegistrationForm = ({ registrationCount, setRegistrationCount }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate registration
    setRegistrationCount(registrationCount + 1);
    toast.success("Neural pathway established! You're connected to the network.", {
      description: 'Check your communication channel for quantum details.',
    });
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', school: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Floating particles */}
      <div className="floating-particle" style={{top: '20%', left: '10%', animationDelay: '1s'}}></div>
      <div className="floating-particle" style={{top: '70%', left: '85%', animationDelay: '3s'}}></div>
      <div className="floating-particle" style={{top: '40%', left: '90%', animationDelay: '5s'}}></div>

      <div className="relative container mx-auto px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Interface</AnimatedWord>
            <AnimatedWord delay={150}>Connection</AnimatedWord>
            <AnimatedWord delay={300}>Protocol</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={500}>Establish</AnimatedWord>
            <AnimatedWord delay={650}>neural</AnimatedWord>
            <AnimatedWord delay={800}>connection</AnimatedWord>
          </h3>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-lg blur-xl"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Neural Identifier
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Your designation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Communication Channel
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="neural.link@domain.net"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Direct Access Code
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="+234 xxx xxxx xxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Institution Matrix
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Educational facility name"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="relative group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-mono text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative">Initialize Connection</span>
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-blue-500/20 text-center">
              <p className="text-xs font-mono text-blue-300/80 uppercase tracking-wider">
                Active Connections: <span className="text-blue-300 font-semibold">{registrationCount}</span> Neural Pathways Established
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
