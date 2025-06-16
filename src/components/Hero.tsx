
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Sparkles } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-br from-green-800 to-green-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="bg-amber-400 text-green-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              500+ Nigerian Schools Already Exploring AI
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Students' Performance with{' '}
            <span className="text-amber-400">AI-Powered Education</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
            Join Nigerian educators discovering how to 5x-10x student outcomes 
            using cutting-edge AI technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-amber-400 hover:bg-amber-500 text-green-900 font-bold px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Reserve Your Free Spot
            </Button>
            
            <div className="flex items-center gap-2 text-green-200">
              <Users className="w-5 h-5" />
              <span>{registrationCount} schools registered for next session</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-green-700 rounded-lg p-6 mb-4">
                <TrendingUp className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Proven Results</h3>
                <p className="text-green-200">Transform C & D students to A & B grades</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-700 rounded-lg p-6 mb-4">
                <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-900 font-bold text-xl">NG</span>
                </div>
                <h3 className="font-bold text-lg">Made for Nigeria</h3>
                <p className="text-green-200">Designed for Nigerian educational context</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-700 rounded-lg p-6 mb-4">
                <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Stay Competitive</h3>
                <p className="text-green-200">Don't fall behind in the AI revolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
