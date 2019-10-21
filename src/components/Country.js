import React, { Component } from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import PropTypes from 'prop-types'

const GET_COUNTRY = gql`
  query Country ($code: String!) {
    country (code: $code) {
      name,
      currency,
      languages {
          code,
          name
      }
    }
  }
`;
  
class Country extends Component {
    
  render() {
    const code = {code: this.props.countryCode}

    return (
      <div className="countryInfo">
        <Query query={GET_COUNTRY} client={this.props.client} variables={code}>    
            {({loading, error, data}) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>{error.message}</p>;
              
              const name = data.country.name 
              const currency = data.country.currency
              const languages = data.country.languages

              return (
                  <div>
                      <div>Name:<span className="infoName"> {name}</span></div>
                      <div>Currency: <span>{currency}</span></div>
                      <div>Languages: <ul className="infoEl">
                          {languages.map(language => (
                            
                          <li 
                            key={language.code}
                            className={language.code}>   
                              {language.name}
                          </li>
                          ))}
                      </ul>
                      </div>
                  </div>
              );
            }}
        </Query>
      </div>
      
    );
  }
}

export default Country

Country.propTypes = {
  client: PropTypes.object,  
  countryCode: PropTypes.string
}
