import uuid from 'uuid'
import { types } from '../actions'

const lists = (state = {items: {}, fields: {}, order: [], active: null}, action) => {
  switch (action.type) {
    case types.FETCH_LISTS:
      const order = action.data.order && action.data.order[action.collectionId] ? action.data.order[action.collectionId] : []
      return {
        items: action.data.items,
        fields: action.data.fields,
        order: order,
        active: order && order.length !== 0 ? order[0] : undefined
      }
    case types.SET_ACTIVE_LIST:
      return {
        ...state,
        items: state.items,
        active: action.id
      }
    case types.CREATE_LIST:
      let listId = uuid()
      let newCreateFields = {}
      let listCreateFields = []

      action.list.fields.forEach(field => {
        let fieldId = getFieldId(field.name,state.fields)
        if (!fieldId) {
          fieldId = uuid()
          newCreateFields[fieldId] = {_id: fieldId, name: field.name}
        }
        listCreateFields.push({
          _id: fieldId,
          width: field.width
        })
      })
      let list = {_id: listId, ...action.list, fields: listCreateFields}
      return {
        ...state,
        items: {...state.items, [listId]: list},
        fields: Object.assign(newCreateFields,state.fields),
        order: state.order.concat(listId),
        active: listId
      }
    case types.UPDATE_LIST:
      let newEditFields = {}
      let listEditFields = []

      action.list.fields.forEach(field => {
        let fieldId = getFieldId(field.name,state.fields)
        if (!fieldId) {
          fieldId = uuid()
          newEditFields[fieldId] = {_id: fieldId, name: field.name}
        }
        listEditFields.push({
          _id: fieldId,
          width: field.width
        })
      })

      let updatedItem = Object.assign({},state.items[action.list._id],{...action.list, fields: listEditFields})
      return {
        ...state,
        items: {...state.items, [action.list._id]: updatedItem},
        fields: Object.assign(newEditFields,state.fields),
      }
    case types.UPDATE_LIST_ORDER:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}

const getFieldId = (fieldName,fields) => {
  return Object.keys(fields).find(key => {
    return fields[key].name === fieldName
  })
}

export default lists;