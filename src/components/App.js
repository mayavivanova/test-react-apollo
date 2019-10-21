import React from 'react'
import Map from './Map'
import PropTypes from 'prop-types'

function App(props) {
  return (
    <div>
      <div className="header">
        <h1>World Map</h1>        
      </div>   
      <div className="mapContainer" >   
        <Map client={props.client}/>
      </div>
      <a href="goToTop">
        <div className="goToTop">Go to top</div>
      </a>
    </div>
  );    
}

export default App

App.propTypes = {
  client: PropTypes.object
}
