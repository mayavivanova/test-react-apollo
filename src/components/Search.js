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

  onCountrySelect = (event) => { 
      this.setState({country: event.target.value})    
    
  };

  render() {
    return (
      <div className="search">
        <Query query={GET_COUNTRIES} client={this.props.client}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;
            return (
              <div>
                  <select 
                    value={this.state.country}
                    onChange = {this.onCountrySelect}>
                    {data.countries.map(country => (
                      <option 
                        key={country.code} 
                        value={country.code}>
                          {country.name}
                      </option>
                  ))}
                </select>                
              </div>
            );
          }}
        </Query>
        {this.state.country ? <Country countryCode={this.state.country}/> : null}
      </div>
    )    
  }
}

export default Search

Search.propTypes = {
  client: PropTypes.object,
  continentCode: PropTypes.string
}