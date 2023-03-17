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
      title: 'Borscht',
      path: './assets/top/borshh.jpg',
      description: 'First, we cook the broth. Pour 1.5-2 liters of water into the pot. Add meat and put on medium heat. Before boiling, remove the foam. As soon as the broth boils, cover with a lid and cook on low heat for an hour to an hour and a half. ' +
        'In the meantime, we are preparing the roast. We clean beets, carrots and onions. Grate the beets on a coarse grater, and grate the carrots on a medium grater. Cut the onion into cubes. ' +
        'Heat oil in a frying pan over medium heat, add onions and carrots and fry for 5 minutes. Then we add the beetroot (it can be sprinkled with citric acid or sprinkled with fresh lemon juice - this way the borscht will be really red). Fry the vegetables for another 5 minutes, add tomato paste, mix and fry for another 5-7 minutes. ' +
        'And now we cook the borscht itself. Remove the meat from the broth and, while it is cooling, throw the shredded cabbage into the broth. After 5-10 minutes, add potatoes cut into strips. Separate the meat from the bone and cut into cubes. We return the meat to the borscht, salt it and add roasting. Stir the borscht, add the bay leaf and finely chopped greens, cover with a lid and cook for another 5-7 minutes. ' +
        'We serve borscht with sour cream and greens.',
      ingredients: [
        'Water - 1.5-2 liters.',
        'Pork or beef on the bone - 400 g',
        'Potatoes - 4 pcs. (medium)',
        'Beets - 2 pcs. (small)',
        'Carrot - 1 pc.',
        'Onion - 3 pcs. (medium)',
        'Fresh white cabbage - 300 g',
        'Tomato paste - 2 tbsp. l.',
        'Sunflower oil - 4-5 tbsp. l.',
        'Citric acid - a little',
        'Salt, bay leaf, greens'
      ]
    },
    {
      title: 'Deruny',
      path: './assets/top/deruny.jpg',
      description: 'Peel the potatoes and onions. At the same time, you should not immerse the peeled potatoes in cold water, because part of the starch will come out of it. ' +
        'If the mass turned out to be quite liquid, you need to pour off a little excess liquid, covering the total mass with a knife. Next, add a little flour to get the desired consistency. You can not add flour, however, if the potatoes have a low starch content, thanks to it, the dumplings will not fall apart. ' +
        'Heat the pan, pour a little oil. Fry the drumsticks on medium heat. Place the finished dumplings on napkins or paper towels to drain excess oil.' +
        'Deruny can be served with sour cream, or make a sauce.',
      ingredients: [
        'Potatoes (medium tubers) - 5 pcs',
        'Onion - 1 pc.',
        'Chicken egg - 1 pc.',
        'Flour',
        'Salt, ground black pepper',
        'Cheese - 70 g',
        'Sour cream - 150 g',
        'Garlic - 1 clove',
        'Greens (green onions or dill)'
      ]
    },
    {
      title: 'Varenyky',
      path: './assets/top/varenyky.jpg',
      description: ' Mix the egg and sour milk with a whisk. Salt, add a teaspoon of sugar, stir. Pour soda and wait until the foamy reaction goes away. Pour in the flour (it is better to add it gradually, as you may need less or more). ' +
        'Knead a soft, non-sticky dough. Knead it well on the table, adding flour if necessary. It should not stick to the hands. Cover the dough with a towel and set aside. ' +
        'Preparation of filling. Peel and boil the potatoes. Cut the onion and fry it in oil. Mash the potatoes and mix with fried onions. Salt and pepper to taste. ' +
        'Then you can roll out the dough on the table and cut circles with a glass. Or you can make a sausage out of it and cut it into pieces, after which roll out the pieces into cakes. Mold the dumplings, carefully pinching the edges so that they do not open during cooking. ' +
        'Boil dumplings in boiling salted water. After boiling, cook them for about 2 minutes. Dumplings with potatoes and onions are best served with sour cream.',
      ingredients: [
        'Flour - 3 tbsp',
        'Sour milk - 300 ml',
        'Egg - 1 pc',
        'A pinch of salt',
        'Sugar - 1 tsp',
        'Soda - 1/3 tsp',
        'Potatoes - 500 g',
        'Onion - 100 g',
        'Salt, black pepper',
        'Oil - 3 tbsp'
      ]
    }
  ];
  selectedDish: Dish = new Dish('', '', '', []);

  ngOnInit(): void {
    this.shuffleArr(this.topDishes);
  }

  shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]]
    }
  }

  onSelectDish(dish: Dish) {
    this.selectedDish = dish;
  }

  onCloseModal() {
    this.selectedDish = new Dish('', '', '', []);
  }
}
