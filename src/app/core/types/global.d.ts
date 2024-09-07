interface Window {
    SCAPI: {
      init: () => void;
    };
    SCApplication: {
      startTest: () => void;
    };
    speedcheckerTakenTestSaved: (data: {
      Provider: { Title: string };
      TakenTest: {
        User: {
          CountryCode: string;
          CountryName: string;
          City: string;
          Latitude: number;
          Longitude: number;
        };
        Ping: { time: number };
        Download: { speedInKbps: number };
        Upload: { speedInKbps: number };
      };
    }) => void;
    speedcheckerReady: (data: any) => void;
    speedcheckerPingFinished: (name: string, country: string, pingInMs: number) => void;
    speedcheckerPingStarted: () => void;
    speedcheckerDownloadStarted: () => void;
    speedcheckerDownloadPrepared: () => void;
    speedcheckerDownloadProgress: (speedInKbps: number) => void;
    speedcheckerDownloadFinished: (speedInKbps: number) => void;
    speedcheckerUploadStarted: () => void;
    speedcheckerUploadPrepared: () => void;
    speedcheckerUploadProgress: (speedInKbps: number) => void;
    speedcheckerUploadFinished: (speedInKbps: number) => void;
    onlyDownload: boolean;
    onlyUpload: boolean;
    serverTitle: string;
  }
  