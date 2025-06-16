
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationFormProps {
  registrationCount: number;
  setRegistrationCount: (count: number) => void;
}

const RegistrationForm = ({ registrationCount, setRegistrationCount }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    schoolName: '',
    role: '',
    teachersToInvite: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationCount(registrationCount + 1);
      toast({
        title: "Registration Successful!",
        description: "Check your email for session details and preparation materials.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        schoolName: '',
        role: '',
        teachersToInvite: ''
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="registration-form" className="py-16 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Reserve Your Spot - Limited Spaces Available
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the AI education revolution. Transform your students' learning experience today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-green-900 font-semibold">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg p-3"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-green-900 font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg p-3"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-green-900 font-semibold">Phone Number (WhatsApp) *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg p-3"
                      placeholder="+234 80X XXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="schoolName" className="text-green-900 font-semibold">School Name *</Label>
                    <Input
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange('schoolName', e.target.value)}
                      required
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg p-3"
                      placeholder="Your school name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-green-900 font-semibold">Your Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg p-3">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprietor">Proprietor</SelectItem>
                        <SelectItem value="principal">Principal</SelectItem>
                        <SelectItem value="vice-principal">Vice Principal</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="it-coordinator">IT Coordinator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="teachersToInvite" className="text-green-900 font-semibold">Teachers to Invite</Label>
                    <Input
                      id="teachersToInvite"
                      type="number"
                      value={formData.teachersToInvite}
                      onChange={(e) => handleInputChange('teachersToInvite', e.target.value)}
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg p-3"
                      placeholder="Optional"
                      min="0"
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-green-900 font-bold py-4 text-lg rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {isSubmitting ? 'Securing Your Spot...' : 'Secure My Free Spot Now'}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Your information is 100% secure and will never be shared</span>
                </div>
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold">Next Session Starts In:</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">2 Days 14 Hours</div>
                  <p className="text-green-200">Don't miss out on this opportunity!</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Limited Availability</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Spots Available:</span>
                    <span className="font-bold text-green-600">{50 - registrationCount} of 50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-amber-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(registrationCount / 50) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {registrationCount} schools already registered
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-900 mb-3">What Happens Next?</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ You'll receive a confirmation email immediately</p>
                  <p>✅ Session details and Zoom link will be sent 24 hours before</p>
                  <p>✅ Preparation materials will be shared via email</p>
                  <p>✅ Follow-up resources after the session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
