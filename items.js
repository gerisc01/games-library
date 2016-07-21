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

function populateLists(lists,allItems) {
    // Build the lists and headers for the active collection
    var fieldsSpec = {};
    for (var i=0;i<lists.length;i++) {
        // Create a div for each list
        $("div.lists")
            .append($("<div/>",{class: "row"})
                .append($("<div/>",{id: lists[i]["id"],class: "list-container"})
                    .append($("<div/>",{class: "col-md-1"}))
                    .append($("<h3/>",{text:lists[i]["title"]}))
                    .append($("<div/>",{class: "container list"}))
        ));

        // Build up the fieldsSpec to be used later
        fieldsSpec[lists[i]["id"]] = lists[i]["fields"];

        // Create header
        var listObj = $(".list-container#"+lists[i]["id"]).children("div.list");
        listObj.append(getHeader(fieldsSpec[lists[i]["id"]]));
        // Initiate Listeners
        initiateListListeners(lists[i]["id"],lists[i]["title"],listObj);
    }

    for (var key in allItems) { if (allItems.hasOwnProperty(key)) {
        var listItems = allItems[key];
        var listItemsLength = listItems.length;
        var list = $(".list-container#"+key).children("div.list");

        for (var i=0;i<listItemsLength;i++) {
            var row = $("<div/>",{class: "row item"});
            row.append(getStandardRowButtons(key));

            var listSpec = fieldsSpec[key];
            for (var j=0;j<listSpec.length;j++) {
                var field = listSpec[j];
                var column = $("<div class=\"col-md-"+field["width"]+" data\"/>");

                jQuery(" <span/>", {
                    id: field["id"],
                    text: listItems[i][field["id"]]
                }).appendTo(column);

                row.append(column);
            }
            list.append(row);
        }

        // Create the quick add row
        var quickAdd = jQuery("<div class=\"row item new-item\"/>");
        // Add the quick add button to the row
        quickAdd.append($("<div/>",{class: "col-md-2 buttons"}).append(getButton("plus","green").addClass("edit start")));
        for (var j=0;j<listSpec.length;j++) {
            var field = listSpec[j];
            var column = $("<div/>",{class: "data col-md-"+field["width"]});
            column.append($("<span/>",{id: field["id"]})).appendTo(quickAdd);
        }
        list.append(quickAdd);

        resetDisabledArrows(key);
    }}
}

/*-----------------------------------------------------------------------------
* LISTENERS
*-----------------------------------------------------------------------------*/
// Move Between Tabs
$(document).on('click', '.tabs#collections li a', function(event) {
    var target = $(event.target);
    $(".tabs#collections li.active").removeClass("active");
    target.parent("li").addClass("active");

    $(".container.lists").empty();
    reloadList();
    $(this).blur();
});

$(document).on('mouseup', '.btn', function() {
   $(this).blur();
});

