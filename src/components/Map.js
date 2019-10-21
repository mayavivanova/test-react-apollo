import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Countries from './Countries'
import ScrollableAnchor from 'react-scrollable-anchor'
import PropTypes from 'prop-types'

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
    this.setState({continentCode: event.target.id})      
  };

  render() {
    return (
      <div>
        <div className="map">
          <Query query={GET_CONTINENTS} client={this.props.client}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>{error.message}</p>
            return (
                <div>
                    {data.continents.map(continent => (
                    <a href="#countriesListContainer" 
                      key={continent.name}>
                        <div 
                          id={continent.code}
                          className={`continent ${continent.code}`} 
                          onClick={this.onContinentSelect}
                        >{continent.name}</div>
                    </a>
                ))}
                </div>
            );
          }}
        </Query>     
      </div>

      <ScrollableAnchor id={'countriesListContainer'}>
        <div className="countriesListContainer">
        {this.state.continentCode?  
              <div className="countriesList">                              
                <Countries continentCode={this.state.continentCode}/>
              </div>
              : null    
        }   
        </div> 
      </ScrollableAnchor>

    </div>
    );
  }
}

export default Map

Map.propTypes = {
  client: PropTypes.object
}