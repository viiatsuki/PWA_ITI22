import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonAlert, IonButton, IonicModule, AlertController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface estlista{
  icon: string;
  name: string;
  redirectTo: string;
}

interface User {
  ID: number;
  usuario: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class InicioPage implements OnInit {

  currentUser: User | null = null;

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

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Obtener información del usuario del localStorage
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    } else {
      // Si no hay usuario logueado, redirigir al login
      this.router.navigate(['/login']);
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            // Limpiar localStorage
            localStorage.removeItem('currentUser');
            // Redirigir al login
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
