import { Component } from '@angular/core';

const AUTOR = 'Sasha Stasiuk';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  autor: string = AUTOR;
}
