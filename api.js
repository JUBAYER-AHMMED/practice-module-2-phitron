const input = document.getElementById("input1");
const btn = document.getElementById("btn1");
const productContainer = document.getElementById("product-container");
const detailContainer = document.getElementById("detail-container");

btn.addEventListener("click", async () => {
  const inputValue = input.value;
//   console.log(inputValue.length);

  if (inputValue.length == 1) {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        //   console.log(typeof(data.meals));
        displayProducts(data.meals);
      });
  } else if (inputValue.length > 1) {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        //   console.log(typeof(data.meals));
        displayProducts(data.meals);
      });
  }
  input.value = '';
});

const displayProducts = (products) => {
  productContainer.innerHTML = ""; // clear previous results

  if (!products) {
    productContainer.innerHTML = `<p class="NoMealFound">No meals found!</p>`;
    return;
  }
  //   console.log(products.length)
  //   console.log(products[0]);
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    // console.log(product.strMeal);
    // console.log(product);
    // console.log(product.strMealThumb);

    const div = document.createElement("div");
    div.classList.add("food-box");
    div.innerHTML = `
    <img src=${product.strMealThumb} class="meal-img" />
    <h2 class='mealname'>${product.strMeal}</h2>
    `;

    div.addEventListener("click",()=>showDetails(product));
    productContainer.appendChild(div);
  }
};

function showDetails(meal){
    console.log(meal);
     const div = document.createElement("div");
    div.classList.add("food-box-detail");

    let ingredientList = "";
    for(let i = 1; i<20; i++){
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if(ingredient && ingredient.trim() !== ""){
            ingredientList += `<li> ${measure} ${ingredient}</li>`
        }
    }


    div.innerHTML = `
    <img src=${meal.strMealThumb} class="meal-img-detail" />
    <h2 class='mealname-detail'>${meal.strMeal}</h2>
    <h4 class="ingredients">Ingredients</h4>
    <ul>
    ${ingredientList}
    </ul>
    `;
    detailContainer.appendChild(div);
}
