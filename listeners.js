/******************************************************************************
GENERAL LISTENERS
******************************************************************************/

var loadGeneralListeners = function() {

    $(document).on('click', '.save', function() {
         saveToDb();
    });

    $(document).on('mouseup', '.btn', function() {
        $(this).blur();
    });

};

/******************************************************************************
COLLECTION OBJECT LISTENERS
******************************************************************************/

var loadCollectionListeners = function () {
    $("ul#collections").on("click",".accept-edit",function(event) {
        event.stopPropagation();
        var editAction = $("<span/>",{class: "glyphicon glyphicon-pencil edit-list"});
        $(this).siblings("span.cancel-edit").remove();
        $(this).replaceWith(editAction);
        // Save the list changes
        saveListChanges();
        // Repopulate the list
        populateTabs();
        $(".list-tab#"+activeList).addClass("active");
        $(".list-tabs").removeClass("hidden");
        $(".content.lists").empty();
        populateList(activeList);
    });

    $("ul#collections").on("click",".cancel-edit",function(event) {
        event.stopPropagation();
        var editAction = $("<span/>",{class: "glyphicon glyphicon-pencil edit-list"});
        $(this).siblings("span.accept-edit").remove();
        $(this).replaceWith(editAction);
        populateTabs();
        $(".list-tab#"+activeList).addClass("active");
        $(".list-tabs").removeClass("hidden");
        $(".content.lists").empty();
        populateList(activeList);
    });

    $("ul#collections").on("click",".edit-list",function(event) {
        event.stopPropagation();
        var acceptCancelActions = $("<span/>",{class: "glyphicon glyphicon-remove red cancel-edit"})
                .add($("<span/>",{class: "glyphicon glyphicon-ok green accept-edit"}));
        $(this).replaceWith(acceptCancelActions);
        $(".list-tabs").addClass("hidden");
        $(".list-tabs").empty();
        $(".content.lists").empty();
        editList();
    });
}

/******************************************************************************
TAB OBJECT LISTENERS
******************************************************************************/

var loadTabListeners = function(tabContainer) {

    tabContainer.on('click', '.list-tab', function(event) {
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



}



/******************************************************************************
LIST OBJECT LISTENERS
******************************************************************************/

var loadItemListeners = function(itemContainer,listId,listName) {

    itemContainer.on('click', 'a.edit,.btn.edit.start', function(event) {
        event.preventDefault(); // To prevent <a> from clicking and redirecting
        var item = $(event.target).closest(".item");
        editItem(item);
    });

    itemContainer.on('click', '.edit.cancel', function(event) {
        var item = $(event.target).closest(".item");
        cancelEdit(item,listId);
    });

    itemContainer.on('click', '.edit.accept', function(event) {
        var item = $(event.target).closest(".item");
        acceptEdit(item,listId);
    });

    itemContainer.on('click', 'a.delete', function(event) {
        event.preventDefault(); // To prevent <a> from clicking and redirecting
        var item = $(event.target).closest(".item");
        // Delete Item
        item.remove();
    });

    itemContainer.on('click', 'a.moveList', function(event) {
        event.preventDefault(); // To prevent <a> from clicking and redirecting
        var target = $(event.target);
        var item = target.closest("div.item");
        var newListId = target.attr("id");
        
        moveList(item,listId,newListId);
    });

    itemContainer.on('addNewItem', function(event) {
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
        itemContainer.children("div.list").append(row);
    });

    itemContainer.on('click', '.item .shiftUp', function(event) {
        if (isButtonDisabled(event.target)) return;
        var item = $(event.target).closest(".item");
        item.insertBefore($(item.prev(".item")));
        resetDisabledArrows(listId);
    });

    itemContainer.on('click', '.item .shiftDown', function(event) {
        if (isButtonDisabled(event.target)) return;
        var item = $(event.target).closest(".item");
        item.insertAfter($(item.next(".item")));
        resetDisabledArrows(listId);
    });
}

