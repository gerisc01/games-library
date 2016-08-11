var collectionLists = null;
var collectionItems = null;
var activeCollection = null;
var activeList = null;
var cancelDrop = false;
var cancelDropFinal = false;
var colorList = {"pastel-green": "Green", "pastel-red": "Red", "pastel-purple": "Purple", "pastel-orange": "Orange",
        "pastel-yellow": "Yellow", "pastel-blue": "Blue"};
var database = new LocalDB("items.json");

/* Standard initalization */
function initializePage() {
    loadCollections()
        .then(function(collections) {
            activeCollection = collections[0]["id"];
            return loadLists(activeCollection); 
        })
        .then(function(lists) {
            activeList = lists[0]["id"];
            loadItems(activeCollection); 
        })
}

function loadCollections() {
    return database.getCollections().then(function(collections) {
        activeCollection = collections[0]["id"];
        return collections;
    }).done(function(collections) { populateCollections(collections); });
}

function loadLists(collection) {
    return database.getLists(collection).then(function(lists) {
        collectionLists = lists;
        return lists;
    }).done(function(lists) { populateLists(lists); });
}

function loadItems(collection) {
    return database.getItems(collection).then(function(items) {
        collectionItems = items;
        return items;
    }).done(function(items) { populateItems(items); });
}

function populateCollections(collections) {
    for (var i=0;i<collections.length;i++) {
        var tab = jQuery("<li id=\""+collections[i]["id"]+"\"><a href=\"#\">"+collections[i]["title"]+"</a></li>");
        if (i == 0) {
            tab.addClass("active");
            activeCollection = collections[i]["id"];
        }
        $(".tabs#collections").append(tab);
    }
    $(".tabs#collections li.active a").prepend($("<span/> ",{class: "glyphicon glyphicon-pencil edit-list"}));
}

function populateLists(lists) {
    var tabs = $("div.list-tabs");
    for (var i=0;i<lists.length;i++) {
        var tab = $("<div/>",{id: lists[i]["id"],class: "list-tab"})
            .append($("<div/>",{class:"list-tab-text "+lists[i]["color"]+"-bg"})
                .append($("<h4/>",{text: lists[i]["title"]}))
            ).append($("<div/>",{class:"arrow-right "+lists[i]["color"]}));

        if (i === 0 && $(".list-tab.active").length === 0) tab.addClass("active");
        tabs.append(tab);
    }
    $(".list-tab").droppable({
        tolerance: 'pointer',
        activeClass: 'ui-droppable-accept',
        drop: function(event, ui) {
            var item = $(ui.draggable);
            var newListId = $(event.target).attr("id");
            var oldListId = item.closest(".list-container").attr("id");

            cancelDrop = newListId === oldListId ? true : false;
            if (!cancelDrop) {
                saveItemChanges();
                moveList(item,oldListId,newListId);
            }
        }
    });

    // Add new list button after making the other tabs accept droppable
    tabs.append(
        $("<div/>",{class: "list-tab new"})
        .append($("<div/>",{class: "list-tab-text"})
            .append($("<span/>",{class: "glyphicon glyphicon-plus pastel-green"}))
        ).append($("<div/>",{class: "arrow-right"}))
    );
}

