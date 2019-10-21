import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Countries from './Countries'

class Search extends Component {

  state = {
    continentCode: this.props.continentCode,
    searchText: ''
  }

  onSearch = () => {
    return this.state.searchText ? <Countries searchText={this.state.searchText} continentCode={this.state.continentCode}/> : null
  }

  render() {
    return (
      <div className="search">
        <input  
          type='text'
          onChange={(event) => this.setState({searchText: event.target.value})}
          placeholder='Search...'/>
          <button onClick={this.onSearch}>Search Now</button>
      </div>
    )    
  }
}

export default Search

Search.propTypes = {
  client: PropTypes.object,
  continentCode: PropTypes.string
}