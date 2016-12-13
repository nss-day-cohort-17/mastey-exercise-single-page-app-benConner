var carInventory;
var mainBodyDiv = document.querySelector(".main-body");
loadInventory();

function populatePage(inventory) {
  // Loop over the inventory and populate the page
    for (var i = 0; i < inventory.cars.length; i++) {
        mainBodyDiv.innerHTML +=`<div class="col-sm-4 car-cards">
                                    <h2>${inventory.cars[i].make}</h2>
                                    <p>Model: ${inventory.cars[i].model}</p>
                                    <p>Price: ${inventory.cars[i].price}</p>
                                    <p>Description: ${inventory.cars[i].description}</p>
                                </div>`
    }
    var carCard = document.querySelectorAll(".car-cards")
  // Now that the DOM is loaded, establish all the event listeners needed
    for (var i = 0; i < carCard.length; i++) {
        carCard[i].addEventListener("click",cardSelected)
    }
}

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
    console.log(e)
    e.target.classList.toggle("selected-car");
}
