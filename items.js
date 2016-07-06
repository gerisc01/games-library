var downArrow = " <button type=\"button\" class=\"btn btn-default\" aria-label=\"Down\"><span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span></button></li>";
var upArrow = " <button type=\"button\" class=\"btn btn-default\" aria-label=\"Up\"><span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span></button></li>";

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

            var itemsLen = stagedItems.length;
            var listElem =  $(".list#"+listId).children("ul");
            for (var j=0;j<itemsLen;j++) {
                var li = jQuery("<li/>");

                jQuery("<span/>", {
                    id: "title",
                    text: stagedItems[j].name
                }).appendTo(li);

                li.append(upArrow);
                li.append(downArrow);

                listElem.append(li);

                console.log(stagedItems[j].name + " : " + stagedItems[j].listPos);
            }
        }
    });
}