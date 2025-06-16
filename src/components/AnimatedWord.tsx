
import { useEffect, useRef, useState } from 'react';

interface AnimatedWordProps {
  children: string;
  delay?: number;
  className?: string;
}

const AnimatedWord = ({ children, delay = 0, className = '' }: AnimatedWordProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wordRef.current) return;
      
      const rect = wordRef.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
        Math.pow(e.clientY - (rect.top + rect.height/2), 2)
      );
      
      if (distance < 100) {
        wordRef.current.style.transform = 'translateY(-3px) scale(1.05)';
        wordRef.current.style.color = '#60a5fa';
      } else {
        wordRef.current.style.transform = 'translateY(0) scale(1)';
        wordRef.current.style.color = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <span
      ref={wordRef}
      className={`inline-block opacity-0 mx-1 transition-all duration-300 hover:text-blue-400 hover:-translate-y-1 hover:scale-105 ${className} ${
        isVisible ? 'animate-[word-appear_1s_ease-out_forwards]' : ''
      }`}
      style={{
        textShadow: isVisible ? '0 0 20px rgba(96, 165, 250, 0.3)' : 'none'
      }}
    >
      {children}
    </span>
  );
};

export default AnimatedWord;
