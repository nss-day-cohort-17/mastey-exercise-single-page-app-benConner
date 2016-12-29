var carInventory;
var mainBodyDiv = document.querySelector(".main-body");
var userInput = document.querySelector(".input-field");
var saveButton = document.querySelector(".save-btn");
//var carCard = document.querySelectorAll(".car-cards")

loadInventory()

function populatePage(inventory) {
  // Loop over the inventory and populate the page
    for (var i = 0; i < inventory.cars.length; i++) {
        mainBodyDiv.innerHTML +=`<div class="col-sm-4 car-cards">
                                    <h2>${inventory.cars[i].make}</h2>
                                    <h3>Model: ${inventory.cars[i].model}</h3>
                                    <h3>Price: ${inventory.cars[i].price}</h3>
                                    <p>Description: ${inventory.cars[i].description}</p>
                                </div>`
    }
  // Now that the DOM is loaded, establish all the event listeners needed
    //Adds EventListener to each car card
    var carCard = document.querySelectorAll(".car-cards")
    for (var i = 0; i < carCard.length; i++) {
        carCard[i].addEventListener("click",cardSelected)
    }
}

// function eventListeners(){
//     //Adds EventListener to each car card
//     for (var i = 0; i < carCard.length; i++) {
//         carCard[i].addEventListener("click",cardSelected)
//     }
//     //Adds EventListener to the input field
//     userInput.addEventListener("keypress", saveEdit)
//     //Adds EventListener to the Save button
//     saveButton.addEventListener("click", saveEdit)
// }

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory (callback) {
    var inventoryLoader = new XMLHttpRequest();
    inventoryLoader.open("GET", "inventory.json");
    inventoryLoader.send()

    inventoryLoader.addEventListener("load", function (e) {
        carInventory = JSON.parse(e.target.responseText);
        populatePage(carInventory);
  });
}

function cardSelected(e){
    var targetParent = e.target;
    var elementsWith = document.querySelector(".selected-car");
        if (elementsWith != null){
            elementsWith.classList.remove("selected-car");
            console.log('remove')
        }
        console.log(e)
        //if adds .selected-car on card if child element is selected
        if(e.target.className === ""){
            targetParent = e.target.offsetParent
            e.target.offsetParent.classList.add("selected-car");
            editPElement(targetParent)
            //console.log('add1')
        }else {
            e.target.classList.add("selected-car");
            editPElement(targetParent)
            //console.log('add2')
        }

}

function editPElement(pTag){
    userInput.value = pTag.querySelector('p').innerText;
    //Adds EventListener to the input field
    userInput.addEventListener("keypress", saveEdit)
    //Adds EventListener to the Save button
    saveButton.addEventListener("click", saveEdit)
    console.log(userInput.value)
    function saveEdit(evt){
    //console.log(evt)
        if(evt.key === "Enter" || evt.target.innerHTML === "Save"){
            pTag.querySelector('p').innerText = userInput.value;
            //Adds EventListener to the input field
            userInput.removeEventListener("keypress", saveEdit)
            //Adds EventListener to the Save button
            saveButton.removeEventListener("click", saveEdit)
            console.log("save change")
            console.log(userInput.value)
        }
    }
}
