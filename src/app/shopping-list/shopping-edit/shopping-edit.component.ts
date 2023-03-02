import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  Ingredients = [];
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem(){
    const ingredient = new Ingredient(
      this.nameInputRef.nativeElement.value,
      this.amountInput.nativeElement.value);

      this.shoppingListService.addIngredient(ingredient);
  }
}
