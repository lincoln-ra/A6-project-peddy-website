console.log('lets gets started');

function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
      .then(response => response.json())
      .then(json => displayCategories(json.categories))
    //   .catch(error => console.log(error))
}


function displayCategories(categories){
//    console.log(categories);
   categories.forEach(item => {
    const categoryContainer = document.getElementById('categories')
    // console.log(item)
    const buttonContainer = document.createElement("div");
    buttonContainer.classList ='';
    buttonContainer.innerHTML=`

    <button id="btn-${item.category}" 
    
    class="btn category-btn border w-full" onclick= "loadSpecificCategory('${item.category}')">
    <img class="w-5 h-5 " src="${item.category_icon}">
    <h3>${item.category}</h3>
    </button>
    `
    categoryContainer.append(buttonContainer);
   })
}

function removeButtons(){
    const buttons = document.getElementsByClassName('category-btn');
    // console.log(buttons)
    for (let btn of buttons){
        btn.classList.remove("bg-[#0E7A811A]", "rounded-full", "border-solid", "border-2", "border-[#0E7A81]");
    }
}








function loadCards(){
    fetch ('https://openapi.programming-hero.com/api/peddy/pets')
    .then(response => response.json())
    .then(json => displayCards(json.pets))
    // .catch (error => console.log(error))
}

function displayCards (cards){
    // console.log(cards)
    const cardContainer = document.getElementById('cards')
    
        cardContainer.innerHTML = '';
        if(cards.length == 0){
            cardContainer.classList.remove('grid')
            cardContainer.innerHTML = `
                <div class="bg-[#13131308] w-full min-h-32 flex flex-col justify-center p-20 items-center text-center rounded-xl">
                    <img class="h-40 w-40" src="images/Group.png" alt="">
                    <h2 class="font-bold text-3xl my-5">No Information Available </h2>
                    <p>No information is currently available about the pet you are looking for. Please try again later or explore other categories to find the perfect companion.</p>
                </div>
            `;
            return;
        }
        else cardContainer.classList.add('grid');
    
    cards.forEach(card => {
        
        // console.log(card)
        const cards = document.createElement('div')
        cards.classList = 'card border rounded-xl p-3';
        cards.innerHTML=`
          <div class="" >
                <img class="h-auto w-full object-cover rounded-xl"src="${card.image}" alt="">
                <h3 class="font-bold mt-5">${card.pet_name}</h3>
                 <div class="mb-5">
                    <div class="flex items-center gap-2">
                        <img class="h-5 w-5" src="images/Frame.png" alt="">
                            <p>Breed: ${card.breed}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="h-5 w-5" src="images/Frame 2.png" alt="">
                            <p>Birth: ${card.date_of_birth
                            }</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="h-5 w-5" src="images/Frame 3.png" alt="">
                            <p>Gender: ${card.gender
                            }</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <img class="h-5 w-5" src="images/Frame 4.png" alt="">
                            <p>Price: ${card.price

                            }</p>
                            <hr>
                    </div>
            </div>
            
            <div class="flex justify-between items-center w-11/12 mx-auto gap-2">
                <button class="btn" onclick=collectImage('${card.image}')><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="btn text-[#0E7A81]">Adopt</button>
                <button class="btn text-[#0E7A81]">Details</button>
            </div>
        `
        cardContainer.append(cards)
    })
}

function loadSpecificCategory(id){
    
    fetch (`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(response => response.json())
    .then(json => {
        removeButtons();
        activeButton= document.getElementById(`btn-${id}`)
        // console.log(activeButton);
        activeButton.classList.add("bg-[#0E7A811A]", "rounded-full", "border-solid", "border-2", "border-[#0E7A81]")
        displayCards(json.data)
    })
    // .catch (error => console.log(error))
}

function collectImage(images){
    const imageContainer = document.getElementById('sideBar');
    const imageDiv =document.createElement('div');
    imageDiv.innerHTML=`
        <img class="rounded-xl w-full" src="${images}" alt="">
    `
    imageContainer.append(imageDiv);
}


loadCards()
loadCategories()
// displayCategories()

