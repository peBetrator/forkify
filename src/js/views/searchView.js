import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(" ").reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        newTitle.push(current);
      }
      return accumulator + current.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
    <li>
        <a class="likes__link" href="#${recipe.recipe_id}">
            <figure class="likes__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = recipes => {
  recipes.forEach(el => renderRecipe(el));
};