function populateItems(items) {
    var tabIndex = findTabIndex(activeList);
    var title = collectionLists[tabIndex]["title"];
    var fieldSpec = collectionLists[tabIndex]["fields"];
    var listItems = items[activeList];

    $("div.lists")
    .append($("<div/>",{class: "row"})
        .append($("<div/>",{id: activeList,class: "list-container"})
            .append($("<h3/>",{text:title, class: "col-sm-offset-1"}))
            .append($("<div/>",{class: "list"}))
    ));

    // Create header
    var listObj = $(".list-container#"+activeList).children("div.list");
    listObj.append(getHeader(fieldSpec));
    // Initiate Listeners
    initiateListListeners(activeList,title,listObj);

    for (var i=0;i<listItems.length;i++) {
        var row = $("<div/>",{class: "row item"});
        row.append(getStandardRowButtons(activeList));

        for (var j=0;j<fieldSpec.length;j++) {
            var field = fieldSpec[j];
            var column = $("<div class=\"col-md-"+field["width"]+" data\"/>");

            jQuery(" <span/>", {
                id: field["id"],
                text: listItems[i][field["id"]]
            }).appendTo(column);

            row.append(column);
        }
        listObj.append(row);
    }

    // Create the quick add row
    var quickAdd = jQuery("<div class=\"row item new-item\"/>");
    // Add the quick add button to the row
    quickAdd.append($("<div/>",{class: "col-md-2 buttons"}).append(getButton("plus","green").addClass("edit start")));
    for (var j=0;j<fieldSpec.length;j++) {
        var field = fieldSpec[j];
        var column = $("<div/>",{class: "data col-md-"+field["width"]});
        column.append($("<span/>",{id: field["id"]})).appendTo(quickAdd);
    }
    listObj.append(quickAdd);
    listObj.sortable({
        tolerance: "pointer",
        items: ".item:not(.new-item)",
        start: function(event,ui) {
            cancelDrop = false;
        },
        beforeStop: function(event,ui) {
            // Because beforeStop cannot call $(this).sortable('cancel') without
            // errors and because out is called between beforeStop() and stop()
            // (and thus causing the drop to always be canceled even if it
            // shouldn't be), use the beforeStop() method to set a cancelDropFinal
            // variable that stop() will use to know if the drop should be 
            // canceled or not
            if (cancelDrop) cancelDropFinal = true;
        },
        stop: function(event,ui) {
            // Use the final flag from beforeStop to know whether the drag event
            // should be canceled or not
            if (cancelDropFinal) $(this).sortable('cancel');
            cancelDropFinal = false;
            resetDisabledArrows(activeList);
        },
        out: function(event,ui) {
            cancelDrop = true;
        },
        over: function(event,ui) {
            cancelDrop = false;
        }
    });

    resetDisabledArrows(activeList);
}

function loadNewCollection() {
    $.getJSON("items.json", function(data) {
        // Populate lists with the items saved in collection lists and items
        var collectionId = $(".tabs#collections li.active").attr("id");
        collectionLists = data.lists[collectionId];
        collectionItems = data.items[collectionId];

        populateLists(collectionLists);
        $(".list-tab").first().addClass("active");
        activeList = $(".list-tab.active").attr("id");
        populateItems(activeList);
    });
}

/* Edit initalization*/

function initializeEdit() {
    for (var i=0;i<collectionLists.length;i++) {
        populateEditRow(collectionLists[i]);
        initializeEditListeners(collectionLists[i]["id"]);
    }

    $(".lists").sortable({
        tolerance: "pointer",
        items: ".list-container.edit",
        start: function(event, ui){
            ui.placeholder.height(ui.item.height());
        }
    });
}

