"use client";
import React, { useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
const Speed = dynamic(() => import('../components/Speed'), { ssr: false });
import styles from './MainSpeedPage.module.css';
import { useLocation } from '../contexts/LocationContext';
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Svgs
import ZifiHeaderIcon from '../components/Svgs/ZifiHeaderIcon';
import ZtfrFooter from '../components/Svgs/ZtfrFooter';
import ZimoFooter from '../components/Svgs/Zimo-footer';
import ZmeetFooter from '../components/Svgs/Zmeet-footer';
import Flag from '../components/Svgs/flag';
import { useMediaQuery } from '@uidotdev/usehooks';

const MainSpeedPage: React.FC = () => {
  const [changeText, setChangeText] = useState("YOUR INTERNET SPEED");
  const { locationData, isLoading } = useLocation();
  const isMobile = useMediaQuery('(max-width: 1000px)'); // Media query to check for mobile screens

  const handleButtonClick = () => {
    setChangeText((prevText) =>
      prevText === "YOUR INTERNET SPEED" ? "MORE INFORMATION" : "YOUR INTERNET SPEED"
    );
  };

  return (
    <div className={`${styles['speed-main-screen-container']} min-h-screen bg-black text-white flex flex-col`}>
      <header className={`${styles['speed-main-screen-header']} flex justify-between items-center mb-4`} style={{ marginBottom: isMobile && changeText === "MORE INFORMATION" ? '0px' : '10px' }}>
        <a href="" target="_blank" rel="noopener noreferrer" >
          <ZifiHeaderIcon width="52" height="52" fill='white' className={`${styles['speed-screen-svg-zifi']}`}  />
        </a>
        <span className={`${styles['speed-main-screen-text']} text-center`} style={{ display: isMobile && changeText === "MORE INFORMATION" ? 'none' : 'flex' }}>{changeText}</span>
        <a href="" target="_blank" rel="noopener noreferrer" className={` ${styles['speed-screen-flag-a']}`} style={{ height: isMobile && changeText === "MORE INFORMATION" ? '1px' : '40px' }}>
          {locationData?.countryCode ? (
            <span className={`flag-icon-squared fi-${locationData.countryCode.toLowerCase()} ${styles['speed-screen-flag']}`}></span>
          ) : (
            <span className="flag-icon-squaredfi-gb"></span> 
          )}
        </a>
      </header>

      <main className={`flex-grow flex items-center justify-center ${styles['speed-screen-speed']}`}>
        <Speed onButtonClick={handleButtonClick} />
      </main>

      <footer className={`${styles['speed-main-screen-footer']} flex  mt-4`}>
        {isMobile ? (
          // Single row layout for mobile screens
          <div className={`flex justify-between items-center w-full`}>
            <a href="https://ztfr.org/" target="_blank" rel="noopener noreferrer" className="mr-2">
              <ZtfrFooter width="58" height="58" fill='white' />
            </a>
            <a href="https://zimogroup.org/" target="_blank" rel="noopener noreferrer" className="mr-2">
              <ZimoFooter width="58" height="58" fill='white' />
            </a>
            <a href="https://www.zimomeet.com/" target="_blank" rel="noopener noreferrer">
              <ZmeetFooter width="58" height="58" fill='white' />
            </a>
          </div>
        ) : (
          // Two-row layout for desktop screens
          <>
            <div className={`${styles['speed-main-screen-footer-row-1']} flex items-center mb-2`}>
              <a href="https://zimogroup.org/" target="_blank" rel="noopener noreferrer">
                <ZimoFooter width="72" height="32" fill='white' />
              </a>
            </div>
            <div className={`${styles['speed-main-screen-footer-row-2']} flex justify-end items-center`}>
              <div className={`${styles['speed-main-screen-footer-svg-column']} flex items-center`}>
                <a href="https://ztfr.org/" target="_blank" rel="noopener noreferrer">
                  <ZtfrFooter width="58" height="58" fill='white' />
                </a>
              </div>
              <div className={`${styles['speed-main-screen-footer-svg-column']} flex items-center ml-2`}>
                <a href="https://www.zimomeet.com/" target="_blank" rel="noopener noreferrer">
                  <ZmeetFooter width="58" height="58" fill='white' />
                </a>
              </div>
            </div>
          </>
        )}
      </footer>
    </div>
  );
};

export default MainSpeedPage;
