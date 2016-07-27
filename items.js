var collectionLists = null;
var collectionItems = null;

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
        collectionLists = data.lists[collectionId];
        collectionItems = data.items[collectionId];

        populateTabs();
        var activeList = $(".list-tab.active").attr("id");
        populateList(activeList);
    });
}

function loadNewCollection() {
    $.getJSON("items.json", function(data) {
        // Populate lists with the items saved in collection lists and items
        var collectionId = $(".tabs#collections li.active").attr("id");
        collectionLists = data.lists[collectionId];
        collectionItems = data.items[collectionId];

        populateTabs();
        var activeList = $(".list-tab.active").attr("id");
        populateList(activeList);
    });
}

function populateTabs() {
    var tabs = $("div.list-tabs");
    for (var i=0;i<collectionLists.length;i++) {
        tabs.append($("<div/>",{id: collectionLists[i]["id"],class: "list-tab"})
            .append($("<div/>",{class:"list-tab-text "+collectionLists[i]["color"]+"-bg"})
                .append($("<h4/>",{text: collectionLists[i]["title"]}))
            ).append($("<div/>",{class:"arrow-right "+collectionLists[i]["color"]}))
        );
    }
    $(".list-tab").first().addClass("active");
}

function populateList(list) {
    var tabIndex = findTabIndex(list);
    var title = collectionLists[tabIndex]["title"];
    var fieldSpec = collectionLists[tabIndex]["fields"];
    var items = collectionItems[list];

    $("div.lists")
    .append($("<div/>",{class: "row"})
        .append($("<div/>",{id: list,class: "list-container"})
            .append($("<div/>",{class: "col-md-1"}))
            .append($("<h3/>",{text:title}))
            .append($("<div/>",{class: "list"}))
    ));

    // Create header
    var listObj = $(".list-container#"+list).children("div.list");
    listObj.append(getHeader(fieldSpec));
    // Initiate Listeners
    initiateListListeners(list,title,listObj);

    for (var i=0;i<items.length;i++) {
        var row = $("<div/>",{class: "row item"});
        row.append(getStandardRowButtons(list));

        for (var j=0;j<fieldSpec.length;j++) {
            var field = fieldSpec[j];
            var column = $("<div class=\"col-md-"+field["width"]+" data\"/>");

            jQuery(" <span/>", {
                id: field["id"],
                text: items[i][field["id"]]
            }).appendTo(column);

            row.append(column);
        }
        listObj.append(row);
    }

    //Create the quick add row
    var quickAdd = jQuery("<div class=\"row item new-item\"/>");
    // Add the quick add button to the row
    quickAdd.append($("<div/>",{class: "col-md-2 buttons"}).append(getButton("plus","green").addClass("edit start")));
    for (var j=0;j<fieldSpec.length;j++) {
        var field = fieldSpec[j];
        var column = $("<div/>",{class: "data col-md-"+field["width"]});
        column.append($("<span/>",{id: field["id"]})).appendTo(quickAdd);
    }
    listObj.append(quickAdd);

    resetDisabledArrows(list);
}

/*-----------------------------------------------------------------------------
* LISTENERS
*-----------------------------------------------------------------------------*/
// Move Between Tabs
$(document).on('click', '.tabs#collections li a', function(event) {
    var target = $(event.target);
    $(".tabs#collections li.active").removeClass("active");
    target.parent("li").addClass("active");

    $(".lists").empty();
    $(".list-tabs").empty();
    loadNewCollection();
    $(this).blur();
});

$(document).on('click', '.list-tab', function(event) {
    var target = $(event.target);
    while (target && !target.hasClass("list-tab")) {
        target = target.parent();
    }
    // save the list changes before switching lists
    saveListChanges();
    // empty out the list
    $(".lists").empty();
    $(".list-tab.active").removeClass("active");
    // populate the new list
    target.addClass("active");
    populateList(target.attr("id"));
});

$(document).on('click', '.save', function() {
    saveToDb();
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
        
        moveList(item,listId,newListId);
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

function moveList(item,oldList,newList) {
    var itemIndex = $(".item").index(item);
    var itemJson = collectionItems[oldList][itemIndex];
    collectionItems[newList].push(itemJson);
    // Delete item from viewable oldList and json oldList
    item.remove();
    collectionItems[oldList].splice(itemIndex,1);

    resetDisabledArrows(oldList);
}

function findTabIndex(id) {
    return $(".list-tab").index($(".list-tab#"+id));
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

function getHeader(fieldSpec) {
    var header = "<div class=\"row header\">"+
        "<div class=\"col-md-2\"></div>";

    for (var i=0;i<fieldSpec.length;i++) {
        header += "<div class=\"col-md-"+fieldSpec[i]["width"]+"\"><h4>"+fieldSpec[i]["name"]+"</h4></div>";
    }
    header += "</div>";
    return header;
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
    for (var i=0;i<collectionLists.length;i++) {
        if (collectionLists[i]["id"] !== listId) {
            moveButton += "<li><a id=\""+collectionLists[i]["id"]+"\" class=\"moveList\" href=\"#\">"+
                collectionLists[i]["title"]+"</a></li>";
        }
    }
    moveButton +=  "<li class=\"divider\"></li>"+
    "<li><a class=\"edit start\" href=\"\">Edit</a></li>"+
    "<li><a class=\"delete\" href=\"\">Delete</a></li>"+
    "</ul></div>";
    buttons.append(moveButton);
    return buttons;
}

var saveListChanges = function() {
    var activeListId = $(".list-tab.active").attr("id");
    // If sublists are introducted will eventually go back to .list-container.each,
    // but for now we will always just have one list container
    var items = [];
    $(".list-container").find(".item").each(function() {
        if (!$(this).hasClass("new-item")) {
            var item = {};
            $(this).find(".data span").each(function() {
                item[$(this).attr("id")] = $(this).text();
            });
            items.push(item);
        }
    });
    collectionItems[activeListId] = items;
}

var saveToDb = function() {
    // Start by retrieving the items from the stored json list because only the
    // currently activated collection is available on the page
    saveListChanges();
    $.getJSON("items.json", function(data) {
        var collection = $(".tabs#collections li.active").attr("id");
        var json = data;
        json.lists[collection] = collectionLists;
        json.items[collection] = collectionItems;

        var data = {"db" : json, "fileName" : "items.json"};
        $.post( "write_db.php", data);
    });
}

