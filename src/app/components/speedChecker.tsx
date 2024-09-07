"use client"
// components/SpeedChecker.tsx
import { useEffect } from 'react';

const SpeedChecker: React.FC = () => {
  useEffect(() => {
    // Create the script element
    const scScript = document.createElement('script');
    scScript.src = `${document.location.protocol === 'https:' ? 'https' : 'http'}://www.speedcheckercdn.com/speedchecker.api.js`;
    scScript.async = true;

    // Add script to head
    document.head.appendChild(scScript);

    // Initialize the API once the script is loaded
    scScript.addEventListener('load', () => {
      (window as any).SCAPI.init();

      window.speedcheckerReady= function(data) {
        console.log("REady!");
        window.SCApplication.startTest();
        }
        

      
    });

    // Clean up the script on component unmount
    return () => {
      document.head.removeChild(scScript);
    };
  }, []);

  // Method to start the speed test
  const startTest = () => {
    if (window.SCApplication) {
      console.log('Here');
      window.SCApplication.startTest();
    } else {
      console.error('SpeedChecker API is not initialized.');
    }
  };

  return (
    
    <div>
      <button onClick={startTest} className='mb-100'>Start Speed Test</button>
      <div id="speedcheckerdiv"></div>
    </div>
  );
};

export default SpeedChecker;


