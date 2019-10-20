import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
// import {Query} from 'react-apollo';
// import Country from './Country'

// const FEED_SEARCH_QUERY = gql`
//   query searchCountries ($searchText: String!) {
//     countries (filter: $searchText) {
//         code,
//         name
//     }
//   }
// `

const FEED_SEARCH_QUERY = gql`
query ($filter: String) {
    countries (fiter: {
        searchField: {
            contains: $filter
        }
    }) {
        code,
        name
    }
  }
`
const resolvers = {
    graphql(Countries, {
        options: data => ({
          fetchPolicy: 'cache-and-network'
        }),
        props: props => ({
            onSearch: filter => {
                filter = filter.toLowerCase()
              return props.data.fetchMore({
                query: filter === '' ? countries : FEED_SEARCH_QUERY,
                variables: {
                    filter
                },
                updateQuery: (previousResult, { fetchMoreResult }) => ({
                  ...previousResult,
                  listIceCreams: {
                    ...previousResult.cuntries,
                    items: fetchMoreResult.countries.items
                  }
                })
              })
            },
            data: props.data
          })
        })
      )(App);

class Search2 extends Component {

    state = {
        countries: [],
        searchText: ''
    }

    executeSearch = async () => {
          const { searchText } = this.state
            
          const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: searchText
          })
          console.log(result.variables)
          const countries = result.data.countries
          this.setState({ countries })
    }
        
        
    render() {
    

    return (
        <div>
        <div>
        <input  
            type='text'
            onChange={(e) => this.setState({searchText: e.target.value})}
            placeholder='Search...'/>
            <button onClick={() => this.executeSearch()}>Search Now</button>
        </div>
    </div>
    )    
    }
    
}

export default withApollo(Search2)