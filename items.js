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
        var listName = $(".list-container#"+key).children("h3").text();

        // // Sort items
        // var stagedItems = listItems[listId];
        // stagedItems.sort(function(a,b) {
        //     return a.listPos - b.listPos;
        // });

        for (var i=0;i<listItemsLength;i++) {
            var row = jQuery("<div class=\"row item\"/>");

            var movement = jQuery("<div class=\"col-md-2\"/>");
            movement.append(getMoveButton(listName));
            movement.append(getMoveArrows());
            
            var title = jQuery("<div class=\"col-md-6\"/>");

            jQuery(" <span/>", {
                id: "title",
                text: listItems[i].name
            }).appendTo(title);

            row.append(movement);
            row.append(title);

            list.append(row);
        }

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


// Helper Methods

var getMoveButton = function(listName) {
    var moveList = "<div class=\"movement dropdown\">"+
        "<button type=\"button\" data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\">"+
        "<span class=\"glyphicon glyphicon-tasks\"></span>"+
        "</button>"+
        "<ul class=\"dropdown-menu\">";

    $(".list-container h3").each(function() {
        if ($(this).text() !== listName) moveList += "<li><a href=\"#\">"+$(this).text()+"</a></li>";
    });

    moveList += "</ul></div>";

    return moveList;
}

var getMoveArrows = function() {
    // Up Arrow
    return " <button type=\"button\" id=\"down\" class=\"btn btn-default movement mvmt-inside-list\" aria-label=\"Down\">"+
    "<span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>"+
    "</button>"+
    // Down Arrow
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






