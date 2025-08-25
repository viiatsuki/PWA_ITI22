import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mx.yubia.app',
  appName: 'APPITI22Tab',
  webDir: 'www',
  plugins: {
    PushNotification: {
      presentationOptions: ["badge", "sound", "alert"],
    },
}
 }

 export default config;