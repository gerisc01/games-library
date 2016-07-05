// Populates the lists with a class of "list" and the id of the lists passed as a parameter
function populateLists(lists) {
    $.getJSON("items.json", function(data) {
        var listItems;
        for (var i=0;i<lists.length;i++) {
            listItems[lists[i]] = [];
        }

        var items = data["items"];
        var itemsLen = items.length;
        for (var j=0;j<itemsLen;j++) {
            var item = items[j];
            if (lists.indexOf(item["list"]) > -1) {
                listItems[item["list"]] = item;
            }
        }

        // Add the items to the list
        for (var i=0;i<lists.length;i++) {
            var listId = list[i];

            // sort and add lists to queue.html
            // items.sort(function(a,b) {
            //     return a - b;
            // });

        }
    });
}