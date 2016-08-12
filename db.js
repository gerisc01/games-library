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

};

MongoDB.prototype.getLists = function(collection) {

};

MongoDB.prototype.getItem = function(collection,list) {

};

MongoDB.prototype.updateCollectionContent = function(collectionId,lists,deletedListIds,items,deletedItemIds) {

};

MongoDB.prototype.updateCollections = function(collections,deletedIds) {

};

MongoDB.prototype.updateLists = function(lists,deletedIds) {

};

MongoDB.prototype.updateItems = function(items,deletedIds) {
    // Iterate through items
    // If the item has the tag of _edited, make the necessary edits
    // If the item index and order are different, make the update to the order
    // If an item doesn't already have an id, create the item in the db
    // Go through the list of deleted ids and delete the items
};