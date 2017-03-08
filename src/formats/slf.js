
function SLF(xml) {
  function parseSIDC(sidc) {
    for (var i in sidc.childNodes){
      if (sidc.childNodes[i].nodeName == 'SymbolCodeString'){
        return sidc.childNodes[i].textContent;
      }
    }
  }

  function parseArea(area) {
    var coordinates = [];
    for (var i in area.childNodes){
      if (area.childNodes[i].nodeName == 'Points'){
        for (var j in area.childNodes[i].childNodes){
          if (area.childNodes[i].childNodes[j].nodeName == 'Point'){
            coordinates.push( parsePoint(area.childNodes[i].childNodes[j]) );
          }
        }
      }
    }
    coordinates.push(coordinates[0]);//close ring
    return coordinates;
  }

  function parseLine(line) {
    var coordinates = [];
    for (var i in line.childNodes){
      if (line.childNodes[i].nodeName == 'Points'){
        for (var j in line.childNodes[i].childNodes){
          if (line.childNodes[i].childNodes[j].nodeName == 'Point'){
            coordinates.push( parsePoint(line.childNodes[i].childNodes[j]) );
          }
        }
      }
    }
    return coordinates;
  }

  function parseTwoPointLine(line) {
    var coordinates = [0,0];
    for (var i in line.childNodes){
      if (line.childNodes[i].nodeName == 'StartPoint'){
        coordinates[0] = parsePoint(line.childNodes[i]);
      }
      if (line.childNodes[i].nodeName == 'EndPoint'){
        coordinates[1] = parsePoint(line.childNodes[i]);
      }
    }
    return coordinates;
  }
        
  function parsePoint(point) {
    var coordinates = [0,0];
    for (var i in point.childNodes){
      if (point.childNodes[i].nodeName == 'Longitude'){
        coordinates[0] = parseFloat(point.childNodes[i].textContent);
      }
      if (point.childNodes[i].nodeName == 'Latitude'){
        coordinates[1] = parseFloat(point.childNodes[i].textContent);
      }
    }
    return coordinates;
  }
  
  function parseLocation(location) {
    var locationType = location.getAttribute('xsi:type');
    switch (locationType) {
      case 'Area':
        return {type: "Polygon", coordinates: [parseArea(location)] };
        break;
      case 'Line':
        return {type: "LineString", coordinates: parseLine(location) };
        break;
      case 'Point':
        return {type: "Point", coordinates: parsePoint(location) };
        break;
      case 'PolyPoint':
        return {type: "MultiPoint", coordinates: parseLine(location) }; //I know this isn't a line but they are stored in the same way.
        break;
      case 'TwoPointLine':
        return {type: "MultiPoint", coordinates: parseTwoPointLine(location) }; //I know this isn't a line but they are stored in the same way.
        break;
      default:
        console.log('TODO parse location type: ' + locationType)
    }
  }
  
  function parseSymbols(symbols) {
    var features = [];
    for (var i in symbols.childNodes){
      if (symbols.childNodes[i].nodeName == 'Symbol'){
        var symbol = symbols.childNodes[i];
        var symbolType = symbol.getAttribute('xsi:type');
        var feature = {type: "Feature", properties: {} };
        
        if ( [
          'Aviation',
          'BattlePosition',
          'BoundaryLine',
          'Equipment',
          'GenericShape',
          'Incident',
          'Installation',
          'Minefield',
          'TacticalGraphic',
          'TextArea',
          'Unit'].indexOf(symbolType) != -1 ) {
          for (var j in symbol.childNodes){
            var nodeName = symbol.childNodes[j].nodeName
            if(typeof nodeName === 'undefined') continue;
            switch (nodeName) {
              case 'Location':
                feature.geometry = parseLocation( symbol.childNodes[j] );
                break;
              case 'SymbolCode':
                feature.properties.SymbolCode = parseSIDC( symbol.childNodes[j] );
                break;
              case '#text':
                break;
              default:
                feature.properties[nodeName] = symbol.childNodes[j].textContent;
            }
          }
          if (typeof feature.geometry !== 'undefined') {
            features.push(feature);
          }
        }else{
          console.log('TODO parse symbol type: ' + symbolType)
        }
      }
    }
    return features;
  }

  function parseLayer(layer) {
    var features = [];
    for (var i in layer.childNodes){
      if (layer.childNodes[i].nodeName == 'Name'){
        //console.log('LAYER: ' + layer.childNodes[i].textContent);
      }
      if (layer.childNodes[i].nodeName == 'Symbols'){
        //console.log(parseSymbols( layer.childNodes[i] ))
        features = features.concat( parseSymbols( layer.childNodes[i] ) );
      }
    }
    return features;
  }
  
  if (typeof xml == 'string'){
    xml = (new DOMParser()).parseFromString(xml , "text/xml");	
  }

  var features = [];
  for (var i in xml.firstChild.childNodes){
    if (xml.firstChild.childNodes[i].nodeName == 'Layers'){
      for (var j in xml.firstChild.childNodes[i].childNodes){
        if (xml.firstChild.childNodes[i].childNodes[j].nodeName == 'Layer'){
          var layer = xml.firstChild.childNodes[i].childNodes[j];
           features = features.concat( parseLayer(layer) );
        }
      }
    }
  } 
  
  var rawGeoJSON = {type: "FeatureCollection", features: features };

	return rawGeoJSON;
}

if (typeof module !== 'undefined') {
  module.exports = SLF;
}