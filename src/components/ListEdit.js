import React from 'react'
import { ListTitle,ListHeader } from './ListComponents'
import { ItemRow } from './ItemComponents'
import { Grid } from 'react-bootstrap'

class ListEdit extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: props.title ? props.title : "",
      fields: props.fields ? props.fields : []
    };
  }

  onTitleChange = (value) => {
    this.setState({ title: value })
  }

  onFieldChange = (fieldId,value) => {
    if (fieldId) {
      this.setState = {
        fields: this.state.fields.map(field => {
          return field.id === fieldId
            ? {...field, name: value}
            : field
        })
      }
    } else {
      // Add a new field
    }
  }

  render() {
    <div style={listStyle}>
      <Grid>
        <ListTitle onEdit={(value) => onTitleChange(value)} title={title}  />
        <ListHeader onEdit={(fieldId,value) => onFieldChange(fieldId,value)} fields={fields} />
      </Grid>
    </div>
  }
}

const listStyle = {
  float: 'left',
}

export default ListEdit