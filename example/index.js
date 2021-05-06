import React from 'react';
import ReactDOM from 'react-dom';
import DATA from './data.json';
import ms from '../src';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import * as control from 'ol/control';

function OpenLayersMap() {
  var vectorSource = new VectorSource();
  var vectorLayer = new VectorLayer({
    source: vectorSource
  });

  var map = new Map({
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],
    target: 'map',
    controls: control.defaults({
      attributionOptions: ({
        collapsible: false
      })
    }),
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
  var openLayersFeaturesWithStyle = new ms.GraphicsLayer(new ms.format.GeoJSON(DATA)).asOpenLayers();
  vectorSource.clear();
  vectorSource.addFeatures(openLayersFeaturesWithStyle);
  var extent = vectorSource.getExtent(openLayersFeaturesWithStyle);
  map.getView().fit(extent, map.getSize());
  return null;
}

ReactDOM.render(
    <OpenLayersMap />,
  document.querySelector(".root")
)
