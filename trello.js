// Common variables 
var trelloApiUrl = "https://api.trello.com/1/";
var apiKey = "3d9105f7e1f1b9861bd282ec7693fc50";
var token = "3f69d36462cd6b5fb8a99b36c97cc646c5f60a518a1a5c11219c24ee09492b79"

// Step 1 : Get boards and append it to dropdown 
var getBoards = function() {
    var url = trelloApiUrl + "members/me/boards?fields=name,url&key=" + apiKey + "&token=" + token;
    $.ajax({
        type: "GET",
        url: url,
        success: function(boards) {
            // console.log(boards)
            $.each(boards, function(index, value) {
                $('#boards')
                    .append($("<option></option>")
                        .attr("value", value.id)
                        .text(value.name));
            });
        },
        error: function(boards) {
            console.log('Boards not found');
        }
    });
}

// Step 2 : Get lists for a selected board
var getLists = function(boardId) {
    var url = trelloApiUrl + "boards/" + boardId + "/lists?key=" + apiKey + "&token=" + token;
    $.ajax({
        type: "GET",
        url: url,
        success: function(lists) {
            // console.log(lists)
            for (idx in lists) {
                getCards(lists[idx].id, lists[idx].name);
            }
        },
        error: function(lists) {
            console.log('Lists not found');
        }
    });
}

// Step 3 : Get cards for a particular list
var getCards = function(listId, listName) {
    var getCardsUrl = trelloApiUrl + "lists/" + listId + "/cards?key=" + apiKey + "&token=" + token;
    $.ajax({
        type: "GET",
        async: false,
        url: getCardsUrl,
        success: function(cards) {
            console.log(cards)
            var $list = $('<div class="row mx-5" id="' + listName.replace(' ', '') + '"><div class="col-md-12"><h2 class="d-inline text-center">' + listName + '</h2><button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#addCardModal" data-whatever="' + listId + '">Add Card</button></div></div><hr>');
            $("#listContainer").append($list);
            drawList(cards, listName);
        },
        error: function(cards) {
            console.log('Cards not found');
        }
    });
}

// Step 4 : Draw the list
var drawList = function(cards, listName) {
    for (var i = 0; i < cards.length; i++) {
        var $card = $('<div class="col-md-2"><div class="card text-white bg-secondary mb-3" style="max-width: 18rem;"><div class="card-header">' + cards[i].name + '</div><div class="card-body"></div></div></div>');
        $("#" + listName.replace(' ', '')).append($card);
    }
}

var addCardFunc = function(title, listID) {
    var getCardsUrl = trelloApiUrl + "cards?key=" + apiKey + "&token=" + token + "&name=" + title + "&idList=" + listID;
    $.ajax({
        type: "POST",
        async: false,
        url: getCardsUrl,
        success: function() {
            location.reload()
        },
        error: function() {
            console.log('Cannot add card');
        }
    });
}