
import { useState } from 'react';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import InfoSession from '../components/InfoSession';
import Credibility from '../components/Credibility';
import RegistrationForm from '../components/RegistrationForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  const [registrationCount, setRegistrationCount] = useState(27);

  return (
    <div className="min-h-screen bg-black text-white">
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
  );
};

export default Index;
