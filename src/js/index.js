import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

/** Global state of the app
 * Seach object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
  // 1) get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    try {
      // 4) search for recipes
      await state.search.getResults();

      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Error searching recipes");
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPage.addEventListener("click", e => {
  const button = e.target.closest(".btn-inline");
  if (button) {
    const goToPage = parseInt(button.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
  // 1) get ID from url
  const id = window.location.hash.replace("#", "");
  if (id) {
    //prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // 2) create new recipe object
    state.recipe = new Recipe(id);

    try {
      // 3) get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // 4) calc time and servings
      state.recipe.calcServings();
      state.recipe.calcTime();

      // 5) render the recipe
      clearLoader();
      console.log(state.recipe);
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert("Error processing recipe");
    }
  }
};

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
