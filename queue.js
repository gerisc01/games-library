$(document).on('click', '.btn', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var direction = target.attr("id");
    var divId = target.closest("div.editable-items").attr("id");
    // var title = target.prev("span#title");
    var item = target.closest("li");

    if (direction === "up") {
        item.insertBefore($(item.prev("li")));
    } else {
        item.insertAfter($(item.next("li")));
    }
});

function itemMoved(item) {
    
}