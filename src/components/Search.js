import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Country from './Country'

const FEED_SEARCH_QUERY = gql`
  query searchCountries ($filter: String!) {
    countries (filter: $filter) {
            code,
            name
    }
  }
`

class Search extends Component {

    state = {
      countries: [],
      filter: ''
    }
  onHandleChange = (event) => {
    this.setState({filter: event.target.value})
    console.log(this.state.filter)
  }

render() {
 

  return (
    <div>
      <div>
      <input  
          type='text'
          onChange={() => this.onHandleChange()}
          placeholder='Search...'/>
          <button onClick={() => this._executeSearch()}>Search Now</button>
      </div>
      {/* {this.state.countries.map((country, index) => (
          <Country
              key={country.id}
              country={country}
              index={index} />
      ))} */}
      
  </div>
  )    
}
_executeSearch = async () => {
  const { filter } = this.state
  const result = await this.props.client.query({
    query: FEED_SEARCH_QUERY,
    variables: { filter },
  })
  const countries = result.data.countries
  this.setState({ countries })
}
}

export default withApollo(Search)