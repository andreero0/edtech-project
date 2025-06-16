
import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ShaderBackground />
      <div className="relative z-10">
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
