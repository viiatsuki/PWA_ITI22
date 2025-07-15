import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonAlert, IonButton, IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface estlista{
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class InicioPage {

  Elementos: estlista[] = [
    {
      name: 'Alerta',
      redirectTo: '/alert',
      icon: 'alert-outline',
    },
    {
      name: 'Card',
      redirectTo: '/card',
      icon: 'card-outline',
    },
    {
      name: 'Datetime',
      redirectTo: '/datetime',
      icon: 'calendar-outline',
    },
    {
      name: 'Checkbox',
      redirectTo: '/checkbox',
      icon: 'checkbox-outline',
    },
    {
      name: 'Fab',
      redirectTo: '/fab',
      icon: 'add-circle-outline',
    },
    {
      name: 'Infinite',
      redirectTo: '/infinite',
      icon: 'infinite-outline',
    },
    {
      name: 'Inputs',
      redirectTo: '/inputs',
      icon: 'text-outline',
    },
    {
      name: 'Grid',
      redirectTo: '/grid',
      icon: 'grid-outline',
    },
    {
      name: 'Modal',
      redirectTo: '/modal',
      icon: 'duplicate-outline',
    },
    {
      name: 'List',
      redirectTo: '/list',
      icon: 'list-outline',
    },
    {
      name: 'Pop Over',
      redirectTo: '/popover',
      icon: 'mail-unread-outline',
    }
  ]
}
