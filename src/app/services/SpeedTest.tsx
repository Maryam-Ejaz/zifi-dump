
// import { FastAPI, SpeedUnits } from 'fast-api-speedtest';

// const FastTest = new FastAPI({
//   measureUpload: true,
//   downloadUnit: SpeedUnits.MBps,
//   timeout: 60000
// });

// export const runSpeedTest = async () => {
//   try {
//     const result = await FastTest.runTest();
//     return {
//       ping: result.ping ?? 0, // Default to 0 if undefined
//       downloadSpeed: result.downloadSpeed ?? 0, // Default to 0 if undefined
//       uploadSpeed: result.uploadSpeed ?? 0, // Default to 0 if undefined
//       pingUnit: result.pingUnit ?? 'ms', // Default to 'ms' if undefined
//       downloadUnit: result.downloadUnit ?? 'Mbps', // Default to 'Mbps' if undefined
//       uploadUnit: result.uploadUnit ?? 'Mbps', // Default to 'Mbps' if undefined
//       servers: result.servers ?? [], // Default to empty array if undefined
//     };
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };
