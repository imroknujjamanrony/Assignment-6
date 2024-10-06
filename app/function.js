// *load categories*\\

const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  DisplayCategories(data.categories);
};

// *display categories*\\

const DisplayCategories = (pets) => {
  const categoryContainer = document.getElementById("pet-category");
  pets.forEach((item) => {
    console.log(item.category);

    // create category div

    const card = document.createElement("div");
    card.className =
      "flex border border-gray-300 rounded-lg p-4 w-52 shadow-md text-center justify-center items-center gap-3";

    //img
    const img = document.createElement("img");
    img.src = item.category_icon;
    img.classList.add = ("w-12", "h-12", "mr-4");

    //  / Create name element
    const nameElement = document.createElement("div");
    nameElement.classList.add("text-lg", "font-bold");
    nameElement.textContent = item.category;

    //append to the card
    card.appendChild(img);
    card.appendChild(nameElement);

    //append to Categorycontainer
    categoryContainer.appendChild(card);
  });
};

//

loadCategories();
