import React from 'react'
import Map from './Map'
import PropTypes from 'prop-types'
import Search from './Search'

function App(props) {
  return (
    <div>
      <div className="header">
        <h1>World Map</h1>   
        <Search/>     
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
