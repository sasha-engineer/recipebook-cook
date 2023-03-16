import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Dish } from './dish.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('dishList', [
      state('in', style({
        opacity: 1,
        transform: 'translateZ(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateZ(-400px)'
        }),
        animate(1200)
      ])
    ]),
  ]
})
export class HomeComponent implements OnInit {
  topDishes: Dish[] = [
    {
      title: 'БОРЩ',
      path: './assets/top/borshh.jpg',
      description: 'Спершу варимо бульйон. У каструлю наливаємо 1,5-2 літра води. Додаємо м’ясо й ставимо на середній вогонь. Перед закипанням знімаємо піну. Щойно бульйон закипить, накриваємо кришкою і варимо на повільному вогні годину-півтори.' +
      'Тим часом готуємо засмажку. Чистимо буряк, моркву та цибулю. Буряк натираємо на крупній тертці, а моркву – на середній. Цибулю нарізаємо кубиками.' +
      'На середньому вогні в сковороді розігріваємо олію, висипаємо туди цибулю та моркву, смажимо 5 хвилин. Потім додаємо буряк (його можна посипати лимонною кислотою або збризнути соком свіжого лимона – так борщ буде по-справжньому червоним). Смажимо овочі ще 5 хвилин, додаємо томатну пасту, перемішуємо й смажимо все ще 5-7 хвилин.'+
      'А тепер варимо сам борщ. З бульйону виймаємо м’ясо і, поки воно холоне, кидаємо в бульйон нашатковану капусту. Через 5-10 хвилин додаємо нарізану соломкою картоплю. Відокремлюємо м’ясо від кістки й нарізаємо кубиками. Повертаємо м’ясо в борщ, солимо його і додаємо засмажку. Перемішуємо борщ, кладемо лавровий лист і дрібно посічену зелень, накриваємо кришкою та варимо все ще 5-7 хвилин.' +
      'Подаємо борщ зі сметаною і зеленню.'
    },
    {
      title: 'Дируни',
      path: './assets/top/deruny.jpg',
      description: 'some desc here'
    },
    {
      title: 'Вареники',
      path: './assets/top/varenyky.jpg',
      description: 'some desc here'
    }
  ];
  selectedDish: Dish = new Dish('','','');

  ngOnInit(): void {
    this.shuffleArr(this.topDishes);
  }

  shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]]
    }
  }

  onSelectDish(dish: Dish){
    this.selectedDish = dish;
  }

  onCloseModal(){
    this.selectedDish = new Dish('','','');
  }
}
