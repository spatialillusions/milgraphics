import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
import files from '../tacticaljson/import_files.js';

const OpenLayersMap = ({ data }) => {
  return <Map style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }} data={data}/>
};

const APP = () => {
  const [selected, onSelect] = useState('air-corridor');
  return (
    <>
      <div style={{ position: 'fixed', zIndex: 100, right: 0 }}>
        <select style={{ fontSize: 20 }}onChange={(e) => onSelect(e.target.value)}>
          {Object.keys(files).map(key =>
            <option key={`option_${key}`} value={key}>{key}</option>
          )}</select>
      </div>
      <OpenLayersMap data={files[selected]}/>
    </>   
  );
};

ReactDOM.render(
    <APP />,
  document.querySelector(".root")
)
