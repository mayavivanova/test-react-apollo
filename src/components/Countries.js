import React, { Component } from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Country from './Country'
import PropTypes from 'prop-types'

const GET_COUNTRIES_PER_CONTINENT = gql`
  query Continent ($code: String!) {
    continent (code: $code) {
      countries {
        code,
        name
      }
    }
  }
`;
  
class Countries extends Component {

  state = {
    countryCode: ''
  }
  
  onCountrySelect = (event) => {      
    this.setState({countryCode: event.target.className})
  };

  render() {
    const code = {code: this.props.continentCode}
    
    return (
      <div>
        <Query query={GET_COUNTRIES_PER_CONTINENT} client={this.props.client} variables={code}>        
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;

            const countriesToRender = data.continent.countries
            const { countryCode } = this.state

            const countriesEl = countriesToRender.map(country => (
              
                <li 
                  key={country.code}
                  className={country.code}
                  onClick={this.onCountrySelect}>
                    {country.name}
                    {countryCode === country.code ? <Country countryCode={countryCode}/>: null}
                </li>
            ))
            
            return (
              <div className="countries">
                <ul>
                    {countriesEl}                 
                </ul>
              </div>
            )
        }}
      </Query>
      
      </div>
    );
  }
}

export default Countries

Countries.propTypes = {
  client: PropTypes.object,  
  continentCode: PropTypes.string,
  searchText: PropTypes.string
}