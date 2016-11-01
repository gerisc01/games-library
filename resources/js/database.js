/******************************************************************************
LOCAL JSON DB METHODS
******************************************************************************/

var LocalDB = function (fileLocation) {
    if (fileLocation === undefined) fileLocation = "/db/items.json";
    this.file = fileLocation;
    this.initalizeDb();
}

LocalDB.prototype.initalizeDb = function() {
    return $.post("resources/php/database/local/initialize.php","");
}

LocalDB.prototype.getCollections = function() {
    return $.ajax({
        cache: false,
        url: this.file,
        dataType: "json"
    })
    .then(function(data) { return data.collections; });
};

LocalDB.prototype.getLists = function(collection) {
    return $.ajax({
        cache: false,
        url: this.file,
        dataType: "json"
    })
    .then(function(data) { return data.lists[collection]; });
};

LocalDB.prototype.getItems = function(collection) {
    return $.ajax({
        cache: false,
        url: this.file,
        dataType: "json"
    })
    .then(function(data) { return data.items[collection]; });
};

LocalDB.prototype.updateCollectionContent = function(collectionId,lists,deletedListIds,items,deletedItemIds) {
    return $.ajax({
        cache: false,
        url: this.file,
        dataType: "json"
    }).then(function(data) {

        var json = data;
        if (lists !== undefined && lists !== null) {
            for (var i=0;i<lists.length;i++) {
                // Create an id for the list if it is new
                if (lists[i]["_id"] === undefined) {
                    var listId = guid();
                    lists[i]["_id"] = listId;
                    if (items !== null && items !== undefined) { 
                        items.push({listId: []}); 
                    } else {
                        json.items[collectionId][listId] = [];
                    }
                }
                // Delete the _edited key if it is in the list object
                delete lists[i]["_edited"];
            }
            json.lists[collectionId] = lists;
        }

        if (items !== undefined && items !== null) {
            for (var key in items) { if (items.hasOwnProperty(key)) {
                for (var i=0;i<items[key].length;i++) {
                    // Create an id for the list if it is new
                    if (items[key][i]["_id"] === undefined) {
                        var itemId = guid();
                        items[key][i]["_id"] = itemId;
                    }
                    // Delete the _edited key for each item
                    delete items[key][i]["_edited"];
                }
            }}
            json.items[collectionId] = items;
        }

        var data = {"db" : JSON.stringify(json), "fileName" : "db/items.json"};
        return $.post( "/resources/php/database/local/write.php", data);
    });
};

// Local DB helper methods
var guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/******************************************************************************
DATABASE DB METHODS
******************************************************************************/

var MongoDB = function (databaseUrl) {
    if (databaseUrl === undefined) databaseUrl = "mongodb://localhost:27017"
    this.db = databaseUrl;
    this.initalizeDb();
}

MongoDB.prototype.initalizeDb = function() {
    return $.post("/resources/php/database/mongo/initialize.php","");
};

MongoDB.prototype.getCollections = function() {
    return $.get("/resources/php/database/mongo/collections.php").then(function(data) { return data.collections; });
};

MongoDB.prototype.getLists = function(collection) {
    return $.get("/resources/php/database/mongo/lists.php",{"collection" : collection}).then(function(data) { return data.lists; });
};

MongoDB.prototype.getItems = function(collection) {
    return $.get("/resources/php/database/mongo/items.php",{"collection" : collection}).then(function(data) { return data.items; });
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
        url:"/resources/php/database/mongo/update.php",
        type:"POST",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8"
    });
};