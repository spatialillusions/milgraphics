
function asOpenLayers(crs) {
  var crs = crs || 'EPSG:3857';
  var features = (new ol.format.GeoJSON()).readFeatures(this.data,{featureProjection:ol.proj.get(crs)});
  //var ua = window.navigator.userAgent;
	//var isIE = ( ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/')  > 0) ? true : false;
  for (var i = 0; i< features.length; i++) {
    var feature = features[i];

    if (feature.getGeometry().getType() == 'Point') {
      var props = feature.getProperties();
      props.size = 30;
      
      if (props.sidc.charAt(0) != 'X') { //Skip SitaWare custom graphics for now
        var mysymbol = new ms.Symbol(props);
        //var image = isIE ? mysymbol.asCanvas() : mysymbol.toDataURL();
        var image = mysymbol.asCanvas();
        
        feature.setStyle(new ol.style.Style({
          image: new ol.style.Icon( ({
            //scale: 1/ratio,
            anchor: [mysymbol.getAnchor().x, mysymbol.getAnchor().y],
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
            imgSize: [Math.floor(mysymbol.getSize().width), Math.floor(mysymbol.getSize().height)],
            img: (image)
          }))
        }));
      }
    }
    if (feature.getGeometry().getType() == 'LineString') {
      	var style = new ol.style.Style({
          stroke: new ol.style.Stroke({lineCap:'butt', color:'#000000', width: 2})
        });
        feature.setStyle(style);
    }
    if (feature.getGeometry().getType() == 'MultiLineString') {
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
  }
  return features;
}

module.exports = asOpenLayers;
