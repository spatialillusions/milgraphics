var ms = require("milsymbol");

function ArmyXML(xml) {
  var features = [];
  /*  
  function parseSIDC(sidc) {
    for (var i in sidc.childNodes){
      if (sidc.childNodes[i].nodeName == 'SymbolCodeString'){
        return sidc.childNodes[i].textContent;
      }
    }
  }
  */
  function parseArea(area) {
    var coordinates = [];
    area = area.getElementsByTagName(ns + "Point");
    for (var i in area) {
      if (area[i].nodeName == ns + "Point") {
        var point = area[i];
        var coord = [];
        coord[0] = parseFloat(point.getAttribute("Longitude"));
        coord[1] = parseFloat(point.getAttribute("Latitude"));
        if (point.getAttribute("Elevation")) {
          coord[2] = parseFloat(point.getAttribute("Elevation"));
        }
        coordinates.push(coord);
      }
    }
    coordinates.push(coordinates[0]); //close ring
    return coordinates;
  }

  /*
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
*/
  /*   
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
*/
  /*
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
*/

  function parseLine(line) {
    var coordinates = [];
    line = line.getElementsByTagName(ns + "Point");
    for (var i in line) {
      if (line[i].nodeName == ns + "Point") {
        var point = line[i];
        var coord = [];
        coord[0] = parseFloat(point.getAttribute("Longitude"));
        coord[1] = parseFloat(point.getAttribute("Latitude"));
        if (point.getAttribute("Elevation")) {
          coord[2] = parseFloat(point.getAttribute("Elevation"));
        }
        coordinates.push(coord);
      }
    }
    return coordinates;
  }

  /*
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
*/
  /*
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
*/
  /*
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
*/

  function parsePoint(point) {
    var coordinates = [0, 0];
    point = point.getElementsByTagName(ns + "Point")[0];
    coordinates[0] = parseFloat(point.getAttribute("Longitude"));
    coordinates[1] = parseFloat(point.getAttribute("Latitude"));
    if (point.getAttribute("Elevation")) {
      coordinates[2] = parseFloat(point.getAttribute("Elevation"));
    }
    return coordinates;
  }

  function parseSymbol(symbol) {
    var feature = { type: "Feature", properties: {} };

    var symbolNodes = {};
    for (var i in symbol.childNodes) {
      symbolNodes[symbol.childNodes[i].nodeName] = symbol.childNodes[i];
    }

    var symbolDefinition = symbolNodes[ns + "Symbol_Definition"];
    for (i in symbolDefinition.childNodes) {
      var nodeName = symbolDefinition.childNodes[i].nodeName;
      if (nodeName == "#text" || typeof nodeName === "undefined") continue;
      if (nodeName.indexOf(":") != -1) nodeName = nodeName.split(":")[1];
      feature.properties[nodeName] = symbolDefinition.childNodes[i].textContent;
    }

    var operationalAttributes = symbolNodes[ns + "Operational_Attributes"];
    for (i in operationalAttributes.childNodes) {
      nodeName = operationalAttributes.childNodes[i].nodeName;
      if (nodeName == "#text" || typeof nodeName === "undefined") continue;
      if (nodeName.indexOf(":") != -1) nodeName = nodeName.split(":")[1];
      feature.properties[nodeName] =
        operationalAttributes.childNodes[i].textContent;
    }

    var displayAttributes = symbolNodes[ns + "Display_Attributes"];
    for (i in displayAttributes.childNodes) {
      nodeName = displayAttributes.childNodes[i].nodeName;
      if (nodeName == "#text" || typeof nodeName === "undefined") continue;
      if (nodeName.indexOf(":") != -1) nodeName = nodeName.split(":")[1];
      feature.properties[nodeName] =
        displayAttributes.childNodes[i].textContent;
    }

    switch (feature.properties["Symbol_Category"]) {
      case "AREA":
        feature.geometry = {
          type: "Polygon",
          coordinates: [parseArea(symbolNodes[ns + "Symbol_Points"])]
        };
        break;
      case "BIOCHEM":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          feature.geometry = {
            type: "Polygon",
            coordinates: [parseArea(symbolNodes[ns + "Symbol_Points"])]
          };
        }
        break;
      //BOUNDARY,
      case "EQUIPMENT":
        feature.geometry = {
          type: "Point",
          coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
        };
        break;
      //GROUP ,
      case "INSTALLATION":
        feature.geometry = {
          type: "Point",
          coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
        };
        break;
      case "LINE":
        feature.geometry = {
          type: "LineString",
          coordinates: parseLine(symbolNodes[ns + "Symbol_Points"])
        };
        break;
      case "MINE":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          feature.geometry = {
            type: "Polygon",
            coordinates: [parseArea(symbolNodes[ns + "Symbol_Points"])]
          };
        }
        break;
      case "MOOTW":
        feature.geometry = {
          type: "Point",
          coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
        };
        break;
      case "NOT_SPECIFIED":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          console.warn(
            "cannot handle Symbol_Category: " +
              feature.properties["Symbol_Category"]
          );
          console.warn(feature.properties["Symbol_Name"]);
          console.warn(symbol);
        }
        break;
      case "NUCLEAR":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          feature.geometry = {
            type: "Polygon",
            coordinates: [parseArea(symbolNodes[ns + "Symbol_Points"])]
          };
        }
        break;
      case "OBSTACLE":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          console.warn(
            "cannot handle Symbol_Category: " +
              feature.properties["Symbol_Category"]
          );
          console.warn(symbol);
        }
        break;
      case "POINT":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          // OK this is bonkers, but i found some errors in some of my sample files...
          feature.geometry = {
            type: "LineString",
            coordinates: parseLine(symbolNodes[ns + "Symbol_Points"])
          };
        }
        break;
      case "SIG_INT":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          console.warn(
            "cannot handle Symbol_Category: " +
              feature.properties["Symbol_Category"]
          );
          console.warn(symbol);
        }
        break;
      case "TARGET":
        if (
          symbolNodes[ns + "Symbol_Points"].getElementsByTagName(ns + "Point")
            .length == 1
        ) {
          feature.geometry = {
            type: "Point",
            coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
          };
        } else {
          feature.geometry = {
            type: "Polygon",
            coordinates: [parseArea(symbolNodes[ns + "Symbol_Points"])]
          };
        }
        break;
      case "UNIT":
        feature.geometry = {
          type: "Point",
          coordinates: parsePoint(symbolNodes[ns + "Symbol_Points"])
        };
        break;
      default:
        console.warn(
          "cannot handle Symbol_Category: " +
            feature.properties["Symbol_Category"]
        );
        console.warn(symbol);
    }
    return feature;
  }

  if (typeof xml == "string") {
    xml = new DOMParser().parseFromString(xml, "text/xml");
  }
  var ns = "";
  if (xml.firstChild.nodeName.indexOf(":") != -1) {
    ns = xml.firstChild.nodeName.split(":")[0] + ":";
  }

  var symbols = xml.getElementsByTagName(ns + "Symbol");
  for (var sym in symbols) {
    if (symbols[sym].nodeName) {
      features = features.concat(parseSymbol(symbols[sym]));
    }
  }

  var rawGeoJSON = { type: "FeatureCollection", features: features };
  return ms.format.GeoJSON(rawGeoJSON, {
    Additional_Info1: "additionalInformation",
    Additional_Info2: "additionalInformation1",
    Additional_Info3: "additionalInformation1",
    Common_Identifier: "commonIdentifier",
    Higher_Formation: "higherFormation",
    Unique_Designator1: "uniqueDesignation",
    Unique_Designator2: "uniqueDesignation1",
    Staff_Comments: "staffComments",
    Symbol_Code: "sidc",
    DTG_1: "dtg",
    DTG_2: "dtg1",
    //Speed: 'speed',
    //Direction: 'direction',
    //Altitude_Depth: 'altitudeDepth',
    Reinforced_or_Reduced: "reinforcedReduced",
    Quantity: "quantity",
    //Combat_Effectiveness: 'combatEffectiveness',
    Signature_Equipment: "signatureEquipment",
    IFF_SIF: "iffSif",
    Special_C2HQ: "specialHeadquarters"
  });
}

if (typeof module !== "undefined") {
  module.exports = ArmyXML;
}
