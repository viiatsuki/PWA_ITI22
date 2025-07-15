import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class DatetimePage implements OnInit {

  fechaActual: Date = new Date(); // Esto permite usar .toISOString()

  fechaCambiada(event: any) {
    console.log('Nueva fecha:', event.detail.value);
  }
  constructor() { }

  ngOnInit() {
  }
  
 
}