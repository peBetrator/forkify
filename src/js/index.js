import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

/** Global state of the app
 * Seach object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

const controlSearch = async () => {
  // 1) get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    // 4) search for recipes
    await state.search.getResults();

    // 5) render results on UI
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