function populateEditRow(list) {
    var fields = list["fields"]; var fieldsLen = fields.length;

    // Create the title row
    var titleRow = $("<div/>",{class: "row title"})
        .append($("<h3/>",{class: "col-md-offset-1 col-md-5",text: list["title"]}));

    // Initialize the variables/first column for size/color row, name row, and id row
    var sizeRow = $("<div/>",{class: "row sizes"})
    sizeRow.append($("<div/>",{class: "col-md-2"})
            .append($("<h4/>",{text: "Color: "})
                .append(getColorSelect().val(list["color"]))));

    var nameRow = $("<div/>",{class: "row names"})
    nameRow.append($("<div/>",{class: "col-md-2 "+list["color"]+"-bg"})
        .append($("<h4/>",{class: "tab-name"})
            .append($("<input/>",{type: "text", value: list["title"]}))));

    var idRow = $("<div/>",{class: "row ids"});
    idRow.append($("<div/>",{class: "col-md-2"})
        .text(" Modify Field Ids when Field Name edited?")
        .prepend($("<input/>",{type: "checkbox",id:"auto-modify-ids"}).prop("checked",true)));

    // Get the sum of all the field sizes
    var totalFieldSize = 0;
    for (var i=0;i<fieldsLen;i++) {
        totalFieldSize += parseInt(fields[i]["width"]);
    }

    for (var i=0;i<fieldsLen;i++) {
        var field = fields[i];
        var fieldSize = field["width"];
        // Size row
        sizeRow.append($("<div/>",{class:"column col-md-"+fieldSize, id: "field-"+(i+1)})
            .append($("<h4/>",{text: "Size: "})
                .append(getFieldSizeSelect(parseInt(fieldSize),totalFieldSize).attr("id","size"))));

        // Name row
        nameRow.append($("<div/>",{class:"edit-column col-md-"+fieldSize, id: "field-"+(i+1)})
            .append($("<h4/>",{class: "column-name"})
                .append($("<input/>",{type: "text",value: field["name"]}))));

        // Id row
        idRow.append($("<div/>",{class:"edit-column col-md-"+fieldSize, id: "field-"+(i+1)})
            .append($("<h5/>",{class: "column-id field-id", text: field["id"]})));
    }

    if (totalFieldSize !== 10) nameRow.append($("<h4/>",{class: "add-column col-md-1"}).append(getButton("plus","green")));

    var editRow = $("<div/>",{class: "row"})
        .append($("<div/>",{id: list["id"], class: "edit list-container"})
            .append(titleRow)
            .append(sizeRow)
            .append(nameRow)
            .append(idRow)
        );

    $(".lists").append(editRow);
}

/*-----------------------------------------------------------------------------
* LISTENERS
*-----------------------------------------------------------------------------*/
/* Standard listeners */
$(document).on('click', '.tabs#collections li a', function(event) {
    var target = $(event.target);
    $(".tabs#collections li.active").removeClass("active");
    $(".tabs#collections li .edit-list").remove();

    target.parent("li").addClass("active");
    $(".tabs#collections li.active a").prepend($("<span/> ",{class: "glyphicon glyphicon-pencil edit-list"}));
    activeCollection = $(".tabs#collections li.active").attr("id");

    $(".lists").empty();
    $(".list-tabs").empty();
    loadLists(activeCollection)
        .then(function(lists) {
            activeList = lists[0]["id"];
            loadItems(activeCollection); 
        })
    $(this).blur();
});

