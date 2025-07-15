import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

interface Alumno {
  name: string;
  beca: string;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, ComponentesModule],
})

export class CheckboxPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  infoNombres: Alumno[] = [
    {
      name: 'Kenma',
      beca: 'false'
    },
    {
      name: 'Tomatiu',
      beca: 'true'
    },
    {
      name: 'Cookie',
      beca: 'false'
    },
    {
      name: 'Negro',
      beca: 'true'
    },
    {
      name: 'Mango',
      beca: 'false'
    },
    {
      name: 'Chiquita',
      beca: 'false'
    },
  ]

}