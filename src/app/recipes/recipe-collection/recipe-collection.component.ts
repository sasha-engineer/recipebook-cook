import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Guid } from 'guid-typescript';
import { Recipe } from './../recipe.model';
import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

export class RecipeTop extends Recipe {
  constructor(
    public instructions: string[],
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: IngredientCollection[],
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
      mapDataToIngredient(ingredients),
      time,
      servings,
      shortDescription
    );
  }
}

export class IngredientCollection extends Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public addToCart?: boolean
  ) {
    super(name, amount);
  }
}

const mapDataToIngredient = (data: IngredientCollection[]) => {
  return data.map(item => new Ingredient(item.name, item.amount));
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
        new IngredientCollection('Water', 2),
        new IngredientCollection('Potatoes', 4),
        new IngredientCollection('Beets', 2),
        new IngredientCollection('Carrot', 1, true),
        new IngredientCollection('Onion', 3, true),
        new IngredientCollection('Fresh white cabbage', 300),
        new IngredientCollection('Tomato paste', 2, true),
        new IngredientCollection('Sunflower oil', 4),
        new IngredientCollection('Citric acid', 1, true)
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
        new IngredientCollection('Flour', 3, true),
        new IngredientCollection('Sour milk', 300, true),
        new IngredientCollection('Egg', 1, true),
        new IngredientCollection('A pinch of salt', 1, true),
        new IngredientCollection('Sugar', 1, true),
        new IngredientCollection('Soda', 1),
        new IngredientCollection('Potatoes', 500, true),
        new IngredientCollection('Onion', 100),
        new IngredientCollection('Oil', 3, true)
      ],
      35,
      5,
      'Dumplings with potatoes and onions are best served with sour cream.'
    )
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService) { }

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
    const ingredientsToSave = this.recipe.ingredients.filter(r => r.addToCart);
    this.shoppingListService.addIngredients(mapDataToIngredient(ingredientsToSave));
    this.dataStorageService.saveIngredients();
  }
}
