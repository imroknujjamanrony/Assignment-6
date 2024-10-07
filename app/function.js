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

    const card = document.createElement("button");
    card.className = "btn h-[70px] py-2";

    //img
    const img = document.createElement("img");
    img.src = item.category_icon;
    img.classList.add = ("w-10", "h-8", "mr-4");

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

//loadpetcard

const loadpetCard = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayPetCard(data.pets);
};

//display pets

const displayPetCard = (petItem) => {
  petItem.forEach((pets) => {
    const leftContainer = document.getElementById("left-card-container");
    console.log(pets);

    //create card
    const petCard = `
    <div class='border p-4 rounded shadow-lg'>
    <img src="${pets.image || "placeholder.jpg"}" alt="${
      pets.name
    }" class="w-full h-56 object-cover rounded mb-4>"
    <h3 class='text-lg font-bold'>${pets.name}</h3>
    <p>Breed:${pets.breed || "N/A"}</p>
    <p>Birth:${pets.date_of_birth || "N/A"}</p>
    <p>Gender:${pets.gender || "N/A"}</p>
    <p>Price:${pets.price ? "$" + pets.price : "N/A"}</p>

    <div class='flex justify-between mt-4'>
    <button class='bg-green-500 text-white px-4 py-2 rounded' onclick='likePet('${
      pets.image
    }'><i class="fa-regular fa-thumbs-up"></i></button>
    <button class='bg-green-500 text-white px-4 py-2 rounded' onclick='adoptPet('
    ${pets.petId}')'>Adopt</button>
    <button class='bg-green-500 text-white px-4 py-2 rounded' onclick='showDetails('${
      pets.petId
    }')'>Details</button>
    </div>
    `;

    leftContainer.insertAdjacentHTML("beforeend", petCard);
  });
};

//

loadCategories();
loadpetCard();
