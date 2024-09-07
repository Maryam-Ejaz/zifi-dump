"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLocation } from '../services/LocationService';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  countryCode: string;
}

interface LocationContextProps {
  locationData: LocationData | null;
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const location = await getLocation();
        setLocationData(location);
      } catch (error) {
        console.error('Failed to fetch location data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <LocationContext.Provider value={{ locationData, isLoading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
