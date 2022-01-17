import React from 'react';
import OLMap from 'ol/Map';
import * as olInteraction from 'ol/interaction';
import * as olControl from 'ol/control';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import ms from '../src';

var vectorSource = new VectorSource();
var vectorLayer = new VectorLayer({
  source: vectorSource
});

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.map = new OLMap({
      interactions: olInteraction.defaults(),
      controls: olControl.defaults(),
      overlays: [],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ]
    });
  }

  updateVector(props) {
    var openLayersFeaturesWithStyle = new ms.GraphicsLayer(new ms.format.GeoJSON(props.data)).asOpenLayers();
    vectorSource.clear();
    vectorSource.addFeatures(openLayersFeaturesWithStyle);
    var extent = vectorSource.getExtent(openLayersFeaturesWithStyle);
    this.map.getView().fit(extent, this.map.getSize());
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.updateVector(props);
  }

  componentDidMount() {
    this.map.setTarget(this.refs.target)
    this.map.renderSync();
    this.focus();
    this.updateVector(this.props);
  }

  componentWillUnmount() {
    this.map.setTarget(undefined)
  }

  render() {
    return (
      <div style={this.props.style}>
        <div ref="target" style={{ width: '100%', height: '100%' }}>
        </div>
        <div>
          {this.props.children}
          {this.props.view}
        </div>
      </div>
    )
  }

  focus() {
    const viewport = this.map.getViewport()
    viewport.tabIndex = 0
    viewport.focus()
  }

  getSize() {
    return this.map.getSize()
  }
}
