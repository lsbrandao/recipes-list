import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';

import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromRecipe from './recipe.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(
            switchMap(
                (action: RecipeActions.FetchRecipes) => {
                    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-77a77.firebaseio.com/reipes.json', {
                        observe: 'body', // this is the default, dont need to add it
                        responseType: 'json' // this is the default, dont need to add it
                    });
                }),
            map(
                (recipes) => {
                    console.log(recipes);
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    };
                }
            )
        );
        @Effect({dispatch: false})
        recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const req = new HttpRequest('PUT', 'https://ng-recipe-book-77a77.firebaseio.com/reipes.json',
                state.recipes, {reportProgress: true});
                return this.httpClient.request(req);
            })
        );

        constructor(private actions$: Actions,
                    private httpClient: HttpClient,
                    private store: Store<fromRecipe.FeatureState>) {}
}


