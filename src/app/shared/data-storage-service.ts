import { Injectable } from "@angular/core";
// import { HttpClient } from "selenium-webdriver/http";
import { RecipeService } from "../recipes/recipe-service";
import { Http, Response } from "@angular/http";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/add/operator/map';
import { AuthService } from "../auth/auth-service";
@Injectable()
export class DataStorageService{
constructor(private http: Http,
            private recipeServie: RecipeService,
            private authService: AuthService){}
storeRecipes(){
  return this.http.put('https://recipe-book-14cbc.firebaseio.com/recipes.json', this.recipeServie.getRecipes());
}
getRecipes(){
   const token = this.authService.getToken();
    this.http.get('http://recipe-book-14cbc.firebaseio.com/recipes.json?auth=' + token).map
    (
      (response: Response)=> {
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes){
          if(!recipe['ingredients']){
            recipe['ingredients'] = [];
          }
        } 
        return recipes;  
     }
    )
    .subscribe(
        (recipes: Recipe[])=> {
            this.recipeServie.setRecipes(recipes);
        }
    );
}
}