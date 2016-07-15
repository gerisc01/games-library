$(document).on('click', '.btn.mvmt-inside-list', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    if (target.hasClass("disabled")) return;

    var direction = target.attr("id");
    var divId = target.closest("div.list-container").attr("id");
    var item = target.closest("div.row");

    if (direction === "up") {
        if (item.prev("div.row").find(".mvmt-inside-list#up").hasClass("disabled")) { 
            item.find(".mvmt-inside-list#up").addClass("disabled"); 
            item.prev("div.row").find(".mvmt-inside-list#up").removeClass("disabled");
        }
        item.insertBefore($(item.prev("div.row")));
    } else {
        if (item.next("div.row").find(".mvmt-inside-list#down").hasClass("disabled")) { 
            item.find(".mvmt-inside-list#down").addClass("disabled"); 
            item.next("div.row").find(".mvmt-inside-list#down").removeClass("disabled");
        }
        item.insertAfter($(item.next("div.row")));
    }
});

$(document).on('click', '.movement.dropdown li a', function(event) {
    event.preventDefault();
    var target = $(event.target);
    var newListId = target.text();
    var currentListId = target.closest("div.list-container").attr("id");
    var item = target.closest("div.row");
    // TODO: Disable appropriate buttons on swap

    // item swap move list
    target.replaceWith("<a href=\"#\">"+currentListId+"</a>");
    $("div#"+newListId+" .list").append(item);
});

$(document).on('mouseup', '.btn', function() {
   $(this).blur(); 
});

function itemMoved(item) {
    
}