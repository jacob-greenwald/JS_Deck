
const number_of_cards = 52;

//Card options
const card_values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
const card_suits = ["C","H","S","D"];

const NUM_ROWS = 4;
const NUM_COLUMNS = 13

var cardArray = []
const cardsClicked = []
var table_is_created = false;


function buildDeck() {
    cardArray.length = 0 //Clear array
    for (var suit of card_suits) {
        for (var value of card_values) {
            cardArray.push({
                name: value + suit,
                img: `./new_images/${value}${suit}.png`
            })
        }
    }
    if (table_is_created) {
        displayDeck(cardArray);
    }else {
        createTable(cardArray);
    }
}

function createTable(card_array) {
    const tbl = document.getElementById("table")
    const tbl_body = document.createElement("tbody")
    var card_index = 0;

    // Create cells
    while (card_index < card_array.length) {
        for (var i = 0; i < NUM_ROWS; i++) {
            // Create a <tr> element
            const curr_row = document.createElement("tr");

            for (var j = 0; j < NUM_COLUMNS; j++) {
                // Create <td> element (table data) and initialize it with an index
                const curr_cell = document.createElement("td");

                // Create the card image and store it in the cell
                const cell_img = document.createElement("img")
                cell_img.setAttribute("src", card_array[card_index].img)
                cell_img.setAttribute("class", "card_img");
                cell_img.setAttribute("data-id", card_index)
                cell_img.addEventListener("click", clicked)

                curr_cell.appendChild(cell_img)
                curr_row.appendChild(curr_cell);

                card_index++;
            }
            tbl_body.appendChild(curr_row);
        }
    }
    tbl.appendChild(tbl_body);

    // Set table_created boolean to true
    table_is_created = true;
}

function displayDeck(card_array) {
    const images = document.getElementsByClassName("card_img");
    for(var i = 0; i < card_array.length; i++) {
        images[i].setAttribute("src", card_array[i].img);
        // console.log(cells[i])
    }
    cardsClicked.length = 0;
}

function faro() {
    const middle = cardArray.length / 2;
    var temp_deck = [];

    for (var i = 0; i < middle; i++) {
        temp_deck.push(cardArray[i]);
        temp_deck.push(cardArray[i + middle])
    }
    cardArray = temp_deck;
    displayDeck(cardArray);
}

function clicked() {
    var cardId = this.getAttribute("data-id")
    cardsClicked.push(cardId);

    if (cardsClicked.length == 2) {
        swap_cards();
    }
    console.log(cardArray[cardId])
}

function swap_cards() {
    var id1 = cardsClicked[0];
    var id2 = cardsClicked[1];
    if (id1 !== id2) {
        var temp = cardArray[id1]
        cardArray[id1] = cardArray[id2]
        cardArray[id2] = temp
        cardsClicked.length = 0;
        displayDeck(cardArray);
    }else {
        cardsClicked.pop()
    }

}


buildDeck();