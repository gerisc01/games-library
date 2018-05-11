import React from 'react'
import { Header,Title} from './ListComponents'
import { Grid,Row,Col } from 'react-bootstrap'
import { CirclePicker } from 'react-color'
import { colorMap as cm} from '../resources/js/utils'

class ListEdit extends React.Component {  
  constructor(props, context) {
    super(props, context);
    this.onChange = props.onChange;
    this.state = {
      name: props.name || "",
      fields: props.fields || [],
      color: props.color || "grey",
      addToTop: props.addToTop || false,
      defaultSort: props.defaultSort || {}
    };
    this.tabColors = [cm["pastel-green"],cm["pastel-purple"],cm["pastel-orange"],cm["pastel-red"],
    cm["pastel-yellow"],cm["pastel-blue"],cm["grey"]]
  }

  componentWillReceiveProps(nextProps) {
    if (this.onChange) this.onChange(this.state);
    this.setState({
      name: nextProps.name || "",
      fields: nextProps.fields || [],
      color: nextProps.color || "grey",
      addToTop: nextProps.addToTop || false,
      defaultSort: nextProps.defaultSort || {}
    })
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
    } else if (name === 'sort') {
      if (this.state.fields[index]._id !== this.state.defaultSort.id) {
        this.setState({defaultSort: {
          id: this.state.fields[index]._id, order: "asc"
        }})
      } else if (this.state.defaultSort.order === "desc") {
        this.setState({defaultSort: {}})
      } else {
        this.setState({defaultSort: {
          id: this.state.fields[index]._id,
          order: !this.state.defaultSort.order ? "asc" : "desc"
        }})
      }
    }  else if (name === 'delete') {
      this.setState({
        fields: this.state.fields.filter((field,i) => {
          return index !== i;
        })
      })
    }
  }

  render() {
    const headerProps = {
      editing:          true,
      fields:           this.state.fields,
      collectionFields: this.props.collectionFields,
      defaultSort:      this.state.defaultSort,
      onEdit:           (index,name,value) => this.onFieldChange(index,name,value),
      onAdd:            () => this.onFieldChange(),
      onSave:           () => this.props.confirmListChanges(this.state),
      onDelete:         (index) => this.onFieldChange(index,'delete'),
      onSort:           (index) => this.onFieldChange(index,'sort'),
      hasChanged:       JSON.stringify(this.props.fields) !== JSON.stringify(this.state.fields) || 
                        this.props.name !== this.state.name || this.props.color !== this.state.color
                        || JSON.stringify(this.props.defaultSort) !== JSON.stringify(this.state.defaultSort)
    }
    return (
      <Grid style={{float: 'left'}}>
        <Row>
          <Col mdOffset={1}>
            <CirclePicker color={cm[this.state.color]} colors={this.tabColors} onChangeComplete={this.onColorChange} width='auto'/>
          </Col>
        </Row>
        <Title editing={true} onEdit={(value) => this.onTitleChange(value)} title={this.state.name}  />
        <Header {...headerProps} />
        <ListOption active={this.state.addToTop} label="Add new items to top of the list"
          onChange={this.onAddToTopChange} />
      </Grid>
    )
  }
}
export default ListEdit

const ListOption = ({ active,label,onChange }) => {
  return (
    <Row>
      <Col mdOffset={1}>
        <h4><input type="checkbox" checked={active} onChange={onChange} /> {label}</h4>
      </Col>
    </Row>
  )
}