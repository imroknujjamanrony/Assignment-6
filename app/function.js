document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loading-spin").classList.add("hidden");
    document.getElementById("card-content").classList.remove("hidden");
    loadCategories();
    loadpetCard();
  }, 2000);
});

const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  DisplayCategories(data.categories);
};

const loadPetdetails = async (cardId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${cardId}`
  );
  const data = await response.json();
  updateModalContent(data.petData);
};

const updateModalContent = (data) => {
  const img = document.getElementById("img-src");
  const petName = document.getElementById("pet-name");
  const breedName = document.getElementById("breed-name");
  const genderName = document.getElementById("gender-name");
  const vaccinateName = document.getElementById("vaccinate-name");
  const birthDate = document.getElementById("birth-date");
  const priceName = document.getElementById("price-name");
  const descPara = document.getElementById("description-para");

  if (
    img &&
    petName &&
    breedName &&
    genderName &&
    vaccinateName &&
    birthDate &&
    priceName
  ) {
    img.src = data.image || "placeholder.jpg";
    petName.textContent = data.pet_name || "N/A";
    breedName.textContent = `Breed: ${data.breed || "N/A"}`;
    genderName.textContent = `Gender: ${data.gender || "N/A"}`;
    descPara.textContent = `${data.pet_details}`;
    vaccinateName.textContent = `Vaccinated: ${
      data.vaccinated_status || "N/A"
    }`;
    birthDate.textContent = `Birth Date: ${data.date_of_birth || "N/A"}`;
    priceName.textContent = `Price: ${data.price ? "$" + data.price : "N/A"}`;
  } else {
    console.error("One or more modal elements are not found");
  }
};

const passPetCard = (likedImages) => {
  const likedContainer = document.getElementById("liked-pet-container");
  const div = document.createElement("div");
  div.className = "bg-white shadow-md";
  div.innerHTML = `<img class='rounded-lg px-2 py-2' src="${likedImages}"/>`;
  likedContainer.appendChild(div);
};

const loadcatVideo = (id) => {
  console.log(id);
  //fetch
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayPetCard(data.data));
};

//**display category */

const DisplayCategories = (pets) => {
  const categoryContainer = document.getElementById("pet-category");
  pets.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
    
    <button class='btn' onclick='loadcatVideo("${item.category}")'>${item.category} <img class='w-10 h-8 mr-4' src='${item.category_icon}'/></button>
    
    
    `;

    categoryContainer.appendChild(card);
  });
};

const loadpetCard = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayPetCard(data.pets);
};

const displayPetCard = (petItem) => {
  const leftContainer = document.getElementById("left-card-container");
  leftContainer.innerHTML = "";
  petItem.forEach((pets) => {
    const petCard = `
      <div class='border p-4 rounded shadow-lg'>
        <img src="${pets.image || "placeholder.jpg"}" alt="${
      pets.pet_name
    }" class="w-full h-56 object-cover rounded mb-4">
        <h3 class='text-xl text-[#131313] font-bold'>${pets.pet_name}</h3>
        <p class='flex gap-2 items-center text-base font-normal text-[#131313B3]'>
          <i class="fa-solid fa-shapes"></i> Breed: ${pets.breed || "N/A"}
        </p>
        <p class='flex gap-2 items-center text-base font-normal text-[#131313B3]'>
          <i class="fa-regular fa-calendar"></i> Birth: ${
            pets.date_of_birth || "N/A"
          }
        </p>
        <p class='flex gap-2 items-center text-base font-normal text-[#131313B3]'>
          <i class="fa-solid fa-venus-mars"></i> Gender: ${pets.gender || "N/A"}
        </p>
        <p class='flex gap-2 items-center text-base font-normal text-[#131313B3]'>
          <i class="fa-light fa-dollar-sign"></i> Price: ${
            pets.price ? "$" + pets.price : "N/A"
          }
        </p>
        <div class='flex justify-between mt-4'>
          <button class='bg-green-500 text-white px-4 py-2 rounded' onclick='passPetCard("${
            pets.image
          }")'>
             <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button  class='bg-green-500 text-white px-4 py-2 rounded' onclick='adoptPet(${
            pets.petId
          })'>
            Adopt
          </button>
          <a href="#my_modal_8" class='bg-green-500 text-white px-4 py-2 rounded' onclick='loadPetdetails(${
            pets.petId
          })'>
            Details
          </a>
        </div>
      </div>
    `;

    leftContainer.insertAdjacentHTML("beforeend", petCard);
  });
};

//

const adoptPet = (petId) => {
  let countdown = 3;
  const button = document.querySelector(`[onclick='adoptPet(${petId})']`);
  button.textContent = "Adopted";
  button.disabled = true;

  const modalToggle = document.getElementById("my_modal_7");
  const timerElement = document.getElementById("timer");

  modalToggle.checked = true; // Open the modal
  timerElement.textContent = countdown;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      timerElement.textContent = countdown;
    } else {
      clearInterval(interval);
      timerElement.textContent = "Adopted!";
      setTimeout(() => {
        modalToggle.checked = false; // Close the modal
      }, 1000); // Keep "Adopted!" text for 1 second before closing
    }
  }, 1000);
};
