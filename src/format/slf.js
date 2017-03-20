var ms = require('milsymbol');

function SLF(xml) {
  var features = [];
  
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

  function parseArrow(arrow) {
    var coordinates = [];
    var arrowHead = [];
    for (var i in arrow.childNodes){
      if (arrow.childNodes[i].nodeName == 'Arrowhead'){
        arrowHead = parsePoint(arrow.childNodes[i]);
      }
      if (arrow.childNodes[i].nodeName == 'Points'){
        for (var j in arrow.childNodes[i].childNodes){
          if (arrow.childNodes[i].childNodes[j].nodeName == 'Point'){
            coordinates.unshift( parsePoint(arrow.childNodes[i].childNodes[j]) );
          }
        }
      }
    }
    coordinates.push(arrowHead);//Add arrow head last in multipoint
    return coordinates;
  }
    
  function parseCircle(line) {
    var coordinates = [0,0];
    for (var i in line.childNodes){
      if (line.childNodes[i].nodeName == 'CenterPoint'){
        coordinates[0] = parsePoint(line.childNodes[i]);
      }
      if (line.childNodes[i].nodeName == 'PerimeterPoint'){
        coordinates[1] = parsePoint(line.childNodes[i]);
      }
    }
    return coordinates;
  }

  function parseCorridor(corridor) {
    var coordinates = [];
    var width = 0;
    for (var i in corridor.childNodes){
      if (corridor.childNodes[i].nodeName == 'Width'){
        width = corridor.childNodes[i].textContent;
      }
      if (corridor.childNodes[i].nodeName == 'Points'){
        for (var j in corridor.childNodes[i].childNodes){
          if (corridor.childNodes[i].childNodes[j].nodeName == 'Point'){
            coordinates.push( parsePoint(corridor.childNodes[i].childNodes[j]) );
          }
        }
      }
    }
    coordinates.push(width);//Add width last in array, we fix this later
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

  function parseTwoPointArrow(arrow) {
    var coordinates = [0,0,0];
    for (var i in arrow.childNodes){
      if (arrow.childNodes[i].nodeName == 'StartPoint'){
        coordinates[1] = parsePoint(arrow.childNodes[i]);
      }
      if (arrow.childNodes[i].nodeName == 'EndPoint' || arrow.childNodes[i].nodeName == 'Endpoint'){
        coordinates[0] = parsePoint(arrow.childNodes[i]);
      }
      if (arrow.childNodes[i].nodeName == 'Arrowhead' || arrow.childNodes[i].nodeName == 'ArrowHead'){
        coordinates[2] = parsePoint(arrow.childNodes[i]);
      }
    }
    console.log(coordinates)
    return coordinates;
  }
  
  function parseTwoPointCorridor(line) {
    var coordinates = [0,0,0];
    for (var i in line.childNodes){
      if (line.childNodes[i].nodeName == 'StartPoint'){
        coordinates[0] = parsePoint(line.childNodes[i]);
      }
      if (line.childNodes[i].nodeName == 'EndPoint' || line.childNodes[i].nodeName == 'Endpoint'){
        coordinates[1] = parsePoint(line.childNodes[i]);
      }
      if (line.childNodes[i].nodeName == 'Width'){
        coordinates[2] = line.childNodes[i].textContent;
      }
    }
    return coordinates;
  }
  
  function parseTwoPointLine(line) {
    var coordinates = [0,0];
    for (var i in line.childNodes){
      if (line.childNodes[i].nodeName == 'StartPoint'){
        //we reverse them because MIR vs 2525
        coordinates[1] = parsePoint(line.childNodes[i]);
      }
      if (line.childNodes[i].nodeName == 'EndPoint' || line.childNodes[i].nodeName == 'Endpoint'){
        coordinates[0] = parsePoint(line.childNodes[i]);
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
      case 'Arrow':
        return {type: "LineString", coordinates: parseArrow(location) };
        break;
      case 'Circle':
        return {type: "LineString", coordinates: parseCircle(location) };
        break;
      case 'Corridor':
        return {type: "Corridor", coordinates: parseCorridor(location) }; // We fix Corridors later
        break;
      case 'Line':
        return {type: "LineString", coordinates: parseLine(location) };
        break;
      case 'Point':
        return {type: "Point", coordinates: parsePoint(location) };
        break;
      case 'PolyPoint':
        return {type: "LineString", coordinates: parseLine(location) }; //I know this isn't a line but they are stored in the same way.
        break;
      case 'Rectangle':
        return {type: "Rectangle", coordinates: parseTwoPointCorridor(location) }; // We will fix TwoPointCorridor later
        break;
      case 'TwoPointArrow':
        return {type: "LineString", coordinates: parseTwoPointArrow(location) }; 
        break;
      case 'TwoPointCorridor':
        return {type: "TwoPointCorridor", coordinates: parseTwoPointCorridor(location) }; // We will fix TwoPointCorridor later
        break;
      case 'TwoPointLine':
        return {type: "LineString", coordinates: parseTwoPointLine(location) }; 
        break;
      default:
        console.log('SitaWare Layer File: TODO parse location type ' + locationType)
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
                if(feature.geometry && feature.geometry.type == 'Corridor'){
                  var points = feature.geometry.coordinates;
                  feature.properties.distance = points[points.length-1];
                  points.pop();
                  feature.geometry = {type: "LineString", coordinates: points };
                }
                if(feature.geometry && feature.geometry.type == 'Rectangle'){
                  var points = feature.geometry.coordinates;
                  feature.properties.distance = points[points.length-1];
                  points.pop();
                  feature.geometry = {type: "LineString", coordinates: points };
                }
                if(feature.geometry && feature.geometry.type == 'TwoPointCorridor'){
                //TODO make sure that we are drawing this in the right direction
                  var points = feature.geometry.coordinates;
                  var coordinates = [points[0],points[1]];
                  var width = points[2];
                  var bearing = ms.geometry.bearingBetween(points[1],points[0]);
                  coordinates.push( ms.geometry.toDistanceBearing(ms.geometry.pointBetween(points[0],points[1],0.5),width/2,bearing-90));
                  //coordinates.push( ms.geometry.toDistanceBearing(points[1],width/2,bearing-90));
                  //coordinates.push(points[0]);

                  feature.geometry = {type: "LineString", coordinates: coordinates };
                }
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
          console.log('SitaWare Layer File: TODO parse symbol type ' + symbolType)
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

  var layers = xml.getElementsByTagName('Layer'); // For SLF files
  for (var lyr in layers){
    features = features.concat( parseLayer(layers[lyr]) );
  }
  var layers = xml.getElementsByTagName('Overlay'); // For SPF files
  for (var lyr in layers){
    features = features.concat( parseLayer(layers[lyr]) );
  }
  
  // Fix circles 
  for (var f in features){
    var sidc = features[f].properties.SymbolCode
    var genericSIDC = sidc.substr(0,1)+'-'+sidc.substr(2,1)+'-'+sidc.substr(4,6);
    if ( ['G-F-ATC---',
          'G-F-ACSC--',
          'G-F-ACAC--',
          'G-F-ACFC--',
          'G-F-ACNC--',
          'G-F-ACRC--',
          'G-F-ACPC--',
          'G-F-AZIC--',
          'G-F-AZXC--',
          'G-F-AZSC--',
          'G-F-AZCC--',
          'G-F-AZDC--',
          'G-F-AZFC--',
          'G-F-AZZC--',
          'G-F-AZBC--',
          'G-F-AZVC--',
          'X---I-----'].indexOf(genericSIDC) != -1 ) {
      var points = features[f].geometry.coordinates;
      features[f].properties.distance = ms.geometry.distanceBetween(points[0],points[1]);
      features[f].geometry = {type: "Point", coordinates: points[0] };
    }
  }
  
  var rawGeoJSON = {type: "FeatureCollection", features: features };
	return ms.format.GeoJSON(rawGeoJSON, {
	  Aliases: 'commonIdentifier',
	  Name: 'uniqueDesignation', 
	  StaffComments: 'staffComments',
	  SymbolCode:'sidc', 
	  Timestamp: 'dtg'});
}

if (typeof module !== 'undefined') {
  module.exports = SLF;
}