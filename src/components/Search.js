import React from 'react'
import { Grid,Col,Row,Label } from 'react-bootstrap'
import { colorMap } from '../resources/js/utils'

class Search extends React.Component {  
  constructor(props, context) {
    super(props, context);

    this.nameId = Object.keys(props.collectionFields).find(fid => props.collectionFields[fid].name === "Name")
    this.platformId = Object.keys(props.collectionFields).find(fid => props.collectionFields[fid].name === "Platform")
    this.collectionItems = Object.keys(props.items).filter(iid => props.items[iid]["collection"] === props.collectionId)
    this.sortedItems = this.collectionItems.slice().sort((a,b) => {
      let columnA = props.items[a][this.nameId].toLowerCase();
      let columnB = props.items[b][this.nameId].toLowerCase();
      if (columnA < columnB) { return -1 }
      if (columnA > columnB){ return 1 }
      return 0
    })

    // Populate items
    this.state = {
      viewableSearchItems: this.sortedItems.slice()
    };
  }

  searchItems = (searchTerm) => {
    return this.sortedItems.filter(iid => {
      let item = this.props.items[iid]
      return item[this.nameId].toLowerCase().includes(searchTerm) ||
      item[this.platformId].toLowerCase().includes(searchTerm)
    })
  }

  render() {
    return (<Grid style={{float: 'left'}}>
      <Row>
        <Col mdOffset={1}>
          <h3>
            <input type="text" style={{width: '50%', fontSize: '18px', padding: '5px'}} 
              onKeyUp={(e) => this.setState({viewableSearchItems: this.searchItems(e.target.value.toLowerCase())})} />
          </h3>
        </Col>
      </Row>
      <SearchItems items={this.props.items} lists={this.props.lists} viewableItems={this.state.viewableSearchItems}
        nameId={this.nameId} platformId={this.platformId} />
    </Grid>)
  }
}
export default Search

const SearchItems = ({nameId,platformId,lists,items,viewableItems}) => (
  <div>{
    viewableItems.map(iid => {
      let item = items[iid]
      return (<Row key={iid}>
        <Col mdOffset={1} md={4}>
          {item[nameId]}
        </Col>
        <Col md={2}>
          {platformId === undefined ? null : item[platformId]}
        </Col>
        <Col>
          {item["lists"].map(list => {
            return (<Label key={iid+"label-"+list._id} style={{backgroundColor: colorMap[lists[list].color], color: 'black'}}>
              {lists[list].name}
            </Label>)
          })}
        </Col>
      </Row>)
    })
  }</div>
)