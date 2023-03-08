import { Component, OnInit } from '@angular/core';
import { Dish } from './dish.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topDishes: Dish[] = [
    {
      title: 'БОРЩ',
      path: './assets/top/borshh.jpg'
    },
    {
      title: 'Дируни',
      path: './assets/top/deruny.jpg'
    },
    {
      title: 'Вареники',
      path: './assets/top/varenyky.jpg'
    }
  ];

  ngOnInit(): void {
    this.shuffleArr(this.topDishes);
  }

  shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]]
    }
  }
}
