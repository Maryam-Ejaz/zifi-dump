"use client";
import { useEffect, useImperativeHandle, forwardRef } from 'react';

const SpeedChecker_ = forwardRef((_, ref) => {

  useImperativeHandle(ref, () => ({
    startTest: () => {
        console.log('Starting test from component...');
        (window as any).SCApplication.startTest();
    },
  }));

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

        (window as any).speedcheckerReady = () => {
          console.log('SpeedChecker is ready.');
        };

        (window as any).speedcheckerDownloadStarted = () => {
          console.log('Download test started.');
        };

        (window as any).speedcheckerDownloadPrepared = () => {
          console.log('Download test prepared.');
        };

        (window as any).speedcheckerDownloadProgress = (speedInKbps: number) => {
          console.log(`Download progress: ${speedInKbps} Kbps`);
        };

        (window as any).speedcheckerDownloadFinished = (speedInKbps: number) => {
          console.log(`Download finished. Final speed: ${speedInKbps} Kbps`);
        };
    }
        
    );

    // Clean up the script on component unmount
    return () => {
        document.head.removeChild(scScript);

    };
  }, []);

  return (
    <div >
      <div id="speedcheckerdiv"></div>
      </div>
  );
});

export default SpeedChecker_;


