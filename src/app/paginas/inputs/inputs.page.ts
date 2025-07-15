import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule, FormsModule],
})
export class InputsPage implements OnInit {

  nombre: string = 'Lluvia Monserrat';
  apellidoPaterno: string = 'Barrios';
  apellidoMaterno: string = 'Zamora';
  correo: string = '202100027@uprr.edu.mx';
  telefono: string = '897-102-6321';
  fechaNacimiento: string = '2003-12-04';
  edad: number = 0;

  ngOnInit() {
    this.calcularEdad();
  }

  calcularEdad() {
    if (!this.fechaNacimiento) return;

    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    this.edad = edad;
  }
}
