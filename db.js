/******************************************************************************
LOCAL JSON DB METHODS
******************************************************************************/

var LocalDB = function (fileLocation) {
    this.file = fileLocation;
}

LocalDB.prototype.getCollections = function() {
    return $.getJSON("items.json").then(function(data) { return data.collections; });
};

LocalDB.prototype.getLists = function(collection) {
    return $.getJSON("items.json").then(function(data) { return data.lists[collection]; });
};

LocalDB.prototype.getItems = function(collection) {
    return $.getJSON("items.json").then(function(data) { return data.items[collection]; });
};

LocalDB.prototype.updateCollectionContent = function(collectionId,lists,deletedListIds,items,deletedItemIds) {
    $.getJSON("items.json", function(data) {
        // before setting the items, iterate through them and strip out the
        // _edited variable before it gets committed to the json file
        for (var key in items) { if (items.hasOwnProperty(key)) {
            for (var i=0;i<items[key].length;i++) {
                delete items[key][i]["_edited"];
            }
        }}

        var json = data;
        json.lists[collectionId] = lists;
        json.items[collectionId] = items;

        var data = {"db" : JSON.stringify(json), "fileName" : "../../items.json"};
        $.post( "db/local/write.php", data);
    });
};

/******************************************************************************
DATABASE DB METHODS
******************************************************************************/

var MongoDB = function (databaseUrl) {
    this.db = databaseUrl;
}

MongoDB.prototype.getCollections = function() {
    return $.get("/db/mongo/collections.php").then(function(data) { return data.collections; });
};

MongoDB.prototype.getLists = function(collection) {
    return $.get("/db/mongo/lists.php",{"collection" : collection}).then(function(data) { return data.lists; });
};

MongoDB.prototype.getItems = function(collection) {
    return $.get("/db/mongo/items.php",{"collection" : collection}).then(function(data) { return data.items; });
};

MongoDB.prototype.updateCollectionContent = function(collectionId,lists,deletedListIds,items,deletedItemIds) {
    // Iterate through lists to see which ones need to be updated in the db
    var editLists = [];
    for (var i=0;i<lists.length;i++) {
        if (lists[i]["_edited"] === true) {
            var list = lists[i];
            list["order"] = i+1;
            delete list["_edited"];
            editLists.push(list);
        }
    }

    // Iterate through items to see which ones need to be updated in the db
    var editItems = [];
    for (var key in items) { if (items.hasOwnProperty(key)) {
        for (var i=0;i<items[key].length;i++) {
            if (items[key][i]["_edited"] === true || items[key][i]["order"] !== i+1) {
                var item = items[key][i];
                item["collectionId"] = collectionId;
                item["listId"] = key;
                item["order"] = i+1;
                delete item["_edited"];
                editItems.push(item);
            }
        }
    }}

    var data = {"collection" : collectionId,"lists" : editLists, "items" : editItems, "deletedLists" : deletedListIds, "deletedItems" : deletedItemIds};

    return $.ajax({
        url:"/db/mongo/update.php",
        type:"POST",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8"
    });
};