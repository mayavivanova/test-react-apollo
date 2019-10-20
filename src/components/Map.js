import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Countries from './Countries';
import Search2 from './Search2'


const GET_CONTINENTS = gql`
    {
        continents {
            name
            code
        }
    }
`;


class Map extends Component {
  
    state = {
      continentCode: ''
    }
    onContinentSelect = (event) => {
      this.setState({continentCode: event.target.classList[1]})      
    };

    render() {
      return (
          <div>
        <Query query={GET_CONTINENTS} client={this.props.client}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          return (
              <div>
                  {data.continents.map(continent => (
                  <div 
                    className={`continent ${continent.code}`} 
                    key={continent.name}
                    onClick={this.onContinentSelect}>{continent.name}</div>
              ))}
              
              </div>
          );
        }}
      </Query>
      {this.state.continentCode? 
          <div>
            <Search2/>
            <Countries continentCode={this.state.continentCode}/>
          </div>: null        
        }

      
      
    </div>
      );
    }
  }

  export default Map