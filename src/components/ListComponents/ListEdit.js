import React from 'react'
import ListTitleEdit from './ListTitleEdit'
import ListHeaderEdit from './ListHeaderEdit'
import ListOption from './ListOption'
import { Row,Col } from 'react-bootstrap'
import { CirclePicker } from 'react-color'
import { colorMap as cm} from '../../resources/js/utils'

class ListEdit extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.onChange = props.onChange;
    this.state = {
      name: props.list.name ? props.list.name : "",
      fields: props.list.fields ? props.list.fields : [],
      color: props.list.color,
      addToTop: props.list.addToTop ? props.list.addToTop : false
    };
    this.tabColors = [cm["pastel-green"],cm["pastel-purple"],cm["pastel-orange"],cm["pastel-red"],
    cm["pastel-yellow"],cm["pastel-blue"],cm["grey"]]
  }

  componentWillUpdate(props,state) {
    if (this.onChange) this.onChange(state);
  }

  onTitleChange = (value) => {
    this.setState({ name: value })
  }

  onColorChange = (colorInfo) => {
    const hexValue = colorInfo.hex
    Object.keys(cm).forEach(color => {
      if (cm[color].toLowerCase() === hexValue.toLowerCase()) {
        this.setState({ color: color })
      }
    })
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
        <Row>
          <Col mdOffset={1}>
            <CirclePicker color={cm[this.state.color]} colors={this.tabColors} onChangeComplete={this.onColorChange} width='auto'/>
          </Col>
        </Row>
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