import React, { useState, useEffect } from 'react';
import styles from './MoreInfo.module.css';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useLocation } from '../contexts/LocationContext';
import { ip, ipv6, mac } from 'address';

// SVGs
import Arrow from './Svgs/Arrow';
import UserIcon from './Svgs/UserIcon';
import WifiIcon from './Svgs/Wifi';
import Flag from './Svgs/flag';
import ArrowUp from './Svgs/ArrowUp';
import ArrowDown from './Svgs/ArrowDown';

// Function to get IP address (you need to implement this or use an existing library)
const getIpAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return 'N/A';
  }
};

// Function to get local IP address
const getLocalIP = async () => {
  try {
    const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;

    const pc = new RTCPeerConnection({
      iceServers: [],
    });

    pc.createDataChannel('');

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    return new Promise<string>((resolve) => {
      pc.onicecandidate = (ice) => {
        if (ice && ice.candidate && ice.candidate.candidate) {
          const ipMatch = ipRegex.exec(ice.candidate.candidate);
          if (ipMatch) {
            resolve(ipMatch[0]);
            pc.onicecandidate = null; 
          }
        }
      };
    });
  } catch (error) {
    console.error('Error fetching local IP address:', error);
    return 'N/A';
  }
};

interface MoreInfoPageProps {
  onClose: () => void; // Prop to handle closing the overlay
}

