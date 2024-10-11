let pets = [];

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loading-spin").classList.add("hidden");
    document.getElementById("card-content").classList.remove("hidden");
    document.getElementById("foot").classList.remove("hidden");
    document.getElementById("my_modal_8").classList.remove("hidden");
    document.getElementById("my_modal_7").classList.remove("hidden");
    loadCategories();
    loadpetCard();
  }, 2000);
});

//** load categories */

const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  DisplayCategories(data.categories);
};

//**fetch load pet details */

const loadPetdetails = async (cardId) => {
  removeClrDetails();
  const activeDetails = document.getElementById(`btn2-${cardId}`);
  // console.log(activeDetails);
  activeDetails.classList.add("activeD");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${cardId}`
  );
  const data = await response.json();

  updateModalContent(data.petData);
};

//**Pet details modal  */
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

//**remove like btn clr */
const likeClr = () => {
  const btn3 = document.getElementsByClassName("all-like-btn");
  for (let btn of btn3) {
    btn.classList.remove("activeL");
  }
};

//**Pass the img to the right div */
const passPetCard = (likedImages) => {
  likeClr();
  const likeBtnAll = document.getElementById(`btn3-${likedImages}`);
  likeBtnAll.classList.add("activeL");
  //
  const likedContainer = document.getElementById("liked-pet-container");
  const div = document.createElement("div");
  div.className = "bg-white shadow-md";
  div.innerHTML = `<img class='rounded-lg px-2 py-2' src="${likedImages}"/>`;

  likedContainer.appendChild(div);
};
//**loadCat video */

const loadcatVideo = (id) => {
  console.log(id);
  //fetch
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");

      displayPetCard(data.data);
    });
};

//**remove active class */
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");

  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

//**sorted data */
const sortedByPrice = () => {
  const sortedData = pets.sort((a, b) => Number(b.price) - Number(a.price));
  displayPetCard(sortedData);
};

//**display category */

const displayCategory = (pets) => {
  const categoryContainer = document.getElementById("pet-category");
  categoryContainer.innerHTML = ""; // Clear previous categories

  pets.forEach((item, index) => {
    const card = `
      <button id="btn-${item.category}" class='btn category-btn' onclick='loadcatVideo("${item.category}")'>
        <img class='w-10 h-8 mr-4' src='${item.category_icon}' />${item.category}
      </button>
    `;
    categoryContainer.innerHTML += card;

    // Simulate a click on the button at index 1 after all buttons are created
    if (index === pets.length - 1) {
      const buttons = document.getElementsByClassName("category-btn");
      if (buttons.length > 1) {
        buttons[1].click(); // Click the button at index 1
      }
    }
  });
};

// Assuming DisplayCategories function is your actual function
const DisplayCategories = (pets) => {
  displayCategory(pets);
};

//**all data */
const loadpetCard = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();

  pets = data.pets;

  displayPetCard(pets);
};

//**display all pet card */

const displayPetCard = (petItem) => {
  const leftContainer = document.getElementById("left-card-container");
  leftContainer.innerHTML = "";
  // console.log(petItem.length);
  if (petItem.length == 0) {
    const noData = document.getElementById("no-data");
    noData.classList.remove("hidden");
  } else {
    const noData = document.getElementById("no-data");
    noData.classList.add("hidden");
  }
  petItem.forEach((pets) => {
    const petCard = `
      <div class='border p-4 rounded shadow-lg'>
        <img class='w-full' src="${pets.image || "placeholder.jpg"}" alt="${
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
          <button id='btn3-${this}' class='all-like-btn   bg-gray-400 text-white px-4 py-2 rounded' onclick='passPetCard("${
      pets.image
    }")'>
             <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button id='btn-${
            pets.petId
          }'  class='adopt-all-btn bg-gray-400 text-white px-4 py-2 rounded' onclick='adoptPet(${
      pets.petId
    })'>
            Adopt
          </button>
          <a href="#my_modal_8"  class='detail-all-btn bg-gray-400 text-white px-4 py-2 rounded' id='btn2-${
            pets.petId
          }' onclick='loadPetdetails(${pets.petId})'>
            Details
          </a>
        </div>
      </div>
    `;

    leftContainer.insertAdjacentHTML("beforeend", petCard);
  });
};
//**card color remove for details */
const removeClrDetails = () => {
  const buttonsD = document.getElementsByClassName("detail-all-btn");
  for (button2 of buttonsD) {
    console.log(button2);
    button2.classList.remove("activeD");
  }
};

//**adopted pet modal with timer */

const adoptPet = (petId) => {
  removeAdptclr();
  const btnAdpt = document
    .getElementById(`btn-${petId}`)
    .classList.add("active");
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

//

const removeAdptclr = () => {
  const buttons = document.getElementsByClassName("adopt-all-btn");
  for (btn of buttons) {
    btn.classList.remove("active");
  }
};
