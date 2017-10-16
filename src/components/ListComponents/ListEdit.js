import React from 'react'
import ListTitleEdit from './ListTitleEdit'
import ListHeaderEdit from './ListHeaderEdit'
import ListOption from './ListOption'

class ListEdit extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.onChange = props.onChange;
    this.state = {
      name: props.list.name ? props.list.name : "",
      fields: props.list.fields ? props.list.fields : [],
      addToTop: props.list.addToTop ? props.list.addToTop : false
    };
  }

  componentWillUpdate(props,state) {
    if (this.onChange) this.onChange(state);
  }

  onTitleChange = (value) => {
    this.setState({ name: value })
  }

  onAddToTopChange = (value) => {
    this.setState({ addToTop: !this.state.addToTop })
  }

  onFieldChange = (index,name,value) => {
    if (index === undefined) {
      const rowWidth = this.state.fields.reduce((sum,field) => { return sum + parseInt(field.width,10)},0);
      this.setState({
        fields: this.state.fields.concat([{
          _id: value,
          width: rowWidth < 9 ? "2" : "1",
        }])
      })
    } else if (name === 'name') {
      this.setState({
        fields: this.state.fields.map((field,i) => {
          return index === i
            ? {...field, _id: value}
            : field
        })
      })
    } else if (name === 'width') {
      this.setState({
        fields: this.state.fields.map((field,i) => {
          return index === i
            ? {...field, width: value}
            : field
        })
      })
    } else if (name === 'delete') {
      this.setState({
        fields: this.state.fields.filter((field,i) => {
          return index !== i;
        })
      })
    }
  }

  render() {
    return (
      <div>
        <ListTitleEdit onEdit={(value) => this.onTitleChange(value)} title={this.state.name}  />
        <ListHeaderEdit
          onAdd={() => this.onFieldChange()}
          onEdit={(index,name,value) => this.onFieldChange(index,name,value)} 
          onDelete={(index) => this.onFieldChange(index,'delete')}
          onSave={() => this.props.onSave(this.state)}
          fields={this.state.fields}
          hasChanged={JSON.stringify(this.props.fields) !== JSON.stringify(this.state.fields) || 
            this.props.title !== this.state.name}
          collectionFields={this.props.collectionFields}/>
          <ListOption active={this.state.addToTop} onChange={this.onAddToTopChange}
            label="Add new items to top of the list" />
      </div> 
    )
  }
}

export default ListEdit