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

LocalDB.prototype.createCollection = function(collectionName) {
    return $.ajax({
        cache: false,
        url: this.file,
        dataType: "json"
    }).then(function(data) {
        var json = data;
        var collectionId = guid();
        json.collections.push({"_id": collectionId,"name": collectionName,"order": (json.collections.length+1).toString()})
        json.lists[collectionId] = [];
        json.items[collectionId] = {};

        var data = {"db" : JSON.stringify(json)};
        return $.post( "/resources/php/database/local/write.php", data);
    });
}

LocalDB.prototype.updateCollection = function(collectionId,collectionName) {
    return $.ajax({
        cache: false,
        url: this.file,
        dataType: "json"
    }).then(function(data) {
        var json = data;

        var data = {"db" : JSON.stringify(json)};
        return $.post( "/resources/php/database/local/write.php", data);
    });
}

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

        var data = {"db" : JSON.stringify(json)};
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

/******************************************************************************
GIST DB METHODS
******************************************************************************/

var GistDB = function (username,fileName) {
    this.username = "gerisc01";
    this.gistId = "6f6097e90c5d7e05a67fbe20068d2340";
    this.fileName = "games-library.db";
    this.gistDbUrl;
}

GistDB.prototype.initalizeDb = function() {
    return this.retrieveRawUrl();
};

GistDB.prototype.getCollections = function() {
    return $.ajax({
        cache: false,
        url: this.gistDbUrl,
        dataType: "json"
    })
    .then(function(data) {
        return data.collections;
    });
};

GistDB.prototype.getLists = function(collection) {
    return $.ajax({
        cache: false,
        url: this.gistDbUrl,
        dataType: "json"
    })
    .then(function(data) { return data.lists[collection]; });
};

GistDB.prototype.getItems = function(collection) {
    console.log(this.gistDbUrl);
    return $.ajax({
        cache: false,
        url: this.gistDbUrl,
        dataType: "json"
    })
    .then(function(data) { return data.items[collection]; });
};

GistDB.prototype.updateCollectionContent = function(collectionId,lists,deletedListIds,items,deletedItemIds) {
    var thisGistDb = this;
    return $.ajax({
        cache: false,
        url: this.gistDbUrl,
        dataType: "json"
    }).then(function(data) {

        var json = data;
        if (lists !== undefined && lists !== null) {

            for (var i=0;i<lists.length;i++) {
                // Create an id for the list if it is new
                if (lists[i]["_id"] === undefined) {
                    var listId = guid();
                    lists[i]["_id"] = listId;
                    // A new list needs to add the an empty item list in the items object
                    if (items !== undefined && items !== null) {
                        // If items was passed, add that new list to the passed items object
                        items[listId] = [];
                    } else {
                        // If no items were passed, add that new list to the json items
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

        var data = {"db" : JSON.stringify(json), "id" : thisGistDb.gistId, "name" : thisGistDb.fileName}
        return $.post( "/resources/php/database/gist/write.php", data)
        .then(function() { return json; });
    });
};

GistDB.prototype.retrieveRawUrl = function() {
    var thisGistDb = this;
    return $.ajax({
        cache: false,
        url: "https://api.github.com/gists/"+this.gistId,
        dataType: "json",
        success: function(data) {
            // Get the raw url for games-library.db and save it in gistDbUrl to make calls faster in the
            // future.
            var rawUrl = data["files"][thisGistDb.fileName]["raw_url"];
            thisGistDb.gistDbUrl = rawUrl;
        },
        error: function() {
            // TODO - If the file doesn't exist, create a new empty db file
        }
    });
}

GistDB.prototype.updateGist = function(content,apiKey) {
    var updateData = {};
    updateData["files"] = {};
    updateData["files"][dbFileName] = {"content" : JSON.stringify(content)};

    var gistPatchUrl = "https://api.github.com/gists/"+this.gistId;
    return $.ajax({
      url : gistPatchUrl,
      data : JSON.stringify(updateData),
      headers : {
        "Authorization" : "Bearer "+apiKey
      },
      type : 'PATCH',
      contentType : 'application/json',
      processData: false,
      dataType: 'json'
    });
};