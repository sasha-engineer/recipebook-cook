import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Guid } from 'guid-typescript';
import { Recipe, Step } from './../recipe.model';
import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';

export class RecipeTop extends Recipe {
  constructor(
    public instructions: Step[],
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
      '',
      name,
      description,
      imagePath,
      mapDataToIngredient(ingredients),
      time,
      servings,
      shortDescription,
      null,
      id,
      instructions
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
        new Step('First, we cook the broth. Pour 1.5-2 liters of water into the pot. Add meat and put on medium heat. Before boiling, remove the foam. As soon as the broth boils, cover with a lid and cook on low heat for an hour to an hour and a half. '),
        new Step('In the meantime, we are preparing the roast. We clean beets, carrots and onions. Grate the beets on a coarse grater, and grate the carrots on a medium grater. Cut the onion into cubes. '),
        new Step('Heat oil in a frying pan over medium heat, add onions and carrots and fry for 5 minutes. Then we add the beetroot (it can be sprinkled with citric acid or sprinkled with fresh lemon juice - this way the borscht will be really red). Fry the vegetables for another 5 minutes, add tomato paste, mix and fry for another 5-7 minutes. '),
        new Step('And now we cook the borscht itself. Remove the meat from the broth and, while it is cooling, throw the shredded cabbage into the broth. After 5-10 minutes, add potatoes cut into strips. Separate the meat from the bone and cut into cubes. We return the meat to the borscht, salt it and add roasting. Stir the borscht, add the bay leaf and finely chopped greens, cover with a lid and cook for another 5-7 minutes. '),
        new Step('We serve borscht with sour cream and greens.')
      ],
      '1001',
      'Borscht',
      '',
      './assets/top/borscht.jpg',
      [
        new IngredientCollection('Water', 2, true),
        new IngredientCollection('Potatoes', 4, true),
        new IngredientCollection('Beets', 2, true),
        new IngredientCollection('Carrot', 1, true),
        new IngredientCollection('Onion', 3, true),
        new IngredientCollection('Fresh white cabbage', 300, true),
        new IngredientCollection('Tomato paste', 2, true),
        new IngredientCollection('Sunflower oil', 4, true),
        new IngredientCollection('Citric acid', 1, true)
      ],
      21,
      4,
      'This pretty Spring Vegetable Frittata is healthy and good for when you are short on time.'),
    new RecipeTop(
      [
        new Step('Mix the egg and sour milk with a whisk. Salt, add a teaspoon of sugar, stir. Pour soda and wait until the foamy reaction goes away. Pour in the flour (it is better to add it gradually, as you may need less or more). '),
        new Step('Knead a soft, non-sticky dough. Knead it well on the table, adding flour if necessary. It should not stick to the hands. Cover the dough with a towel and set aside. '),
        new Step('Preparation of filling. Peel and boil the potatoes. Cut the onion and fry it in oil. Mash the potatoes and mix with fried onions. Salt and pepper to taste. '),
        new Step('Then you can roll out the dough on the table and cut circles with a glass. Or you can make a sausage out of it and cut it into pieces, after which roll out the pieces into cakes. Mold the dumplings, carefully pinching the edges so that they do not open during cooking. '),
        new Step('Boil dumplings in boiling salted water. After boiling, cook them for about 2 minutes. Dumplings with potatoes and onions are best served with sour cream.')
      ],
      '1003',
      'Varenyky',
      '',
      './assets/top/varenyky.jpg',
      [
        new IngredientCollection('Flour', 3, true),
        new IngredientCollection('Sour milk', 300, true),
        new IngredientCollection('Egg', 1, true),
        new IngredientCollection('A pinch of salt', 1, true),
        new IngredientCollection('Sugar', 1, true),
        new IngredientCollection('Soda', 1, true),
        new IngredientCollection('Potatoes', 500, true),
        new IngredientCollection('Onion', 100, true),
        new IngredientCollection('Oil', 3, true)
      ],
      35,
      5,
      'Dumplings with potatoes and onions are best served with sour cream.'
    ),
    new RecipeTop(
      [
        new Step('Peel the potatoes and onions. At the same time, you should not immerse the peeled potatoes in cold water, because part of the starch will come out of it. '),
        new Step('If the mass turned out to be quite liquid, you need to pour off a little excess liquid, covering the total mass with a knife. Next, add a little flour to get the desired consistency. You can not add flour, however, if the potatoes have a low starch content, thanks to it, the dumplings will not fall apart. '),
        new Step('Heat the pan, pour a little oil. Fry the drumsticks on medium heat. Place the finished dumplings on napkins or paper towels to drain excess oil.'),
        new Step('Deruny can be served with sour cream, or make a sauce.')
      ],
      '1002',
      'Deruny',
      '',
      './assets/top/deruny.jpg',
      [
        new IngredientCollection('Potatoes', 5, true),
        new IngredientCollection('Onion', 1, true),
        new IngredientCollection('Chicken egg', 1, true),
        new IngredientCollection('Flour', 200, true),
        new IngredientCollection('Salt', 300, true),
        new IngredientCollection('Cheese', 70, true),
        new IngredientCollection('Sour cream', 150, true),
        new IngredientCollection('Garlic', 1, true),
        new IngredientCollection('Greens', 200, true)
      ],
      40,
      4,
      'Deruny can be served with sour cream, or make a sauce.'
    )
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          const filtered = this.recipesCollection.find(r => r.id === id);
          if (filtered) {
            this.recipe = filtered;

            const savedRecipe = this.recipeService.getRecipes().find(r => r.refRecipeId === id);
            if (savedRecipe) {
              this.isRecipeSaved = true;
            }
          }
        }
      );
  }

  onSaveRecipe() {
    if (!this.isRecipeSaved) {
      this.recipeService.addRecipe(this.recipe);
      this.dataStorageService.saveRecipes();
      this.isRecipeSaved = true;
    }
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
