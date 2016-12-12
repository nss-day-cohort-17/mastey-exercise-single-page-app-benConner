var carInventory;
var mainBodyDiv = document.querySelector("#main-body");
loadInventory();

function populatePage(inventory) {
  // Loop over the inventory and populate the page
    mainBodyDiv.innerHTML += '<div class="row">'
    for (var i = 0; i < inventory.cars.length; i++) {
        mainBodyDiv.innerHTML +=`<div class="col-sm-4 car-cards">
                                    <h2>${inventory.cars[i].make}</h2>
                                    <p>${inventory.cars[i].model}</p>
                                    <p>${inventory.cars[i].price}</p>
                                    <p>${inventory.cars[i].description}</p>
                                </div>`
        console.log(inventory.cars[i])
  }
    mainBodyDiv.innerHTML += '</div>'
  // Now that the DOM is loaded, establish all the event listeners needed
  //activateEvents();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory (callback) {
    var inventoryLoader = new XMLHttpRequest();
    inventoryLoader.open("GET", "inventory.json");
    inventoryLoader.send()

    inventoryLoader.addEventListener("load", function (e) {
        var carInventory = JSON.parse(e.target.responseText);
        populatePage(carInventory);
  });
}
