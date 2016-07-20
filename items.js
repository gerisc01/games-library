function initializePage() {
    $.getJSON("items.json", function(data) {
        // Get list of collections and build tabs
        var collections = data.collections;
        for (var i=0;i<collections.length;i++) {
            var tab = jQuery("<li id=\""+collections[i]["id"]+"\"><a href=\"#\">"+collections[i]["title"]+"</a></li>");
            if (i == 0) tab.addClass("active");
            $(".tabs#collections").append(tab);
        }

        // Populate lists with the items
        var collectionId = $(".tabs#collections li.active").attr("id");
        populateLists(data.lists[collectionId],data.items[collectionId]);
    });
}

function reloadList() {
    $.getJSON("items.json", function(data) {
        // Populate lists with the items
        var collectionId = $(".tabs#collections li.active").attr("id");
        populateLists(data.lists[collectionId],data.items[collectionId]);
    });
}

function populateLists(lists,items) {
    // Build the lists and headers for the active collection
    var fieldsSpec = {};
    for (var i=0;i<lists.length;i++) {
        // Create a div for each list
        var list = "<div class=\"row\">"+
            "<div id=\""+lists[i]["id"]+"\" class=\"list-container\">"+
                "<div class=\"col-md-1\"></div>"+ // Put this div in to get a bit of space for the title
                "<h3>"+lists[i]["title"]+"</h3>"+
                "<div class=\"container list\"></div>"+
            "</div>"+
        "</div>";
        $("div.lists").append(list);

        // Build up the fieldsSpec to be used later
        fieldsSpec[lists[i]["id"]] = lists[i]["fields"];

        // Append list header
        $(".list-container#"+lists[i]["id"]).children("div.list")
            .append(getHeader(fieldsSpec[lists[i]["id"]]));
    }

    for (var key in items) { if (items.hasOwnProperty(key)) {
        var listItems = items[key];
        var listItemsLength = listItems.length;
        var list = $(".list-container#"+key).children("div.list");

        for (var i=0;i<listItemsLength;i++) {
            var row = jQuery("<div class=\"row item\"/>");

            var movement = jQuery("<div class=\"col-md-2\"/>");
            movement.append(getMoveArrows());
            movement.append(getMoveButton(key));

            row.append(movement);

            var listSpec = fieldsSpec[key];
            for (var j=0;j<listSpec.length;j++) {
                var field = listSpec[j];
                var column = jQuery("<div class=\"col-md-"+field["width"]+"\"/>");

                jQuery(" <span/>", {
                    id: field["id"],
                    text: listItems[i][field["id"]]
                }).appendTo(column);

                row.append(column);
            }

            list.append(row);
        }

        // Create the quick add row
        var quickAdd = jQuery("<div class=\"row new-item\"/>");
        // Add the quick add button to the row
        var button = jQuery("<div class=\"col-md-2\"/>").append(
            " <button type=\"button\" class=\"btn btn-default quick-add add\"><span class=\"glyphicon glyphicon-plus green\"></span></button>");
        quickAdd.append(button);
        for (var j=0;j<listSpec.length;j++) {
            var field = listSpec[j];
            var column = jQuery("<div class=\"col-md-"+field["width"]+"\"/>");
            jQuery("<span/>",{id: field["id"], class: "quick-add"}).appendTo(column);
            quickAdd.append(column);
        }
        list.append(quickAdd);

        // disable the first and last arrow inside the list
        list.find("div.item .mvmt-inside-list#up").first().addClass("disabled");
        list.find("div.item .mvmt-inside-list#down").last().addClass("disabled");
    }}
}


// Listeners

$(document).on('click', '.tabs#collections li a', function(event) {
    var target = $(event.target);
    $(".tabs#collections li.active").removeClass("active");
    target.parent("li").addClass("active");

    $(".container.lists").empty();
    reloadList();
    $(this).blur();
});

$(document).on('click', '.quick-add.add', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }

    var newItem = target.closest(".new-item");
    newItem.find("span.quick-add").each(function() {
        $(this).append("<input class=\"quick-add\"/>");
    });

    target.replaceWith("<button type=\"button\" class=\"btn btn-default quick-add accept\"><span class=\"glyphicon glyphicon-ok green\"></span></button>"+
        " <button type=\"button\" class=\"btn btn-default quick-add cancel\"><span class=\"glyphicon glyphicon-minus red\"></span></button>");
});

$(document).on('click', '.quick-add.cancel', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var currentListId = target.closest("div.list-container").attr("id");

    var newItem = target.closest(".new-item");
    // Replace the cancel and accept buttons with the quick add button
    newItem.find("div").first().empty();
    newItem.find("div").first().append(" <button type=\"button\" class=\"btn btn-default quick-add add\"><span class=\"glyphicon glyphicon-plus green\"></span></button>");
    // Empty the inputs from the field spans
    newItem.find("span.quick-add").each(function() {
        $(this).empty();
    });
});

