import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {

  @Input() titulo: string = '';
    @Input() defaulHref: string = '/';
      @Input() backText: string = 'Atras';

  constructor() { }
}