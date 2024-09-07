
// import React, { createContext, useState, useContext, ReactNode } from 'react';


// interface SpeedTestResult {
//     ping: number;
//     downloadSpeed: number;
//     uploadSpeed: number;
//     pingUnit: string;
//     downloadUnit: string;
//     uploadUnit: string;
//     servers: string[];
//   }
  
//   interface SpeedTestContextType {
//     result: SpeedTestResult | null;
//     setResult: (result: SpeedTestResult | null) => void;
//   }
  

// const SpeedTestContext = createContext<SpeedTestContextType | undefined>(undefined);

// export const SpeedTestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [result, setResult] = useState<SpeedTestResult | null>(null);

//   return (
//     <SpeedTestContext.Provider value={{ result, setResult }}>
//       {children}
//     </SpeedTestContext.Provider>
//   );
// };

// export const useSpeedTest = () => {
//   const context = useContext(SpeedTestContext);
//   if (context === undefined) {
//     throw new Error('useSpeedTest must be used within a SpeedTestProvider');
//   }
//   return context;
// };
