import { useState } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import AnimatedWord from './AnimatedWord';
import { validateFormData } from '@/utils/inputValidation';
import { registrationRateLimiter } from '@/utils/rateLimiting';

interface RegistrationFormProps {
  registrationCount: number;
  setRegistrationCount: (count: number) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  school: string;
  role: string;
  subject: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  school?: string;
  role?: string;
  subject?: string;
}

const RegistrationForm = ({ registrationCount, setRegistrationCount }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    school: '',
    role: '',
    subject: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common subjects for teachers
  const commonSubjects = [
    'Mathematics',
    'English',
    'Science',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Computer Science',
    'Economics',
    'Literature',
    'French',
    'Fine Arts',
    'Physical Education',
    'Music',
    'Religious Studies',
    'Social Studies',
    'Agricultural Science',
    'Technical Drawing',
    'Home Economics',
    'Other'
  ];

  const sendWelcomeEmail = async (registrationData: FormData) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-registration-email', {
        body: {
          name: registrationData.name,
          email: registrationData.email,
          school: registrationData.school,
          role: registrationData.role,
          subject: registrationData.subject
        }
      });

      if (error) {
        console.error('Error sending welcome email:', error);
        toast.error('Registration successful, but welcome email failed to send');
      } else {
        console.log('Welcome email sent successfully');
      }
    } catch (error) {
      console.error('Error calling email function:', error);
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking email:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const identifier = `registration-${formData.email}`;
    if (!registrationRateLimiter.isAllowed(identifier)) {
      const remainingTime = Math.ceil(registrationRateLimiter.getRemainingTime(identifier) / 1000 / 60);
      toast.error(`Too many registration attempts. Please try again in ${remainingTime} minutes.`);
      return;
    }
    
    // Track form submission attempt
    posthog.capture('registration_form_submitted', {
      school: formData.school,
      role: formData.role,
      subject: formData.role === 'teacher' ? formData.subject : null
    });
    
    // Enhanced validation with sanitization
    const validation = validateFormData(formData);
    
    if (!validation.isValid) {
      const errorMap: FormErrors = {};
      validation.errors.forEach(error => {
        if (error.includes('Name')) errorMap.name = error;
        else if (error.includes('Email') || error.includes('email')) errorMap.email = error;
        else if (error.includes('Phone') || error.includes('phone')) errorMap.phone = error;
        else if (error.includes('School') || error.includes('school')) errorMap.school = error;
      });
      
      setErrors(errorMap);
      posthog.capture('registration_form_validation_failed');
      toast.error('Please fix the form errors before submitting');
      return;
    }

    // Role validation
    if (!formData.role) {
      setErrors({ role: 'Please select your role' });
      toast.error('Please fix the form errors before submitting');
      return;
    }

    // Subject validation (only for teachers)
    if (formData.role === 'teacher' && !formData.subject.trim()) {
      setErrors({ subject: 'Please select or enter your subject' });
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(validation.sanitizedData.email);
      if (emailExists) {
        setErrors({ email: 'This email is already registered' });
        posthog.capture('registration_duplicate_email', { email: validation.sanitizedData.email });
        toast.error('This email address is already registered');
        setIsSubmitting(false);
        return;
      }

      // Submit to Supabase with sanitized data
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            name: validation.sanitizedData.name,
            email: validation.sanitizedData.email,
            phone: validation.sanitizedData.phone,
            school: validation.sanitizedData.school,
            role: validation.sanitizedData.role,
            subject: validation.sanitizedData.subject,
            teachers: 0 // Keep for compatibility with existing schema
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        posthog.capture('registration_database_error', { error: error.message });
        toast.error('Registration failed. Please try again.');
        return;
      }

      if (data && data.length > 0) {
        // Track successful registration
        posthog.capture('registration_successful', {
          school: validation.sanitizedData.school,
          role: validation.sanitizedData.role,
          subject: validation.sanitizedData.subject,
          registration_id: data[0].id
        });

        // Send welcome email with sanitized data
        await sendWelcomeEmail(validation.sanitizedData);

        // Update registration count
        setRegistrationCount(registrationCount + 1);
        
        // Show success message
        toast.success("Registration successful! Welcome to the AI Education Revolution", {
          description: 'Check your email for session details and preparation materials.',
          duration: 5000,
        });
        
        // Reset form
        setFormData({ name: '', email: '', phone: '', school: '', role: '', subject: '' });
        setErrors({});
        
        console.log('Registration successful:', data[0]);
      }
    } catch (error) {
      console.error('Registration error:', error);
      posthog.capture('registration_unexpected_error', { error: String(error) });
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSelectChange = (value: string, field: 'role' | 'subject') => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Clear subject when role changes to non-teacher
      ...(field === 'role' && value !== 'teacher' && { subject: '' })
    }));
    
    // Track selections
    if (field === 'role') {
      posthog.capture('registration_role_selected', { role: value });
    } else if (field === 'subject') {
      posthog.capture('registration_subject_selected', { subject: value });
    }
    
    // Clear error when user selects
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const isTeacher = formData.role === 'teacher';

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
                    disabled={isSubmitting}
                    className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.name ? 'border-red-500/50 focus:border-red-400' : 'border-blue-500/30 focus:border-blue-400'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 font-mono">{errors.name}</p>
                  )}
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
                    disabled={isSubmitting}
                    className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.email ? 'border-red-500/50 focus:border-red-400' : 'border-blue-500/30 focus:border-blue-400'
                    }`}
                    placeholder="your.email@domain.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 font-mono">{errors.email}</p>
                  )}
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
                    disabled={isSubmitting}
                    className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.phone ? 'border-red-500/50 focus:border-red-400' : 'border-blue-500/30 focus:border-blue-400'
                    }`}
                    placeholder="+234 xxx xxxx xxx"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400 font-mono">{errors.phone}</p>
                  )}
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
                    disabled={isSubmitting}
                    className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.school ? 'border-red-500/50 focus:border-red-400' : 'border-blue-500/30 focus:border-blue-400'
                    }`}
                    placeholder="Name of your school"
                  />
                  {errors.school && (
                    <p className="mt-1 text-sm text-red-400 font-mono">{errors.school}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                    Your Role *
                  </label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => handleSelectChange(value, 'role')} 
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.role ? 'border-red-500/50 focus:border-red-400' : 'border-blue-500/30 focus:border-blue-400'
                    }`}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border border-blue-500/30 text-white">
                      <SelectItem value="proprietor">Proprietor</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="vice-principal">Vice Principal</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="it-coordinator">IT Coordinator</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-400 font-mono">{errors.role}</p>
                  )}
                </div>
                
                {isTeacher && (
                  <div>
                    <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                      Subject You Teach *
                    </label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleSelectChange(value, 'subject')} 
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.subject ? 'border-red-500/50 focus:border-red-400' : 'border-blue-500/30 focus:border-blue-400'
                      }`}>
                        <SelectValue placeholder="Select your subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border border-blue-500/30 text-white max-h-60">
                        {commonSubjects.map((subject) => (
                          <SelectItem key={subject} value={subject.toLowerCase()}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400 font-mono">{errors.subject}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => posthog.capture('registration_submit_button_clicked')}
                  className="relative group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-mono text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative">
                    {isSubmitting ? 'Securing Your Spot...' : 'Secure My Free Spot Now'}
                  </span>
                </Button>
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
