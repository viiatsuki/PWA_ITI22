import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  init() { 
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications')
  }
  if(isPushNotificationsAvailable){
    PushNotifications.requestPermissions().then( (result)
  )
  }
}
