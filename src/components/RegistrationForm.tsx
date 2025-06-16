
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    school: '',
    role: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.school) {
      toast.error('Neural link incomplete - all fields required');
      return;
    }

    // Simulate successful registration
    setRegistrationCount(registrationCount + 1);
    toast.success('Neural interface established successfully');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      school: '',
      role: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="registration-form" className="relative py-20 bg-gray-950 text-white overflow-hidden">
      {/* Floating particles */}
      <div className="floating-particle" style={{top: '15%', left: '20%', animationDelay: '1s'}}></div>
      <div className="floating-particle" style={{top: '80%', left: '70%', animationDelay: '3s'}}></div>
      <div className="floating-particle" style={{top: '40%', left: '90%', animationDelay: '5s'}}></div>

      <div className="relative container mx-auto px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-xs md:text-sm font-mono text-blue-300 uppercase tracking-[0.3em] mb-4">
            <AnimatedWord delay={0}>Neural</AnimatedWord>
            <AnimatedWord delay={150}>Interface</AnimatedWord>
            <AnimatedWord delay={300}>Initialization</AnimatedWord>
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-5xl font-extralight text-white text-glow leading-tight mb-6">
            <AnimatedWord delay={450}>Establish</AnimatedWord>
            <AnimatedWord delay={600}>Connection</AnimatedWord>
          </h3>
          <p className="text-blue-200 font-light">
            <AnimatedWord delay={750}>Join</AnimatedWord>
            <AnimatedWord delay={900}>{registrationCount}</AnimatedWord>
            <AnimatedWord delay={1050}>educators</AnimatedWord>
            <AnimatedWord delay={1200}>in</AnimatedWord>
            <AnimatedWord delay={1350}>the</AnimatedWord>
            <AnimatedWord delay={1500}>neural</AnimatedWord>
            <AnimatedWord delay={1650}>network</AnimatedWord>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-lg blur-2xl"></div>
          <form onSubmit={handleSubmit} className="relative bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-300 font-mono text-sm uppercase tracking-wider">
                  Identity Matrix
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-300 font-mono text-sm uppercase tracking-wider">
                  Communication Channel
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="school" className="text-blue-300 font-mono text-sm uppercase tracking-wider">
                  Institution Node
                </Label>
                <Input
                  id="school"
                  name="school"
                  type="text"
                  value={formData.school}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                  placeholder="School/Institution"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-blue-300 font-mono text-sm uppercase tracking-wider">
                  Function Protocol
                </Label>
                <Input
                  id="role"
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20"
                  placeholder="Your role (optional)"
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-blue-500/20 hover:bg-blue-400/30 text-white font-light px-8 py-4 text-lg border border-blue-400 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] hover:scale-105"
              >
                Initialize Neural Link
              </Button>
              
              <p className="text-xs text-gray-500 font-mono mt-4 uppercase tracking-wider">
                Secure transmission • End-to-end encryption
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
