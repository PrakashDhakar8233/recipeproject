import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();
  private  recipes: Recipe[] =[
        new Recipe('Tasty Samosa','Super Testy','https://i.ytimg.com/vi/zRjb0CWXlpo/maxresdefault.jpg',
        [new Ingredient('chatni', 1),
        new Ingredient('french fries',20)] ),
        new Recipe('Big Fat Burger','Bigger Then Your','https://d9hyo6bif16lx.cloudfront.net/live/img/production/detail/menu/lunch-dinner_burgers_all-american-burger.jpg',
        [new Ingredient('buns',2),
        new Ingredient('meat',1)
      ] )
      ];
      constructor(private slService: ShoppingListService){

      }
      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes() {
          return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index];

      }
      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);

      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

      }
      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]= newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }
      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}