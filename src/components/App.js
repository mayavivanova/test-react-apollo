import React from 'react';
import Map from './Map'

function App(props) {
  return (
    <div>
      <div className="header"><span>World Map</span></div>   
      <div className="map">   
        <Map client={props.client}/>
      </div>

    </div>
    
  );
}

export default App;
