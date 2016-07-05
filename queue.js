var element = null;
var aEvent = null;
var downArrow = "<button type=\"button\" class=\"btn btn-default\" aria-label=\"Down\"><span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span></button></li>";
var upArrow = "<button type=\"button\" class=\"btn btn-default\" aria-label=\"Up\"><span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span></button></li>";

$(document).on('click', '.btn', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var divId = target.closest("div.editable-items").attr("id");
    var title = target.prev("span#title");
    if (divId == "backlog") {
        $("<li/>").appendTo($("div#current ul")).append(title).append(downArrow);
        $(event.target).closest("li").remove();
    } else if (divId == "current") {
        $("<li/>").appendTo($("div#backlog ul")).append(title).append(upArrow);
        $(event.target).closest("li").remove();
    }
});

function itemMoved(item) {
    
}