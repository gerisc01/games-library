/******************************************************************************
LOCAL JSON DB METHODS
******************************************************************************/

var LocalDB = function (fileLocation) {
    this.file = fileLocation;
}

LocalDB.prototype.getCollections = function() {
    $.getJSON("items.json", function(data) {
        populateCollections(data.collections);
    });
};

LocalDB.prototype.getLists = function(collection) {
    $.getJSON("items.json", function(data) {
        populateLists(data.lists[collection]);
    });
};

LocalDB.prototype.getItem = function(collection,list) {
    $.getJSON("items.json", function(data) {
        populateItems(data.items[collection]);
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