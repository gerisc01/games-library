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

var getAddFieldGroup = function(fieldNumber) {
    var selectInput = $("<select/>",{id: "field-"+fieldNumber+"-size", class: "form-control"});
    for (var i=2;i<11;i++) {
        selectInput.append($("<option/>",{text: i}));
    }

    return $("<div/>",{class: "form-group field-group"})
        .append($("<label/>",{for: "field-"+fieldNumber+"-name",class:"col-sm-2 control-label",text: "Field "+fieldNumber}))
        .append($("<div/>",{class:"col-sm-7"})
            .append($("<input/>",{type: "text",class: "form-control",id: "field-"+fieldNumber+"-name",placeholder:"Field "+fieldNumber+" Name"}))
        )
        .append($("<label/>",{for: "field-"+fieldNumber+"-size",class: "col-sm-1 control-label",text: "Size"}))
        .append($("<div/>",{class: "col-sm-2"})
            .append(selectInput)
        );
}