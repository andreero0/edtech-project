
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail } from '@/utils/inputValidation';
import { registrationRateLimiter } from '@/utils/rateLimiting';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin/dashboard');
    } else if (!loading && user && !isAdmin) {
      toast.error('Admin access required');
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting
    const identifier = `login-${email}`;
    if (!registrationRateLimiter.isAllowed(identifier)) {
      const remainingTime = Math.ceil(registrationRateLimiter.getRemainingTime(identifier) / 1000 / 60);
      toast.error(`Too many login attempts. Please try again in ${remainingTime} minutes.`);
      return;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.errors[0]);
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        toast.error('Invalid credentials or insufficient permissions');
        return;
      }

      toast.success('Login successful');
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-white mb-2">Admin Login</h1>
            <p className="text-blue-200/80 text-sm">Authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-300 disabled:opacity-50"
                placeholder="admin@domain.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-blue-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-300 disabled:opacity-50"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-mono text-sm uppercase tracking-wider py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              ← Back to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