$(document).on('click', '.quick-add.accept', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var list = target.closest("div.list-container").children("div.list");
    var listId = target.closest("div.list-container").attr("id");
    var newItem = target.closest(".new-item");

    newItem.find("input.quick-add").each(function() {
        var text = $(this).val();
        $(this).replaceWith(text);
    });

    var movement = newItem.children("div").first();
    movement.empty();
    movement.append(getMoveArrows());
    movement.append(getMoveButton(listId));

    newItem.removeClass("new-item");
    newItem.addClass("item");

    resetDisabledArrows(listId);

    // Create the new quick add row
    var quickAdd = jQuery("<div class=\"row new-item\"/>");
    // Add the quick add button to the row
    var button = jQuery("<div class=\"col-md-2\"/>").append(
        " <button type=\"button\" class=\"btn btn-default quick-add add\"><span class=\"glyphicon glyphicon-plus green\"></span></button>");
    quickAdd.append(button);
    newItem.find("span.quick-add").each(function() {
        var parentDiv = $(this).parent("div").clone();
        parentDiv.children("span.quick-add").empty();
        parentDiv.appendTo(quickAdd);
        $(this).removeClass("quick-add");
    });
    list.append(quickAdd);
});

$(document).on('click', '.edit.cancel', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var listId = target.closest("div.list-container").attr("id");

    var item = target.closest(".item");
    var movement = item.children("div").first();
    movement.empty();
    movement.append(getMoveArrows());
    movement.append(getMoveButton(listId));

    item.find("input.edit").each(function() {
        var preEditText = $(this).next("span#preEdit").text();
        var parentSpan = $(this).parent("span");
        parentSpan.empty();
        parentSpan.text(preEditText);
    });
});

$(document).on('click', '.edit.accept', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var listId = target.closest("div.list-container").attr("id");

    var item = target.closest(".item");
    var movement = item.children("div").first();
    movement.empty();
    movement.append(getMoveArrows());
    movement.append(getMoveButton(listId));

    item.find("input.edit").each(function() {
        var newText = $(this).val();
        var parentSpan = $(this).parent("span");
        parentSpan.empty();
        parentSpan.text(newText);
    });
});

// Movement helpers

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

// Movement Menu (Move/Edit/Delete)
$(document).on('click', '.movement.dropdown li a', function(event) {
    event.preventDefault();
    var target = $(event.target);
    var item = target.closest("div.item");
    // If delete
    if (target.hasClass("delete")) { 
        item.remove();
    }
    // If edit
    else if (target.hasClass("edit")) {
        item.children("div").first().empty();
        item.children("div").first().append("<button type=\"button\" class=\"btn btn-default edit accept\"><span class=\"glyphicon glyphicon-ok green\"></span></button>"+
        " <button type=\"button\" class=\"btn btn-default edit cancel\"><span class=\"glyphicon glyphicon-remove red\"></span></button>");
        item.children("div").children("span").each(function() {
            var text = $(this).text();
            $(this).empty();
            $(this).append(jQuery("<input/>", {class: "edit", value: text}));
            $(this).append(jQuery("<span/>", {id: "preEdit", text: text, class: "hidden"}));
        });
    }
    // If neither of those, it is movement
    else {
        var newListId = target.attr("id");
        var currentListId = target.closest("div.list-container").attr("id");
        var currentListName = $("div.list-container#"+currentListId+" h3").text();
        
        target.replaceWith("<a id=\""+currentListId+"\" href=\"#\">"+currentListName+"</a>");
        item.insertBefore($("div#"+newListId+" .new-item"));
    }

    resetDisabledArrows(newListId);
    resetDisabledArrows(currentListId);
});

$(document).on('mouseup', '.btn', function() {
   $(this).blur();
});


// Helper Methods

var getMoveButton = function(listId) {
    var moveList = "<div class=\"movement dropdown\">"+
        "<button type=\"button\" data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\">"+
        "<span class=\"glyphicon glyphicon-tasks\"></span>"+
        "</button>"+
        "<ul class=\"dropdown-menu\">";

    $(".list-container").each(function() {
        if ($(this).attr("id") !== listId) { 
            moveList += "<li><a id=\""+$(this).attr("id")+"\" href=\"#\">"+
                $(this).children("h3").text()+"</a></li>";
        }
    });

    moveList +=  "<li class=\"divider\"></li>"+
    "<li><a class=\"edit\" href=\"\">Edit</a></li>"+
    "<li><a class=\"delete\" href=\"\">Delete</a></li>"+
    "</ul></div>";

    return moveList;
}

var getMoveArrows = function() {
    // Down Arrow
    return " <button type=\"button\" id=\"down\" class=\"btn btn-default movement mvmt-inside-list\" aria-label=\"Down\">"+
    "<span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>"+
    "</button>"+
    // Up Arrow
    " <button type=\"button\" id=\"up\" class=\"btn btn-default movement mvmt-inside-list\" aria-label=\"Up\">"+
    "<span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>"+
    "</button>";
}

function getHeader(fieldSpec) {
    var header = "<div class=\"row header\">"+
        "<div class=\"col-md-2\"></div>";

    for (var i=0;i<fieldSpec.length;i++) {
        header += "<div class=\"col-md-"+fieldSpec[i]["width"]+"\"><h4>"+fieldSpec[i]["name"]+"</h4></div>";
    }
    header += "</div>";
    return header;
}

// If a listId is supplied, just reset the arrows in that given list
function resetDisabledArrows(listId) {
    if (listId !== undefined) {
        var list = $(".list-container#"+listId);
        list.find(".mvmt-inside-list").removeClass("disabled");
        list.find("div.item .mvmt-inside-list#up").first().addClass("disabled");
        list.find("div.item .mvmt-inside-list#down").last().addClass("disabled");
    }
}






