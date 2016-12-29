var carInventory;
var mainBodyDiv = document.querySelector(".main-body");
var userInput = document.querySelector(".input-field");
var editButton = document.querySelector(".edit-btn")
loadInventory();

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
    userInput.addEventListener("keypress", saveEdit)
    editButton.addEventListener("click", saveEdit)

    function saveEdit(evt){
    console.log(evt)
     if(evt.key === "Enter" || evt.target.innerHTML === "Enter new car info."){
        pTag.querySelector('p').innerText = userInput.value;
         console.log("save change")
     }
}
}

// function saveEdit(evt){
//     console.log(evt)
//      if(evt.key === "Enter" || evt.target.innerHTML === "Enter new car info."){

//          console.log("save change")
//      }
// }











// var editTask = function(){
//   var listItim = this.parentNode;
//   var editInput = listItim.querySelector("input[type=text]");
//   var label = listItim.querySelector("label");
//   var containsClass = listItim.classList.contains("editMode");
//   if(containsClass){
//     label.innerText = editInput.value;
//   }else{
//     editInput.value = label.innerText;
//   }
//   listItim.classList.toggle("editMode");

// }
