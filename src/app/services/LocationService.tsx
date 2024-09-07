
export async function getLocation() {
    try {
      // Get the device's current position
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
  
      const { latitude, longitude } = position.coords;
  
      // Use the Google Maps Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCiSILGgboKxTZ4aPIEM6Qi8fdtoIU-DMk`
      );
      const data = await response.json();
  
      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find((component: any) =>
          component.types.includes('locality')
        )?.long_name;
        const country = addressComponents.find((component: any) =>
          component.types.includes('country')
        )?.long_name;
        const countryCode = addressComponents.find((component: any) =>
          component.types.includes('country')
        )?.short_name;
  
        return {
          latitude,
          longitude,
          city,
          country,
          countryCode,
        };
      } else {
        throw new Error('Failed to fetch location details');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }
  