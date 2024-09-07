"use client";

import React, { useEffect } from 'react';

const SpeedTest: React.FC = () => {
  useEffect(() => {
    // Load the SpeedChecker API script
    const loadSpeedCheckerScript = () => {
      const scScript = document.createElement('script');
      scScript.setAttribute('src', `${window.location.protocol === 'https:' ? 'https' : 'http'}://www.speedcheckercdn.com/speedchecker.api.js`);
      scScript.addEventListener('load', () => {
        // Define the speedcheckerReady function
        window.speedcheckerReady = (data: any) => {
          console.log('SpeedChecker is ready:', data);
          // Start the test
          if (window.SCApplication && typeof window.SCApplication.startTest === 'function') {
            window.SCApplication.startTest();
          } else {
            console.error('SCApplication or startTest method not available.');
          }
        };
      });
      document.getElementsByTagName('head')[0].appendChild(scScript);
    };

    // Initialize the script loading
    loadSpeedCheckerScript();

    // Event listeners
    const handleDownloadProgress = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Download progress:', customEvent.detail.downloadProgress);
    };

    const handleUploadProgress = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Upload progress:', customEvent.detail.uploadProgress);
    };

    const handleTestComplete = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Test completed. Download speed:', customEvent.detail.downloadSpeed);
      console.log('Test completed. Upload speed:', customEvent.detail.uploadSpeed);
    };

    window.addEventListener('sc_download_progress', handleDownloadProgress as EventListener);
    window.addEventListener('sc_upload_progress', handleUploadProgress as EventListener);
    window.addEventListener('sc_test_complete', handleTestComplete as EventListener);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('sc_download_progress', handleDownloadProgress as EventListener);
      window.removeEventListener('sc_upload_progress', handleUploadProgress as EventListener);
      window.removeEventListener('sc_test_complete', handleTestComplete as EventListener);
    };
  }, []);

  // Function to start the speed test
  const startSpeedTest = () => {
    if (window.SCApplication && typeof window.SCApplication.startTest === 'function') {
      window.SCApplication.startTest();
    } else {
      console.error('SCApplication or startTest method not available.');
    }
  };

  return (
    <div>
      <h1>Internet Speed Test</h1>
      <div id="speedcheckerdiv"></div>
      <button onClick={startSpeedTest}>Start Speed Test</button>
    </div>
  );
};

export default SpeedTest;
