"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './Speed.module.css'; 
import { useMediaQuery } from '@uidotdev/usehooks';


// import { FastAPI, SpeedUnits } from 'fast-api-speedtest';

// SVGs
import GreenCircle from './Svgs/GreenCircle';
import YellowCircle from './Svgs/YellowCircle';
import MoreInfoPage from './MoreInfo';
import SpeedChecker_ from './SpeedChecker_';



interface SpeedProps {
  onButtonClick: () => void;
}

const Speed: React.FC<SpeedProps> = ({ onButtonClick }) => {
  const [svg, setSvg] = useState(
    <div className="relative flex justify-center items-center">
      <YellowCircle width="95px" height="95px" />
      <span className="absolute text-white text-[20px] font-light tracking-[.1vw] cursor-pointer" style={{ zIndex: 10 }}>GO</span>
    </div>
  );

  const [speed, setSpeed] = useState(0); // Initial speed
  const [isCounting, setIsCounting] = useState(false); // To track if the counter is running
  const [showInfo, setShowInfo] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
 

  const speedCheckerRef = useRef<{ startTest: () => void }>(null);

  const handleStartTest = () => {
    if (speedCheckerRef.current) {
      speedCheckerRef.current.startTest();
    }
  };


  // UseMediaQuery hook to detect mobile screen
  const isMobile = useMediaQuery('(max-width: 1000px)');



  // Handler for click event on "MORE INFORMATION"
  const handleMoreInfoClick = () => {
    setShowOverlay(true); // Show the overlay
    onButtonClick();
  };

  // Handler for click event on YellowCircle
  const handleYellowCircleClick = async () => {
    setSvg(<GreenCircle width="100px" height="100px" />); // Change SVG to GreenCircle
    setShowInfo(false);
    setIsCounting(true); // Start the counter
    if (speedCheckerRef.current) {
      await speedCheckerRef.current.startTest();
    }
  };

  // Function to handle closing the overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false);
    onButtonClick();
  };



  // Effect to handle the pseudo counter
  useEffect(() => {
    if (isCounting) {
      const intervalId = setInterval(() => {
        const randomSpeed = (Math.random() * 100).toFixed(2);
        setSpeed(parseFloat(randomSpeed));
      }, 200);

      // After 3 seconds, stop the counter and set the final speed
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setSpeed(105.31); // Use the actual speed from the test result instead
        setSvg(<div className="relative flex justify-center items-center">
          <YellowCircle width="95px" height="95px" />
          <span className="absolute text-white text-[20px] font-light tracking-[.1vw] cursor-pointer">GO</span>
        </div>);
        setIsCounting(false);
        setShowInfo(true); // Show the "MORE INFORMATION" text
      }, 3000);

      // Cleanup on component unmount or when counting stops
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isCounting]);

  return (
    <div className={`flex-grow ${styles.speedMainContainer} flex justify-end items-end h-full w-full`}>
      <div className={`opacity-90 w[100px] h-[100px] overflow-hidden `} >
                <SpeedChecker_ ref={speedCheckerRef} />
              </div>
      {isMobile && showOverlay ?
        (
          <div className={`${styles.overlay} relative m1-[20px] w-[96vw] h-100 bg-black opacity-100`}>
            <MoreInfoPage onClose={handleCloseOverlay} />
          </div>
        ) :
        (
          <>
            <div className={`flex items-center ${styles.speedMainRow} h-full`}>
              {/* Sub Row */}
              <div className={`flex items-center justify-center ${styles.speedSubRow}`} >
                {speed}
              </div>

              {/* Sub Column */}
              <div className={`flex flex-col justify-center items-center ${styles.speedSubColumn}`}>
                <div className={`${styles.speedSubColumnText}`}>
                  Mbps
                </div>

                {/* Conditionally render "MORE INFORMATION" before or after the SVG based on screen size */}
                {isMobile && showInfo && (
                  <div
                    className={`${styles.speedMoreInfoText} mt-[20px] cursor-pointer`}
                    onClick={handleMoreInfoClick}
                  >
                    MORE INFORMATION
                  </div>
                )}

                <div
                  className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative`}
                  onClick={handleYellowCircleClick}
                  style={{ cursor: 'pointer' }}
                >
                  {svg}
                </div>
                
              </div>
              
            </div>
            {!isMobile && showInfo && (
              <div
                className={`${styles.speedMoreInfoText} mt-[20px] cursor-pointer`}
                onClick={handleMoreInfoClick}
              >
                MORE INFORMATION
              </div>
            )}

            {/* Conditionally render the overlay */}
            {showOverlay && (
              <div className={`${styles.overlay} absolute top-15 w-[96vw] h-90 bg-black opacity-90`}>
                <MoreInfoPage onClose={handleCloseOverlay} />
              </div>
            )}
            
              
            
          </>
        )}
        
    </div>
  );
};

export default Speed;
