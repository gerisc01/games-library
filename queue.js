$(document).on('click', '.btn.mvmt-inside-list', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var direction = target.attr("id");
    var divId = target.closest("div.list-container").attr("id");
    var item = target.closest("div.row");

    if (direction === "up") {
        item.insertBefore($(item.prev("div.row")));
    } else {
        item.insertAfter($(item.next("div.row")));
    }
});

$(document).on('click', '.movement.dropdown li a', function(event) {
    event.preventDefault();
    var target = $(event.target);
    var newListId = target.text();
    var currentListId = target.closest("div.list-container").attr("id");
    var item = target.closest("div.row");
    // item swap move list
    target.replaceWith("<a href=\"#\">"+currentListId+"</a>");
    $("div#"+newListId+" .list").append(item);
});

$(document).on('mouseup', '.btn', function() {
   $(this).blur(); 
});

function itemMoved(item) {
    
}