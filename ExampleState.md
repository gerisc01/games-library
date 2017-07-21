{
    collections: {
        items: LIST (COLLECTIONS),
        active: STRING (ID),
    },
    lists: {
        items: LIST (LISTS),
        active: STRING (ID),
        isAdding: BOOLEAN
    },
    items: {
        items: LIST (ITEMS),
        editing: STRING (ID),
        isAdding: BOOLEAN
    }
}