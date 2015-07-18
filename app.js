//Declare a var
var itemTemplate = $('#templates .item');
var list         = $('#list');

//add item to you advariables
var addItemToPage = function(itemData) {
  var item = itemTemplate.clone()
  item.attr('data-id',itemData.id)
  item.find('.description').text(itemData.description)
  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
};

var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/joksina/"
});

loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
});

$('#add-form').on('submit', function(event) {
  var itemDescription = event.target.itemDescription.value;
  event.preventDefault();

  var creationRequest = $.ajax({
  type: 'POST',
  url: "http://listalous.herokuapp.com/lists/joksina/items",
  data: { description: itemDescription, completed: false }
})

  //add to check list with out add function
creationRequest.done(function(itemDataFromServer) {
  addItemToPage(itemDataFromServer)
	});

});

// Alert the user if they are trying to add an item
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
var isItemCompleted = item.hasClass('completed')
var itemId = item.attr('data-id')
var updateRequest = $.ajax({
  type: 'PUT',
  url: "https://listalous.herokuapp.com/lists/joksina/items/" + itemId,
  data: { completed: !isItemCompleted }
});
updateRequest.done(function(itemData) {
  if (itemData.completed) {
    item.addClass('completed')
  } else {
    item.removeClass('completed')
  }
});
});






// item = { description: 'a new item', id: 9000, completed: false}
// addItemToPage(item)