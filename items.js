var downArrow = " <button type=\"button\" id=\"down\" class=\"btn btn-default mvmt-inside-list\" aria-label=\"Down\"><span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span></button></li>";
var upArrow = " <button type=\"button\" id=\"up\" class=\"btn btn-default mvmt-inside-list\" aria-label=\"Up\"><span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span></button></li>";

// Populates the lists with a class of "list" and the id of the lists passed as a parameter
function populateLists(lists) {
    $.getJSON("items.json", function(data) {
        var listItems = {};
        for (var i=0;i<lists.length;i++) {
            listItems[lists[i]] = [];
        }

        var items = data["items"];
        var itemsLen = items.length;
        for (var j=0;j<itemsLen;j++) {
            var item = items[j];
            if (lists.indexOf(item["list"]) > -1) {
                listItems[item["list"]].push(item);
            }
        }

        // Add the items to the list
        for (var i=0;i<lists.length;i++) {
            var listId = lists[i];

            var stagedItems = listItems[listId];
            stagedItems.sort(function(a,b) {
                return a.listPos - b.listPos;
            });

            // Create move dropdown list to be used for this list type
            var moveList = "<div class=\"col-md-2\">"+
                "<div class=\"movement dropdown\">"+
                "<button type=\"button\" data-toggle=\"dropdown\" class=\"btn btn-default dropdown-toggle\">"+
                "<span class=\"glyphicon glyphicon-tasks\"></span>"+
                "</button>"+
                "<ul class=\"dropdown-menu\">";

            for (var z=0;z<lists.length;z++) {
                if (lists[z] != listId) {
                    moveList += "<li><a href=\"#\">"+lists[z]+"</a></li>";
                }
            }

            moveList += "</ul></div></div>";

            var itemsLen = stagedItems.length;
            var listElem =  $(".list-container#"+listId).children("div.list");
            listElem.append(listHeader());

            for (var j=0;j<itemsLen;j++) {
                var row = jQuery("<div class=\"row item\"/>");
                
                var title = jQuery("<div class=\"col-md-6\"/>");

                jQuery("<span/>", {
                    id: "title",
                    text: stagedItems[j].name
                }).appendTo(title);

                var arrows = "<div class=\"col-md-2\">"+upArrow+downArrow+"</span>";

                row.append(title);
                row.append(arrows);
                row.append(moveList);

                listElem.append(row);
            }

            // For each list, disable the first upArrow and the last downArrow
            listElem.find("div.item .mvmt-inside-list#up").first().addClass("disabled");
            listElem.find("div.item .mvmt-inside-list#down").last().addClass("disabled");
        }
    });
}

function listHeader() {
    return "<div class=\"row\">"+
        "<div class=\"col-md-6\"><h4>Title</h4></div>"+
        "<div class=\"col-md-2\"><h4>Order</h4></div>"+
        "<div class=\"col-md-2\"><h4>Move Lists</h4></div>"+
        "</div>";
}






