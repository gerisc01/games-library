// Creating bootstrap glyphicon button based on the type and color. A JQuery
// object will be returned so that any classes that need to be added to the
// button can be added to the return object. Any color added will need a
// corresponding css class that sets the color based on the name.
// (ie. .red { color: red; })
var getButton = function(type,color) {
    var button = jQuery("<button/>", {type: "button", class: "btn btn-default"});
    // build the span class that will be used to create the glyphicon
    var spanClass = "glyphicon glyphicon-"+type;
    if (color !== undefined) spanClass += " "+color;
    button.append(jQuery("<span/>", {class: spanClass}));
    return button;
}

// Checks event target to see if the nearest button is disabled (returns true 
// if disabled)
var isButtonDisabled = function(eventTarget) {
    if (eventTarget === undefined) throw "An event target is required";
    var target = $(eventTarget);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var isDisabled = target.hasClass("disabled") ? true : false;
    return isDisabled;
}

var getStandardRowButtons = function(listId) {
    var buttons = $("<div/>",{class: "col-md-2 buttons"});
    // Create move arrows
    buttons.append(getButton("arrow-down").addClass("movement shiftDown"));
    buttons.append(getButton("arrow-up").addClass("movement shiftUp"));
    // Create move button
    var moveButton = "<div class=\"movement dropdown\">"+
        "<button type=\"button\" data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\">"+
        "<span class=\"glyphicon glyphicon-tasks\"></span>"+
        "</button>"+
        "<ul class=\"dropdown-menu\">";
    $(".list-container").each(function() {
        if ($(this).attr("id") !== listId) { 
            moveButton += "<li><a id=\""+$(this).attr("id")+"\" class=\"moveList\" href=\"#\">"+
                $(this).children("h3").text()+"</a></li>";
        }
    });
    moveButton +=  "<li class=\"divider\"></li>"+
    "<li><a class=\"edit start\" href=\"\">Edit</a></li>"+
    "<li><a class=\"delete\" href=\"\">Delete</a></li>"+
    "</ul></div>";
    buttons.append(moveButton);
    return buttons;
}