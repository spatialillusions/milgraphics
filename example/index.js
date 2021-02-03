import React from 'react';
import ReactDOM from 'react-dom';
import DATA from './data.json';
import ms from '../src';

function OpenLayersMap() {
  var vectorSource = new ol.source.Vector();
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: ({
        collapsible: false
      })
    }),
    view: new ol.View({
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
