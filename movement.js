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
        item.insertBefore($(item.prev("div.row")));
    } else {
        item.insertAfter($(item.next("div.row")));
    }

    resetDisabledArrows(divId);
});

$(document).on('click', '.movement.dropdown li a', function(event) {
    event.preventDefault();
    var target = $(event.target);
    var newListId = target.attr("id");
    var currentListId = target.closest("div.list-container").attr("id");
    var currentListName = $("div.list-container#"+currentListId+" h3").text();
    var item = target.closest("div.item");

    target.replaceWith("<a id=\""+currentListId+"\" href=\"#\">"+currentListName+"</a>");
    item.insertBefore($("div#"+newListId+" .new-item"));

    resetDisabledArrows(newListId);
    resetDisabledArrows(currentListId);
});

$(document).on('mouseup', '.btn', function() {
   $(this).blur();
});

// If a listId is supplied, just reset the arrows in that given list
function resetDisabledArrows(listId) {
    if (listId !== undefined) {
        var list = $(".list-container#"+listId);
        list.find(".mvmt-inside-list").removeClass("disabled");
        list.find("div.item .mvmt-inside-list#up").first().addClass("disabled");
        list.find("div.item .mvmt-inside-list#down").last().addClass("disabled");
    }
}