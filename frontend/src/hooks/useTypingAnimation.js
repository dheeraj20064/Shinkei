import { useState, useEffect, useRef } from 'react';

// Typing animation hook — streams text character by character
export function useTypingAnimation(text, speed = 12, active = false) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      indexRef.current = 0;
      return;
    }
    setDisplayed('');
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, active]);

  return displayed;
}
