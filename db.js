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

LocalDB.prototype.updateItems = function(items,updateMap) {

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

MongoDB.prototype.updateItems = function(items,updateMap) {

};