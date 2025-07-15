import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertController, IonicModule} from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import type { OverlayEventDetail } from '@ionic/core';

import { IonAlert, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class AlertPage{

  constructor(private alertController: AlertController) { }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: '',
      message: 'Diste click aquí',
      buttons: ['Ok'],
    });

    await alert.present();
  }

   public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Nombres',
    },
    {
      placeholder: 'Apellido Paterno',
      attributes: {
        maxlength: 8,
      },
    },
    {
      placeholder: 'Apellido Materno',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Edad',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'Carrera',
    },
  ];

  async showAlertPersonalizada(){
  const alertPersonalizada = await this.alertController.create({
    backdropDismiss: false,
    header: '¿Qué quieres hacer con tu producto?',
    subHeader: 'Soy algo referente al producto que debes elegir.',
    message: 'Selecciona una opción',
    buttons: ['Guardar', 'Borrar', 'Cancelar']
  });
  await alertPersonalizada.present();
}

public alertButton = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
  public ConsoleButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
}