var initiateListListeners = function(listId,listName,listObj) {
    // Edit (AND Quick Add) Row
    $(".list-container#"+listId).on('click', 'a.edit,.btn.edit.start', function(event) {
        event.preventDefault(); // To prevent <a> from clicking and redirecting
        var item = $(event.target).closest(".item");
        editItem(item);
    });

    $(".list-container#"+listId).on('click', '.edit.cancel', function(event) {
        var item = $(event.target).closest(".item");
        cancelEdit(item,listId);
    });

    $(".list-container#"+listId).on('click', '.edit.accept', function(event) {
        var item = $(event.target).closest(".item");
        acceptEdit(item,listId);
    });

    // Delete Row
    $(".list-container#"+listId).on('click', 'a.delete', function(event) {
        event.preventDefault(); // To prevent <a> from clicking and redirecting
        var item = $(event.target).closest(".item");
        // Delete Item
        item.remove();
    });

    // Move Row Between Lists
    $(".list-container#"+listId).on('click', 'a.moveList', function(event) {
        event.preventDefault(); // To prevent <a> from clicking and redirecting
        var target = $(event.target);
        var item = target.closest("div.item");
        var newListId = target.attr("id");
        
        target.replaceWith($("<a/>",{id: listId, href: "#", text: listName, class: "moveList"}));
        item.insertBefore($("div#"+newListId+" .new-item"));

        resetDisabledArrows(newListId);
        resetDisabledArrows(listId);
    });

    // Completing Quick Add Process
    $(".list-container#"+listId).on('addNewItem', function(event) {
        // Get item from target and throw and error if it isn't of the type new-item
        var item = $(event.target);
        if (!item.hasClass("new-item")) throw "The addNewItem target must have the type 'new-item'";
        // Remove the new-item class from the passed item
        item.removeClass("new-item");
        // Reset the arrows so that the new item has a disabled down arrow
        resetDisabledArrows(listId);
        
        // Create new Quick Add row
        var row = jQuery("<div class=\"row item new-item\"/>");
        // Create buttons and append to row
        var buttons = jQuery("<div class=\"col-md-2 buttons\"/>");
        buttons.append(getButton("plus","green").addClass("edit start"));
        row.append(buttons);
        // Iterate through the previous created item to get the column ids/widths
        item.children("div.data").each(function() {
            var column = $(this).clone();
            column.children("span").empty();
            row.append(column);
        });
        // Add the new row to the list
        listObj.append(row);
    });

    // Shift UP and DOWN within the list
    $(".list-container#"+listId).on('click', '.item .shiftUp', function(event) {
        if (isButtonDisabled(event.target)) return;
        var item = $(event.target).closest(".item");
        item.insertBefore($(item.prev(".item")));
        resetDisabledArrows(listId);
    });

    $(".list-container#"+listId).on('click', '.item .shiftDown', function(event) {
        if (isButtonDisabled(event.target)) return;
        var item = $(event.target).closest(".item");
        item.insertAfter($(item.next(".item")));
        resetDisabledArrows(listId);
    });
}

/*-----------------------------------------------------------------------------
* HELPER METHODS
*-----------------------------------------------------------------------------*/

function editItem(item) {
    // Swap out the buttons
    var buttons = item.children("div.buttons");
    buttons.empty();
    // Append the buttons in reverse order of display because they are floated right
    buttons.append(getButton("ok","green").addClass("edit accept"));
    buttons.append(getButton("remove","red").addClass("edit cancel"));

    // For each row, move the previous text into a hidden span (so it can be 
    // restored if edit is cancelled) and add an input with that previous value 
    // to allow editing of text
    var rows = item.children("div.data").children("span");
    rows.each(function() {
        var text = $(this).text();
        var editableColumn = jQuery("<input/>",{class: "edit", value: text})
            .add(jQuery("<span/>",{id: "preEdit", text: text, class: "hidden"}));
        $(this).html(editableColumn);
    });
}

function cancelEdit(item,listId) {
    // Append the buttons in reverse order of display because they are floated right
    if (item.hasClass("new-item")) {
        var buttons = item.children("div.buttons");
        buttons.empty();
        buttons.append(getButton("plus","green").addClass("edit start"));
    } else {
        item.children("div.buttons").replaceWith(getStandardRowButtons(listId));
    }
    item.find("input.edit").each(function() {
        var columnSpan = $(this).parent("span");
        columnSpan.html($(this).next("span#preEdit").text());
    });
}

function acceptEdit(item,listId) {
    // Swap out the buttons
    item.children("div.buttons").replaceWith(getStandardRowButtons(listId));

    item.find("input.edit").each(function() {
        var text = $(this).val();
        $(this).parent("span").html(text);
    });

    if (item.hasClass("new-item")) item.trigger("addNewItem");
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
        list.find(".shiftUp,.shiftDown").removeClass("disabled");
        list.find(".item .shiftUp").first().addClass("disabled");
        list.find(".item .shiftDown").last().addClass("disabled");
    }
}

