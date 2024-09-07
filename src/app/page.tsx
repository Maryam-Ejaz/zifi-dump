import dynamic from 'next/dynamic';
const MainSpeedPage = dynamic(() => import('./components/MainSpeedPage'), { ssr: false });

import { ThemeProvider } from "./theme/ThemeProvider";
import { LocationProvider } from './contexts/LocationContext';


export default function Home() {
  return (
    <ThemeProvider>
      <LocationProvider>

        <MainSpeedPage />

      </LocationProvider>
    </ThemeProvider>
  );
}
