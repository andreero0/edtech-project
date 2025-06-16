
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Let Your School Fall Behind
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            The AI revolution in education is happening now. Join us to ensure your students 
            have access to the best learning technologies available.
          </p>
          
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-amber-400 hover:bg-amber-500 text-green-900 font-bold px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            Register Now - It's Free!
          </Button>
        </div>
        
        <div className="border-t border-green-700 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span>info@aieducationng.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-amber-400" />
                  <span>WhatsApp: +1 (XXX) XXX-XXXX</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-green-700 hover:bg-amber-400 hover:text-green-900 p-3 rounded-full transition-all duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="bg-green-700 hover:bg-amber-400 hover:text-green-900 p-3 rounded-full transition-all duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="bg-green-700 hover:bg-amber-400 hover:text-green-900 p-3 rounded-full transition-all duration-200">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-green-700">
            <p className="text-green-200">
              © 2025 AI Education Nigeria. Empowering Nigerian schools with AI technology.
            </p>
            <p className="text-green-300 mt-2">
              Made with ❤️ for Nigerian educators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
