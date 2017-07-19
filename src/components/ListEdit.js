import React from 'react'
import { ListTitleEdit,ListHeaderEdit } from './ListComponents'
import { ItemRow } from './ItemComponents'
import { Grid } from 'react-bootstrap'

class ListEdit extends React.Component {  
  constructor({ title,fields }, context) {
    super({ title,fields }, context);
    this.state = {
      title: title ? title : "",
      fields: fields ? fields : [{
        id: "column1",
        name: "Column 1",
        width: "3"
      }]
    };
  }

  onSave = () => {
    
  }

  onTitleChange = (value) => {
    this.setState({ title: value })
  }

  onFieldChange = (id,name,value) => {
    if (id && name === 'name') {
      this.setState({
        fields: this.state.fields.map(field => {
          return field.id === id
            ? {...field, name: value}
            : field
        })
      })
    } else if (id && name === 'width') {
      this.setState({
        fields: this.state.fields.map(field => {
          return field.id === id
            ? {...field, width: value}
            : field
        })
      })
    } else if (id && name === 'delete') {
      this.setState({
        fields: this.state.fields.filter(field => {
          return field.id !== id;
        })
      })
    } else if (!id) {
      const rowWidth = this.state.fields.reduce((sum,field) => { return sum + parseInt(field.width,10)},0);
      this.setState({
        fields: this.state.fields.concat([{
          id: "column"+(this.state.fields.length+1),
          name: "",
          width: rowWidth < 9 ? "2" : "1",
        }])
      })
    }
  }

  render() {
    return (
      <div style={listStyle}>
        <Grid>
          <ListTitleEdit onEdit={(value) => this.onTitleChange(value)} title={this.state.title}  />
          <ListHeaderEdit 
            onSave={undefined}
            onAdd={() => this.onFieldChange()}
            onEdit={(id,name,value) => this.onFieldChange(id,name,value)} 
            onDelete={(id) => this.onFieldChange(id,'delete')}
            fields={this.state.fields} />
        </Grid>
      </div>
    )
  }
}

const listStyle = {
  float: 'left',
}

export default ListEdit