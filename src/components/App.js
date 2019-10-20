import React from 'react';
import Map from './Map'

function App(props) {
  return (
    <div>
     <Map client={props.client}/>
    </div>
  );
}

export default App;
