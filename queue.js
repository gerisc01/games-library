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

$(document).on('mouseup', '.btn', function() {
   $(this).blur(); 
});

function itemMoved(item) {
    
}