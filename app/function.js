const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  DisplayCategories(data.categories);
};

// "categories": [
// {
// "id": 1,
// "category": "Cat",
// "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// },

const DisplayCategories = (pets) => {
  const categoryContainer = document.getElementById("pet-category");
  pets.forEach((item) => {
    console.log(item.category);

    // create category div

    const card = document.createElement("div");
    //  card.classList=
  });
};

//

loadCategories();
