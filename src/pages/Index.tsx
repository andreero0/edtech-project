
import { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import InfoSession from '../components/InfoSession';
import Credibility from '../components/Credibility';
import RegistrationForm from '../components/RegistrationForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ShaderBackground from '../components/ShaderBackground';

const Index = () => {
  const [registrationCount, setRegistrationCount] = useState(27);
  const { trackPageView, trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page view when component mounts
    trackPageView('landing_page', {
      registration_count: registrationCount
    });

    // Track scroll events to see how far users scroll
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent >= 25 && !sessionStorage.getItem('scroll_25')) {
        trackEvent('page_scroll', { percent: 25 });
        sessionStorage.setItem('scroll_25', 'true');
      }
      if (scrollPercent >= 50 && !sessionStorage.getItem('scroll_50')) {
        trackEvent('page_scroll', { percent: 50 });
        sessionStorage.setItem('scroll_50', 'true');
      }
      if (scrollPercent >= 75 && !sessionStorage.getItem('scroll_75')) {
        trackEvent('page_scroll', { percent: 75 });
        sessionStorage.setItem('scroll_75', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackPageView, trackEvent, registrationCount]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ShaderBackground />
      <div className="relative z-20">
        <Hero registrationCount={registrationCount} />
        <ValueProposition />
        <InfoSession />
        <Credibility />
        <RegistrationForm 
          registrationCount={registrationCount}
          setRegistrationCount={setRegistrationCount}
        />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
