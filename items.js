function initializePage() {
    $.getJSON("items.json", function(data) {
        // Get list of collections and build tabs
        var collections = data.collections;
        for (var i=0;i<collections.length;i++) {
            var tab = jQuery("<li id=\""+collections[i]["id"]+"\"><a href=\"#\">"+collections[i]["title"]+"</a></li>");
            if (i == 0) tab.addClass("active");
            $(".tabs#collections").append(tab);
        }

        // Grab the active collection and build the lists and headers
        var collectionId = $(".tabs#collections li.active").attr("id");
        var lists = data.lists[collectionId];
        for (var i=0;i<lists.length;i++) {
            // Create a div for each list
            var list = "<div class=\"row\">"+
                "<div id=\""+lists[i]["id"]+"\" class=\"list-container\">"+
                    "<h3>"+lists[i]["title"]+"</h3>"+
                    "<div class=\"container list col-md-10\"></div>"+
                "</div>"+
            "</div>";
            $("div.lists").append(list);

            // Append list header
            $(".list-container#"+lists[i]["id"]).children("div.list")
                .append(getHeader());
        }

        // Populate lists with the items
        populateLists(data.items[collectionId]);
    });
}

function populateLists(lists) {
    for (var key in lists) { if (lists.hasOwnProperty(key)) {
        var items = lists[key];
        var itemsLength = lists[key].length;
        var list = $(".list-container#"+key).children("div.list");
        var listName = $(".list-container#"+key).children("h3").text();

        // // Sort items
        // var stagedItems = listItems[listId];
        // stagedItems.sort(function(a,b) {
        //     return a.listPos - b.listPos;
        // });

        for (var i=0;i<itemsLength;i++) {
            var row = jQuery("<div class=\"row item\"/>");
            
            var title = jQuery("<div class=\"col-md-6\"/>");

            jQuery("<span/>", {
                id: "title",
                text: items[i].name
            }).appendTo(title);

            row.append(title);
            row.append(getMoveArrows());
            row.append(getMoveButton(listName));

            list.append(row);
        }

        // disable the first and last arrow inside the list
        list.find("div.item .mvmt-inside-list#up").first().addClass("disabled");
        list.find("div.item .mvmt-inside-list#down").last().addClass("disabled");
    }}
}

var getMoveButton = function(listName) {
    var moveList = "<div class=\"col-md-2\">"+
        "<div class=\"movement dropdown\">"+
        "<button type=\"button\" data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\">"+
        "<span class=\"glyphicon glyphicon-tasks\"></span>"+
        "</button>"+
        "<ul class=\"dropdown-menu\">";

    $(".list-container h3").each(function() {
        if ($(this).text() !== listName) moveList += "<li><a href=\"#\">"+$(this).text()+"</a></li>";
    });

    moveList += "</ul></div></div>";

    return moveList;
}

var getMoveArrows = function() {
    // Up Arrow
    return "<div class=\"col-md-2\">"+
    " <button type=\"button\" id=\"down\" class=\"btn btn-default mvmt-inside-list\" aria-label=\"Down\">"+
    "<span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>"+
    "</button>"+
    // Down Arrow
    " <button type=\"button\" id=\"up\" class=\"btn btn-default mvmt-inside-list\" aria-label=\"Up\">"+
    "<span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>"+
    "</button>"+
    "</div>";
}

function getHeader() {
    return "<div class=\"row\">"+
        "<div class=\"col-md-6\"><h4>Title</h4></div>"+
        "<div class=\"col-md-2\"><h4>Order</h4></div>"+
        "<div class=\"col-md-2\"><h4>Move Lists</h4></div>"+
        "</div>";
}






