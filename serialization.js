var serializeLists = function(collection) {
    var json = {};
    $(".list-container").each(function() {
        var listId = $(this).attr("id");
        var listItems = [];
        $(this).find(".item").each(function() {
            if (!$(this).hasClass("new-item")) {
                var item = {};
                $(this).find(".data span").each(function() {
                    item[$(this).attr("id")] = $(this).text();
                });
                listItems.push(item);
            }
        });
        json[listId] = listItems;
    });
    return json;
}

var saveChangesToDb = function() {
    // Start by retrieving the items from the stored json list because only the
    // currently activated collection is available on the page
    $.getJSON("items.json", function(data) {
        var collection = $(".tabs#collections li.active").attr("id");
        var json = data;
        json.items[collection] = serializeLists(collection);

        var data = {"db" : json, "fileName" : "items.json"};
        $.post( "write_db.php", data, function(resp) {
          console.log(resp);
        });
    });
}