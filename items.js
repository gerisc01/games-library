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
    for (var i=0;i<lists.length;i++) {
        // Create a div for each list
        var list = "<div class=\"row\">"+
            "<div id=\""+lists[i]["id"]+"\" class=\"list-container\">"+
            "<div class=\"col-md-1\"></div>"+ // Put this div in to get a bit of space for the title
                "<h3>"+lists[i]["title"]+"</h3>"+
                "<div class=\"container list col-md-10\"></div>"+
            "</div>"+
        "</div>";
        $("div.lists").append(list);

        // Append list header
        $(".list-container#"+lists[i]["id"]).children("div.list")
            .append(getHeader());
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
            
            var title = jQuery("<div class=\"col-md-6\"/>");

            jQuery(" <span/>", {
                id: "title",
                text: listItems[i].name
            }).appendTo(title);

            row.append(movement);
            row.append(title);

            list.append(row);
        }

        var quickAdd = jQuery("<div class=\"col-md-2\"/>");
        quickAdd.append(" <button type=\"button\" class=\"btn btn-default quick-add add\"><span class=\"glyphicon glyphicon-plus green\"></span></button>");
        list.append(jQuery("<div class=\"row new-item\"/>").append(quickAdd));

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
    newItem.append("<div class=\"col-md-6\"><span id=\"title\"><input class=\"quick-add\"/></span></div>");

    target.replaceWith("<button type=\"button\" class=\"btn btn-default quick-add accept\"><span class=\"glyphicon glyphicon-ok green\"></span></button>"+
        " <button type=\"button\" class=\"btn btn-default quick-add cancel\"><span class=\"glyphicon glyphicon-minus red\"></span></button>");
});

$(document).on('click', '.quick-add.cancel', function(event) {
    var target = $(event.target);
    while (target && target.prop("tagName") !== "BUTTON") {
        target = target.parent();
    }
    var currentListId = target.closest("div.list-container").attr("id");

    var movement = jQuery("<div class=\"col-md-2\"/>");
    movement.append(" <button type=\"button\" class=\"btn btn-default quick-add add\"><span class=\"glyphicon glyphicon-plus green\"></span></button>");

    var newItem = target.closest(".new-item");
    newItem.empty();
    newItem.append(movement);
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

    var quickAdd = jQuery("<div class=\"col-md-2\"/>");
    quickAdd.append(" <button type=\"button\" class=\"btn btn-default quick-add add\"><span class=\"glyphicon glyphicon-plus green\"></span></button>");
    list.append(jQuery("<div class=\"row new-item\"/>").append(quickAdd));
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

    moveList += "</ul></div>";

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

function getHeader() {
    return "<div class=\"row\">"+
        "<div class=\"col-md-2\"></div>"+
        "<div class=\"col-md-6\"><h4>Title</h4></div>"+
        "</div>";
}






