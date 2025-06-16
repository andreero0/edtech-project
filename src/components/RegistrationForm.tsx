
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
    school: '',
    role: '',
    teachers: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate registration
    setRegistrationCount(registrationCount + 1);
    toast.success("Registration successful! Welcome to the AI Education Revolution", {
      description: 'Check your email for session details and preparation materials.',
    });
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', school: '', role: '', teachers: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="registration-form" className="relative py-20 bg-black text-white overflow-hidden">
      {/* Floating particles */}
      <div className="floating-particle" style={{top: '20%', left: '10%', animationDelay: '1s'}}></div>
      <div className="floating-particle" style={{top: '70%', left: '85%', animationDelay: '3s'}}></div>
      <div className="floating-particle" style={{top: '40%', left: '90%', animationDelay: '5s'}}></div>

      <div className="relative container mx-auto px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Registration</AnimatedWord>
            <AnimatedWord delay={150}>Portal</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight">
            <AnimatedWord delay={500}>Reserve</AnimatedWord>
            <AnimatedWord delay={650}>Your</AnimatedWord>
            <AnimatedWord delay={800}>Spot</AnimatedWord>
          </h3>
          <p className="text-blue-200 font-light mt-4 text-lg">
            <AnimatedWord delay={1000}>Limited</AnimatedWord>
            <AnimatedWord delay={1150}>spaces</AnimatedWord>
            <AnimatedWord delay={1300}>available</AnimatedWord>
            <AnimatedWord delay={1450}>per</AnimatedWord>
            <AnimatedWord delay={1600}>session</AnimatedWord>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-lg blur-xl"></div>
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="your.email@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Phone Number (WhatsApp) *
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
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Name of your school"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Your Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  >
                    <option value="">Select your role</option>
                    <option value="proprietor">Proprietor</option>
                    <option value="principal">Principal</option>
                    <option value="vice-principal">Vice Principal</option>
                    <option value="teacher">Teacher</option>
                    <option value="it-coordinator">IT Coordinator</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Number of Teachers to Invite
                  </label>
                  <input
                    type="number"
                    name="teachers"
                    value={formData.teachers}
                    onChange={handleChange}
                    min="0"
                    className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="relative group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-mono text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative">Secure My Free Spot Now</span>
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-blue-500/20 text-center">
              <p className="text-xs font-mono text-blue-300/80 uppercase tracking-wider mb-2">
                🔒 Your information is 100% secure and will never be shared
              </p>
              <p className="text-xs font-mono text-blue-300/60 uppercase tracking-wider">
                Active Registrations: <span className="text-blue-300 font-semibold">{registrationCount}</span> Schools Joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
