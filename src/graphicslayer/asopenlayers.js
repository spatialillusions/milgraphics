
function asOpenLayers(crs) {
  var crs = crs || 'EPSG:3857';
  //var ua = window.navigator.userAgent;
  //var isIE = ( ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/')  > 0) ? true : false;
  var ratio = window.devicePixelRatio;
  var geoJSON = new ol.format.GeoJSON();
  var features = [];
  
  for (var i = 0; i< this.data.features.length; i++) {
    var feature = geoJSON.readFeature(this.data.features[i],{featureProjection:ol.proj.get(crs)});
  
    if (feature.getGeometry().getType() == 'Point') {
      var properties = feature.getProperties();
      if (properties.sidc.charAt(0) != 'X') { //TODO handle sitaware custom graphics
        var milsymbol = this.data.features[i].symbol;
        //var image = isIE ? mysymbol.asCanvas() : mysymbol.toDataURL();
        feature.setStyle(new ol.style.Style({
          image: new ol.style.Icon( ({
            scale: 1/ratio,
            anchor: [milsymbol.getAnchor().x*ratio, milsymbol.getAnchor().y*ratio],
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
            imgSize: [Math.floor(milsymbol.getSize().width*ratio), Math.floor(milsymbol.getSize().height*ratio)],
            img: milsymbol.asCanvas(ratio)
          }))
        }));
      }
    }
    
    if (feature.getGeometry().getType() == 'LineString' || feature.getGeometry().getType() == 'MultiLineString') {
      	var style = new ol.style.Style({
          stroke: new ol.style.Stroke({lineCap:'butt', color:'#000000', width: 2})
        });
        feature.setStyle(style);
    }
    
    if (feature.getGeometry().getType() == 'Polygon') {
      	var style = new ol.style.Style({
          stroke: new ol.style.Stroke({lineCap:'butt', color:'#000000', width: 2}),
          fill: new ol.style.Fill({color: 'rgba(0,0,0,0)'})
        });
        feature.setStyle(style);
    }
    
    features.push(feature);
  }
  
  return features;
}

module.exports = asOpenLayers;
