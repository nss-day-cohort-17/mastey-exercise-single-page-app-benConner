var targetParent;
var carInventory;
var mainBodyDiv = document.querySelector(".main-body");
var userInput = document.querySelector(".input-field");
var saveButton = document.querySelector(".save-btn");

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
    eventListeners()
}

//function for all the eventListeners
function eventListeners(){
    var carCard = document.querySelectorAll(".car-cards");
    //Adds EventListener to each car card
    for (var i = 0; i < carCard.length; i++) {
        carCard[i].addEventListener("click",targetCard)
    }
    if(targetParent != undefined){
        //Adds EventListener to the input field
        userInput.addEventListener("keyup", saveEdit)
        //Adds EventListener to the Save button
        saveButton.addEventListener("click", saveEdit)
    }
}

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory () {
    var inventoryLoader = new XMLHttpRequest();
    inventoryLoader.open("GET", "inventory.json");
    inventoryLoader.send()

    inventoryLoader.addEventListener("load", function (e) {
        carInventory = JSON.parse(e.target.responseText);
        populatePage(carInventory);
  });
}

//function grabs the target parent and sends the parent element and a color
function targetCard(e){
    console.log('hey')
    var style = "green"
    targetParent = e.target;
    removeClass()
    //if adds .selected-car on card if child element is selected
    if(e.target.className === ""){
        targetParent = e.target.offsetParent
        cardSelected(targetParent, style)
        //else adds .selected-car on card
    }else {
        cardSelected(targetParent, style)
        //console.log('add2')
    }
}
//function takes parent element and adds styling
function cardSelected(element, color){
    element.classList.add(color)
    element.querySelector('p').innerText ="";
    userInput.value = element.querySelector('p').innerText
    userInput.focus();
    eventListeners()
}
//function the saves the text and removes styling class on save
function saveEdit(evt){
    //console.log(evt)
        targetParent.querySelector('p').innerText = userInput.value;
        if(evt.key === "Enter" || evt.target.innerHTML === "Save"){
            targetParent.querySelector('p').innerText = userInput.value;
            userInput.value = ""
            //Adds EventListener to the input field
            userInput.removeEventListener("keyup", saveEdit)
            //Adds EventListener to the Save button
            saveButton.removeEventListener("click", saveEdit)
            removeClass()
            console.log("save change")
            console.log(userInput.value)
        }
    }
//function to remove styles class
function removeClass(){
    var elementsWith = document.querySelector(".green");
    if (elementsWith != null){
        elementsWith.classList.remove("green");
        console.log('remove')
    }
}
