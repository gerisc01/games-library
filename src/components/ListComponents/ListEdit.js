import React from 'react'
import ListTitleEdit from './ListTitleEdit'
import ListHeaderEdit from './ListHeaderEdit'

class ListEdit extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.onChange = props.onChange;
    this.state = {
      name: props.list.name ? props.list.name : "",
      fields: props.list.fields ? props.list.fields : []
    };
  }

  componentWillUpdate(props,state) {
    if (this.onChange) this.onChange(state);
  }

  onTitleChange = (value) => {
    this.setState({ name: value })
  }

  onFieldChange = (id,name,value) => {
    if (id && name === 'name') {
      this.setState({
        fields: this.state.fields.map(field => {
          return field._id === id
            ? {...field, name: value}
            : field
        })
      })
    } else if (id && name === 'width') {
      this.setState({
        fields: this.state.fields.map(field => {
          return field._id === id
            ? {...field, width: value}
            : field
        })
      })
    } else if (id && name === 'delete') {
      this.setState({
        fields: this.state.fields.filter(field => {
          return field._id !== id;
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
      <div>
        <ListTitleEdit onEdit={(value) => this.onTitleChange(value)} title={this.state.name}  />
        <ListHeaderEdit 
          onAdd={() => this.onFieldChange()}
          onEdit={(id,name,value) => this.onFieldChange(id,name,value)} 
          onDelete={(id) => this.onFieldChange(id,'delete')}
          fields={this.state.fields} />
      </div> 
    )
  }
}

export default ListEdit