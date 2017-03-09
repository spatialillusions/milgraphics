
function GeoJSON(data, mapping) {
  //if (typeof mapping === 'undefined') return data;
  var feature_copy = [];
  for (var i = 0; i < data.features.length; i++) {
    feature = data.features[i];
    var f = {type: "Feature", properties: {} }
    f.geometry = {type: feature.geometry.type, coordinates: feature.geometry.coordinates };
    for (key in feature.properties) {
      if (mapping.hasOwnProperty(key)){
        f.properties[mapping[key]] = feature.properties[key];
      }else{
        f.properties[key] = feature.properties[key];
      }
    }
    feature_copy.push(f);
  }
	return {type: "FeatureCollection", features: feature_copy };
}

module.exports = GeoJSON;