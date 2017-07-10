{
    collections: {
        items: LIST (COLLECTIONS),
        active: STRING (ID),
    },
    lists: {
        items: LIST (LISTS),
        active: STRING (ID),
    },
    items: {
        items: LIST (ITEMS),
        editing: STRING (ID)
    }
}