import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

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
        <Query query={GET_COUNTRY} client={this.props.client} variables={code}>
         
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;
            
            const name = data.country.name 
            const currency = data.country.currency
            const languages = data.country.languages

            return (
                <div>
                    <div>{name}</div>
                    <div>{currency}</div>
                <ul>
                    {languages.map(language => (
                    <li 
                      key={language.code}
                      className={language.code}>   
                        {language.name}
                    </li>
                    ))}
                </ul>
                </div>
            );
            
          }}
        </Query>
      );
    }
  }

  export default Country