const MoreInfoPage: React.FC<MoreInfoPageProps> = ({ onClose }) => {
  // UseMediaQuery hook to detect mobile screen
  const isMobile = useMediaQuery('(max-width: 1000px)');
  const { locationData, isLoading } = useLocation();

  // State for date and time
  const [currentDate, setCurrentDate] = useState<string>('LOADING..');
  const [currentTime, setCurrentTime] = useState<string>('LOADING..');
  const [macAddress, setMacAddress] = useState<string>('LOADING..');
  const [internalIp, setInternalIp] = useState<string>('LOADING..');
  const [externalIp, setExternalIp] = useState<string>('LOADING..');

  // Function to format date and time
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

   // Update date and time every second
   useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(formatDate(now));
      setCurrentTime(formatTime(now));
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch MAC address and IP addresses
  useEffect(() => {
    // macaddress.one()
    //   .then(mac => setMacAddress(mac))
    //   .catch(err => console.error('Error retrieving MAC address:', err));
    
    getIpAddress().then(ip => {
      setExternalIp(ip);
    });

  }, []);

  // useEffect(() => {
  //   const fetchNetworkInfo = async () => {
  //     try {
  //       // Fetch the network address
  //       const addr = await address();

  //       setInternalIp(addr.ip || 'N/A'); 
  
  

  //     } catch (error) {
  //       console.error('Error fetching network information:', error);
  //     }
  //   };
  
  //   fetchNetworkInfo();
  // }, []);

  // useEffect(() => {
  //   // Retrieve IPv4 address
  //   setInternalIp(ip() || 'N/A');


  //   // Retrieve MAC address
  //   mac((err, addr) => {
  //     if (err) {
  //       console.error('Error fetching MAC address:', err);
  //     } else {
  //       setMacAddress(addr || 'N/A');
  //     }
  //   });
  // }, []);
  

  useEffect(() => {
    async function fetchMacAddress() {
      try {
        const response = await fetch('/api/getAddress');
        const data = await response.json();
        setMacAddress(data.macAddress);
      } catch (error) {
        console.log(error)
      }
    }

    fetchMacAddress();
  }, []);


  return (
    <div className={`flex w-full h-full ${styles.moreInfoRow}`}>
      <div className={`flex flex-col ${styles.moreInfoColumn} `}>
        {/* Left Column */}
        <div className={`flex flex-col ${styles.moreInfoColumnOne}`}>
          {/* Row 1: Text */}
          <h2 className={`${styles.MoreInfoText}`}>MORE INFORMATION</h2>
          {/* Row 2: SVG */}
          <Arrow width="20" height="20" onClick={onClose} className={styles.arrowIcon} />

          {/* Table Section */}
          <div className={`${styles['more-info-table-container']}`}>
            <table className={`${styles.moreInfoTable}`}>
              <tbody>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={2}><a href="" target="_blank" rel="noopener noreferrer" className={` ${styles['speed-screen-flag-a']}`}>
          {locationData?.countryCode ? (
            <span className={`flag-icon-squared fi-${locationData.countryCode.toLowerCase()} ${styles['speed-screen-flag']}`}></span>
          ) : (
            <span className="flag-icon-squaredfi-gb"></span> 
          )}
        </a></td>
                  <td className={`${styles.labelCell}`}>CITY</td>
                  <td className={`${styles.dataCell}`}>{locationData?.city.toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>COUNTRY</td>
                  <td className={`${styles.dataCell}`}>{locationData?.country.toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={5}><UserIcon width="5vh" height="5vh" className={` ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>LATITUDE</td>
                  <td className={`${styles.dataCell}`}>{locationData?.latitude}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>LONGITUDE</td>
                  <td className={`${styles.dataCell}`}>{locationData?.longitude}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>INTERNAL IP</td>
                  <td className={`${styles.dataCell}`}>10.0.0.183</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>EXTERNAL IP</td>
                  <td className={`${styles.dataCell}`}>{externalIp}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>MAC ADDRESS</td>
                  <td className={`${styles.dataCell}`}>5D:C3:07:7A:C4:88</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.iconCell}`} rowSpan={4}><WifiIcon width="5vh" height="5vh" className={` ${styles.svgIcon}`} /></td>
                  <td className={`${styles.labelCell}`}>PROVIDER</td>
                  <td className={`${styles.dataCell}`}>VIRGIN MEDIA</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>ROUTER NAME</td>
                  <td className={`${styles.dataCell}`}>TP LINK</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>SERVER</td>
                  <td className={`${styles.dataCell}`}>LONDON</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>PING</td>
                  <td className={`${styles.dataCell}`}>12 ms</td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={1}></td>
                  <td className={`${styles.emptyLabelCell}`}></td>
                  <td className={`${styles.emptyDataCell}`}></td>
                </tr>
                <tr>
                  <td className={`${styles.emptyCell}`} rowSpan={2}></td>
                  <td className={`${styles.labelCell}`}>DATE</td>
                  <td className={`${styles.dataCell}`}>{currentDate}</td>
                </tr>
                <tr>
                  <td className={`${styles.labelCell}`}>TIME</td>
                  <td className={`${styles.dataCell}`}>{currentTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`flex ${styles.moreInfoColumn} ${styles.moreInfoColumnTwo}`}>
        {/* Right Column */}
        <div className={`flex ${styles.speedMainContainer} ${styles.speedMainContainerOne} flex items-end w-full flex-col`}>
          <div className={`flex items-center ${styles.speedMainRow}`}>
            {/* Sub Row */}
            <div className={`flex items-end justify-end ${styles.speedSubRow}`}>
              105.31
            </div>

            {/* Sub Column */}
            <div className={`flex flex-col justify-center items-end ${styles.speedSubColumn}`}>
              <div className={`${styles.speedSubColumnText}`}>
                Mbps
              </div>
              <div
                className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative`}
              >
                <ArrowDown width="5vh" height="5vh" />
              </div>


            </div>

          </div>
          <div className={`${styles.speedMoreInfoText} justify-center items-center`}>
            DOWNLOAD
          </div>




        </div>

        <div className={`flex ${styles.speedMainContainer} flex items-end justify-center w-full flex-col mt-[3vw]`}>
          <div className={`flex items-center ${styles.speedMainRow} `}>
            {/* Sub Row */}
            <div className={`flex items-end justify-end ${styles.speedSubRow}`}>
              52.97
            </div>

            {/* Sub Column */}
            <div className={`flex flex-col justify-center items-center ${styles.speedSubColumn}`}>
              <div className={`${styles.speedSubColumnText}`}>
                Mbps
              </div>
              <div
                className={`${styles.speedSubColumnSvg} flex items-center justify-center mt-2 relative `}>
                <ArrowUp width="5vh" height="5vh" />
              </div>

            </div>

          </div>
          <div className={`${styles.speedMoreInfoText}`}>
            UPLOAD
          </div>




        </div>
      </div>

      {isMobile && (

        <div
          className={`${styles.speedMoreInfoTitle} mt-[20px] cursor-pointer`}
        >
          MORE INFORMATION
        </div>
      )}
    </div>
  );
};

export default MoreInfoPage;
