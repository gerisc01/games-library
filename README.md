Media List
=============
This project was started as a goal to manage the backlog and keep track of the consumption of media. Written primarily in javascript with php being used for server side calls.

##Database

###Local
By default, this project uses a local JSON file (that should be created automatically upon the creation of your first collection/list) to store the list information.

###MongoDB
Optionally, there is support for the MongoDB database (although it has been tested far less, so YMMV). To enable MongoDB:
1. Run `php composer.phar install` (make sure the version of php you are using is also being used for your apache server)
2. At the top of *items.js*, replace `var database = LocalDB()` with `var database = MongoDB()`.
3. MongoDB by default runs to `mongodb://localhost:27017`. If you want to change this, you will need to change it in all the php files in the *resources/php/data/mongo* folder.

###General Database Structure
The general database structure (for all storage types) is as follows

**Table:** Collection
    - _id
    - order
    - name

**Table:** Lists
    - _id
    - collectionId
    - order
    - name
    - color
    - fields
        - _id
        - name
        - width

**Table:** Items
    - _id
    - listId
    - order
    - field_id 1
    - field_id 2
    - field_id 3
    - field_id (for as many field ids as needed for the list)