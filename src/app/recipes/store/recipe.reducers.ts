import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Testy Schnitzel',
            'A super-tasty Schnitzel!',
            'https://www.dessertfortwo.com/wp-content/uploads/2014/12/Schnitzel-2.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burguer',
            'What else do I need to say?',
            'https://www.tasteofhome.com/wp-content/uploads/2017/10/exps28800_UG143377D12_18_1b_RMS-696x696.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions): State {
    switch (action.type) {
        case RecipeActions.SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            };
        }
        case RecipeActions.ADD_RECIPE: {
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        }
        case RecipeActions.UPDATE_RECIPE: {
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.newRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        }
        case RecipeActions.DELETE_RECIPE: {
            const newState = [...state.recipes];
            newState.splice(action.payload, 1);
            return {
                ...state,
                recipes: newState
            };
        }
        default: {
            return state;
        }
    }
}
