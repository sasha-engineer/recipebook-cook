import { DataStorageService } from './../../shared/data-storage.service';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['id'] != null;
          if (this.editMode) {
            this.id = params['id'];
          }
          this.initForm();
        }
      );
  }

  onSubmit() {
    let toastMessage = '';
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value);
      toastMessage = 'Recipe was successfuly updated'
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      toastMessage = 'Recipe was successfuly added'
    }

    this.dataStorageService.saveRecipes(toastMessage);
    this.navigateToRecipePage();
  }

  onCancel() {
    this.navigateToRecipePage();
  }

  private navigateToRecipePage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray)
      .push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
  }

  onAddStep() {
    (this.recipeForm.get('instructions') as FormArray)
      .push(
        new FormGroup({
          'step': new FormControl(null, Validators.required)
        })
      );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }


  onDeleteStep() {
    let instructions = (this.recipeForm.get('instructions') as FormArray);
    instructions.removeAt(instructions.length-1);
  }


  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get instructionControls() {
    return (this.recipeForm.get('instructions') as FormArray).controls;
  }

  getFormGroupName(controlName: string, index: number){
    return controlName + index;
  }

  initForm() {
    let recipe = new Recipe(null, '', '', '', null, null, null, '', null, null, null);
    let ingredients = new FormArray([]);
    let instructions = new FormArray([]);

    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          );
        }
      }

      if (recipe['instructions']) {
        for (let instruction of recipe.instructions) {
          instructions.push(
            new FormGroup({
              'step': new FormControl(instruction.step, Validators.required)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(recipe.id),
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': ingredients,
      'instructions': instructions
    });
  }

  onNavigateToRecipes() {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }
}
