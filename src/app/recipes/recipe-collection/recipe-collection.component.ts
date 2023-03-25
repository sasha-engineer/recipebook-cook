import { Guid } from 'guid-typescript';
import { Recipe } from './../recipe.model';
import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';

export class RecipeTop extends Recipe {
  constructor(
    public instructions: string[],
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public time?: number,
    public servings?: number,
    public shortDescription?: string,
    public uuid?: Guid
  ) {
    super(
      id,
      name,
      description,
      imagePath,
      ingredients,
      time,
      servings,
      shortDescription
    );
  }
}

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent {
  isRecipeSaved: boolean = false;
  recipe: RecipeTop = null;

  recipesCollection: RecipeTop[] = [
    new RecipeTop(
      [
        'First, we cook the broth. Pour 1.5-2 liters of water into the pot. Add meat and put on medium heat. Before boiling, remove the foam. As soon as the broth boils, cover with a lid and cook on low heat for an hour to an hour and a half. ',
        'In the meantime, we are preparing the roast. We clean beets, carrots and onions. Grate the beets on a coarse grater, and grate the carrots on a medium grater. Cut the onion into cubes. ',
        'Heat oil in a frying pan over medium heat, add onions and carrots and fry for 5 minutes. Then we add the beetroot (it can be sprinkled with citric acid or sprinkled with fresh lemon juice - this way the borscht will be really red). Fry the vegetables for another 5 minutes, add tomato paste, mix and fry for another 5-7 minutes. ',
        'And now we cook the borscht itself. Remove the meat from the broth and, while it is cooling, throw the shredded cabbage into the broth. After 5-10 minutes, add potatoes cut into strips. Separate the meat from the bone and cut into cubes. We return the meat to the borscht, salt it and add roasting. Stir the borscht, add the bay leaf and finely chopped greens, cover with a lid and cook for another 5-7 minutes. ',
        'We serve borscht with sour cream and greens.'
      ],
      '1001',
      'Borscht',
      'Description here is deprecated',
      './assets/top/borscht.jpg',
      [
        new Ingredient('Water', 2),
        new Ingredient('Potatoes', 4),
        new Ingredient('Beets', 2),
        new Ingredient('Carrot', 1, true),
        new Ingredient('Onion', 3, true),
        new Ingredient('Fresh white cabbage', 300),
        new Ingredient('Tomato paste', 2, true),
        new Ingredient('Sunflower oil', 4),
        new Ingredient('Citric acid', 1, true)
      ],
      21,
      4,
      'This pretty Spring Vegetable Frittata is healthy and good for when you are short on time.'),
    new RecipeTop(
      [
        'Mix the egg and sour milk with a whisk. Salt, add a teaspoon of sugar, stir. Pour soda and wait until the foamy reaction goes away. Pour in the flour (it is better to add it gradually, as you may need less or more). ',
        'Knead a soft, non-sticky dough. Knead it well on the table, adding flour if necessary. It should not stick to the hands. Cover the dough with a towel and set aside. ',
        'Preparation of filling. Peel and boil the potatoes. Cut the onion and fry it in oil. Mash the potatoes and mix with fried onions. Salt and pepper to taste. ',
        'Then you can roll out the dough on the table and cut circles with a glass. Or you can make a sausage out of it and cut it into pieces, after which roll out the pieces into cakes. Mold the dumplings, carefully pinching the edges so that they do not open during cooking. ',
        'Boil dumplings in boiling salted water. After boiling, cook them for about 2 minutes. Dumplings with potatoes and onions are best served with sour cream.'
      ],
      '1003',
      'Varenyky',
      'Description here is deprecated',
      './assets/top/varenyky.jpg',
      [
        new Ingredient('Flour', 3, true),
        new Ingredient('Sour milk', 300, true),
        new Ingredient('Egg', 1, true),
        new Ingredient('A pinch of salt', 1, true),
        new Ingredient('Sugar', 1, true),
        new Ingredient('Soda', 1),
        new Ingredient('Potatoes', 500, true),
        new Ingredient('Onion', 100),
        new Ingredient('Oil', 3, true)
      ],
      35,
      5,
      'Dumplings with potatoes and onions are best served with sour cream.'
    )
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          const filtered = this.recipesCollection.filter(r => r.id === id);
          if (filtered) {
            this.recipe = filtered[0];
          }
        }
      );
  }

  onSaveRecipe() {
    // TODO: save recipe to my collection
    this.isRecipeSaved = !this.isRecipeSaved;
  }

  getAmountSelectedItems() {
    return this.recipe.ingredients.filter(r => r.addToCart).length;
  }

  onAddToCart() {
    console.log("length = " + this.recipe.ingredients.filter(r => r.addToCart).length);
  }
}