$(document).on('click', '.list-tab', function(event) {
    var target = $(event.target);
    while (target && !target.hasClass("list-tab")) {
        target = target.parent();
    }
    if (target.hasClass("new")) return showListCreateDialog();

    // save the list changes before switching lists
    saveItemChanges();
    // empty out the list
    $(".lists").empty();
    $(".list-tab.active").removeClass("active");
    // populate the new list
    target.addClass("active");
    activeList = target.attr("id");
    populateItems(collectionItems);
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

/* Edit listeners */
$(document).ready(function() {
    $("ul#collections").on("click",".accept-edit",function(event) {
        event.stopPropagation();
        var editAction = $("<span/>",{class: "glyphicon glyphicon-pencil edit-list"});
        $(this).siblings("span.cancel-edit").remove();
        $(this).replaceWith(editAction);
        // Save the list changes
        saveListChanges();
        // Repopulate the list
        populateLists(collectionLists);
        $(".list-tab#"+activeList).addClass("active");
        $(".list-tabs").removeClass("hidden");
        $(".content.lists").empty();
        populateItems(collectionItems);
    });

    $("ul#collections").on("click",".cancel-edit",function(event) {
        event.stopPropagation();
        var editAction = $("<span/>",{class: "glyphicon glyphicon-pencil edit-list"});
        $(this).siblings("span.accept-edit").remove();
        $(this).replaceWith(editAction);
        populateLists(collectionLists);
        $(".list-tab#"+activeList).addClass("active");
        $(".list-tabs").removeClass("hidden");
        $(".content.lists").empty();
        populateItems(collectionItems);
    });

    $("ul#collections").on("click",".edit-list",function(event) {
        event.stopPropagation();
        var acceptCancelActions = $("<span/>",{class: "glyphicon glyphicon-remove red cancel-edit"})
                .add($("<span/>",{class: "glyphicon glyphicon-ok green accept-edit"}));
        $(this).replaceWith(acceptCancelActions);
        $(".list-tabs").addClass("hidden");
        $(".list-tabs").empty();
        $(".content.lists").empty();
        initializeEdit();
    });
});

function initializeEditListeners(listId) {
    var listContainer = $(".edit.list-container#"+listId);
    var list = null;
    for (var i=0;i<collectionLists.length;i++) {
        if (collectionLists[i]["id"] === listId) {
            list = collectionLists[i];
            break;
        }
    }

    listContainer.on("change","select#size",function(event) {
        // Get the field number (field-1,field-2,etc) and the new selected size
        // for the field
        var fieldNum = $(event.target).closest("div").attr("id");
        var fieldIndex = parseInt(fieldNum.replace(/field-/,''))-1;
        var selected = $(event.target).val();

        // Change the sizes of all field col divs to the new size
        listContainer.find("div#"+fieldNum).each(function() {
            $(this).attr("class",function (i, c) {
                if (!c) return; // protect against no class
                return c.replace(/col-md-\d+/, 'col-md-'+selected);
            });
        });

        // Update all the size dropdowns to account for the new total size
        // Get the sum of all the field sizes
        var totalFieldSize = 0;
        listContainer.find("select#size").each(function() {
            totalFieldSize += parseInt($(this).val());
        });
        // Update the field sizes
        listContainer.find("select#size").each(function() {
            $(this).replaceWith(getFieldSizeSelect(parseInt($(this).val()),totalFieldSize).attr("id","size"));
        });

        if (totalFieldSize < 10 && listContainer.find("h4.add-column").length === 0) {
            listContainer.find(".row.names").append($("<h4/>",{class: "add-column col-md-1"}).append(getButton("plus","green")));
        } else if (totalFieldSize === 10 && $("h4.add-column").length !== 0) {
            listContainer.find("h4.add-column").remove();
        }
    });

    listContainer.on("click","h4.add-column",function(event) {
        if ($(event.target).prop("tagName") !== "BUTTON") return;

        var totalFieldSize = 0;
        listContainer.find("select#size").each(function() {
            totalFieldSize += parseInt($(this).val());
        });

        // If the total field size is 8 or less, create a field with a size of 2
        // If the total field size is 9, create a field with a size of 1
        // If the total field size is 10, ignore
        var fieldSize;
        if (totalFieldSize < 9) { fieldSize = 2; totalFieldSize += 2 }
        else if (totalFieldSize === 9) { fieldSize = 1; totalFieldSize += 1; }
        else { return; }

        // Remove the add button
        listContainer.find("h4.add-column").remove();

        var fieldNum = "field-"+(listContainer.find("select#size").length+1);

        // Size row
        listContainer.find(".row.sizes").append($("<div/>",{class:"column col-md-"+fieldSize, id: fieldNum})
            .append($("<h4/>",{text: "Size: "})
                .append(getFieldSizeSelect(parseInt(fieldSize),totalFieldSize).attr("id","size"))));

        // Name row
        listContainer.find(".row.names").append($("<div/>",{class:"edit-column col-md-"+fieldSize, id: fieldNum})
            .append($("<h4/>",{class: "column-name"})
                .append($("<input/>",{type: "text"}))));

        // Id row
        listContainer.find(".row.ids").append($("<div/>",{class:"edit-column col-md-"+fieldSize, id: fieldNum})
            .append($("<h5/>",{class: "column-id field-id"})));

        // If the field size is still under 10, append the add column button
        if (totalFieldSize<10) listContainer.find(".row.names").append($("<h4/>",{class: "add-column col-md-1"}).append(getButton("plus","green")));

        // Update the possible field sizes for the list rows
        listContainer.find("select#size").each(function() {
            $(this).replaceWith(getFieldSizeSelect(parseInt($(this).val()),totalFieldSize).attr("id","size"));
        });
    });

    listContainer.on("change","select#color",function() {
        var color = $(this).val();
        // Change the tab background color
        listContainer.find(".row.names div").first().attr("class",function (i, c) {
            if (!c) return; // protect against no class
            return c.replace(/\s.*?-bg/, " "+color+"-bg");
        });
    });

    listContainer.on("keyup",".tab-name input", function() {
        listContainer.find(".title h3").text($(this).val());
    });

    listContainer.on("change","input#auto-modify-ids", function() {
        var checked = $(this).prop("checked");
        listContainer.find(".row.ids .column-id").each(function() {
            if (checked) {
                var text = $(this).children("input").val();
                $(this).html(text);
            } else {
                var text = $(this).text();
                $(this).html($("<input/>",{value: text}));
            }
        });
    });

    listContainer.on("keyup",".column-name input", function() {
        if (!listContainer.find("input#auto-modify-ids").prop("checked")) return;
        var columnId = $(this).closest(".edit-column").attr("id");
        var fieldIndex = parseInt(columnId.replace(/field-/,''))-1;
        var key = createKeyFromName($(this).val());
        listContainer.find(".row.ids #"+columnId+" h5").text(key);
    });
}

/*-----------------------------------------------------------------------------
* HELPER METHODS
*-----------------------------------------------------------------------------*/

/* Standard Helpers */
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

function showListCreateDialog() {
    // Create a form that will be used for inputting data for the new list
    var addListDiv = $("<div/>",{id: "addList",title:"Add List",class: "form-horizontal"});

    // Add List Name form group
    addListDiv.append($("<div/>",{class: "form-group"})
    .append($("<label/>",{for: "name",class:"col-sm-2 control-label",text: "Name"}))
    .append($("<div/>",{class:"col-sm-10"})
        .append($("<input/>",{type: "text",class: "form-control",id: "name",placeholder:"List Name"}))
    ));

    // Add Tab Color form group
    var selectInput = $("<select/>",{id: "color", class: "form-control"});
    for (var color in colorList) {
        if (!colorList.hasOwnProperty(color)) continue;
        selectInput.append($("<option/>",{value: color,text: colorList[color]}));
    }

    addListDiv.append($("<div/>",{class: "form-group"})
    .append($("<label/>",{for: "color",class:"col-sm-2 control-label",text: "Tab Color"}))
    .append($("<div/>",{class:"col-sm-10"})
        .append(selectInput)
    ));

    // Add first Field group
    addListDiv.append(getAddFieldGroup(1));
    
    // Add submit and add field buttons
    addListDiv.append($("<div/>",{class: "form-group buttons"}))
        .append($("<div/>",{class: "col-sm-offset-1 col-sm-2"})
            .append($("<button/>",{class: "btn btn-default create-list", text: "Create"})))
        .append($("<div/>",{class: "col-sm-offset-5 col-sm-2"})
            .append($("<button/>",{class: "btn btn-default add-field", text: "Add Field"})));

    $("body").append(addListDiv);
    $("#addList").dialog(
        {
            width:600,
            modal:true,
            close: function(event,ui) {
                $("#addList").remove();
            }
        }
    );

    var fieldNumber = 2;
    $("#addList").on('click','.add-field', function() {
        if (fieldNumber > 5) return;
        getAddFieldGroup(fieldNumber).insertBefore($("#addList .form-group.buttons"));
        fieldNumber += 1;
        // Disable the add field button if 5 fields have been added already
        if (fieldNumber > 5) $("#addList .add-field").addClass("disabled");
    });

    // Create the listener that will accumulate the data and then call the 
    // createList function
    $("#addList").on('click','.create-list', function() {
        // Create an empty error variable where error messages will be stored
        // if there are any
        var error = null;

        // Create a list of the field and check to see if any of the fields/sizes
        // are blank
        var fields = [];
        $(".field-group").each(function() {
            var fieldName = $(this).find("input").val();
            var size = $(this).find("select").val();
            if (fieldName === "" || size === "") { 
                error = "- A field currently has an empty 'Name' or 'Size'.";
                return;
            }
            var fieldId = createKeyFromName(fieldName);
            fields.push({"name": fieldName, "id": fieldId, "width": size})
        });

        // Retrieve the list name and color and check for errors
        var name = $("input#name").val();
        var color = $("select#color").val();

        var missingFields = [];
        if (name === "") missingFields.push("List Name");
        if (color === "") missingFields.push("Tab Color");
        if (missingFields.length != 0) {
            if (error !== null) error += "\n";
            error += "- The following required fields are missing: "+missingFields.join(", ")+".";
        }

        // Add an error message to the dialog if the error variable isn't still null
        if (error !== null) {
            var div = $("<div/>", {
                text:error,
                class:"alert alert-danger"
            }).insertBefore($("#addList .form-group").first());
            return;
        }

        // Create an id based off of the new name
        var id = createKeyFromName(name);
        // If there were no errors, create the list
        createList(name,id,color,fields);
        $("#addList").dialog("close");
        $(".list-tab#"+id).click();
    });
}

function createList(name,id,color,fields) {
    listObj = {
        "title": name,
        "id": id,
        "color": color,
        "fields": fields
    };
    collectionLists.push(listObj);
    collectionItems[id] = [];

    ($("<div/>",{id: id,class: "list-tab"})
        .append($("<div/>",{class:"list-tab-text "+color+"-bg"})
            .append($("<h4/>",{text: name}))
        ).append($("<div/>",{class:"arrow-right "+color}))
    ).insertBefore($(".list-tab.new"));
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

/* Edit helpers */
function getFieldSizeSelect(currentSize,totalSize) {
    var topSize = 10-totalSize+currentSize;
    var select = $("<select/>");
    for (var i=1;i<=topSize;i++) {
        if (i === currentSize) {
            select.append($("<option selected>"+i+"</option>"));
        } else {
            select.append($("<option/>",{text: i}));
        }
    }
    return select;
}

function getColorSelect() {
    var colorList = {"pastel-green": "Green", "pastel-red": "Red", "pastel-purple": "Purple", "pastel-orange": "Orange",
        "pastel-yellow": "Yellow", "pastel-blue": "Blue"};

    var selectInput = $("<select/>",{id: "color"});
    for (var color in colorList) {
        if (!colorList.hasOwnProperty(color)) continue;
        selectInput.append($("<option/>",{value: color,text: colorList[color]}));
    }

    return selectInput;
}

/* General helpers */

function findTabIndex(id) {
    return $(".list-tab").index($(".list-tab#"+id));
}

function createKeyFromName(name) {
    return name.replace(/[^\w\s]/gi, '').replace(" ","-").toLowerCase();
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
        header += "<div class=\"col-md-"+fieldSpec[i]["width"]+"\"><h4 class=\"header-name\">"+fieldSpec[i]["name"]+"</h4></div>";
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

/* Serialization helpers */
var saveListChanges = function() {
    var lists = [];
    $(".list-container.edit").each(function() {
        var list = {};
        list["title"] = $(this).find(".title").text();
        list["id"] = $(this).attr("id");
        list["color"] = $(this).find("select#color").val();
        var listContainerObj = $(this);
        var fields = [];
        $(this).find(".sizes .column").each(function() {
            var field = {};
            var fieldId = $(this).attr("id");
            field["name"] = listContainerObj.find(".names #"+fieldId+" input").val();
            if (listContainerObj.find("input#auto-modify-ids").prop("checked")) {
                field["id"] = listContainerObj.find(".ids #"+fieldId).text();
            } else {
                field["id"] = listContainerObj.find(".ids #"+fieldId+" input").val();
            }
            field["width"] = $(this).find("select#size").val();
            fields.push(field);
        });
        list["fields"] = fields;
        lists.push(list);
    });
    collectionLists = lists;
}

var saveItemChanges = function() {
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
    saveItemChanges();
    $.getJSON("items.json", function(data) {
        var collection = $(".tabs#collections li.active").attr("id");
        var json = data;
        json.lists[collection] = collectionLists;
        json.items[collection] = collectionItems;

        var data = {"db" : JSON.stringify(json), "fileName" : "items.json"};
        $.post( "write_db.php", data);
    });
}