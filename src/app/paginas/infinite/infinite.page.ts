import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, ComponentesModule],
})
export class InfinitePage implements OnInit {
  datos = Array(140);
  constructor() { }

  ngOnInit() {
  }

}
