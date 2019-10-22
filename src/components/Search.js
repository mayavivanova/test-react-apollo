import React, { Component } from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import PropTypes from 'prop-types'
import Country from './Country'

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

class Search extends Component {

  state = {
    country: ''
  }

  render() {
    return (
      <div className="search">
        <Query query={GET_COUNTRIES} client={this.props.client}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;

            return (
              <div>
                <input
                  type="text"
                  placeholder="Search by country name"
                  onChange={(event) => this.setState({country: event.target.value})}/>
                 {data.countries.map(country => {
                    if (this.state.country && country.name === this.state.country)
                      return <Country countryCode={country.code} key={country.code}/>
                    else return null
                  })}
              </div>
            );
          }}
        </Query>
      </div>
    )    
  }
}

export default Search

Search.propTypes = {
  client: PropTypes.object,
  continentCode: PropTypes.string
}