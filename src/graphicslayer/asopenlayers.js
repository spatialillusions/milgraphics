var GeoJSON = require('ol/format/GeoJSON');
// const {
//   default: UrlTile
// } = require('ol/source/UrlTile');
var style = require('ol/style');
var makePattern = require('./makepattern');

function asOpenLayers(crs) {
    crs = crs || "EPSG:3857";
    //var ua = window.navigator.userAgent;
    // var isIE = ( ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/')  > 0) ? true : false;
    var features = [];
    for (var i = 0; i < this.data.features.length; i++) {
        var feature = this.data.features[i];
        var olFeature = GeoJSON.default.prototype.readFeature(feature, {
            dataProjection: 'EPSG:4326',
            featureProjection: crs
        });

        if (olFeature.getGeometry() && olFeature.getGeometry().getType() == "Point") {
            var properties = olFeature.getProperties();
            if (properties.sidc.charAt(0) != "X") {
                //TODO handle sitaware custom graphics
                var milsymbol = this.data.features[i].symbol;
                // var image = isIE ? mysymbol.asCanvas() : mysymbol.toDataURL();
                var image = 'data:image/svg+xml,' + milsymbol.asSVG().toString();
                olFeature.setStyle(
                    new style.Style({
                        image: new style.Icon({
                            anchor: [
                                milsymbol.getAnchor().x,
                                milsymbol.getAnchor().y
                            ],
                            anchorXUnits: "pixels",
                            anchorYUnits: "pixels",
                            imgSize: [
                                Math.floor(milsymbol.getSize().width),
                                Math.floor(milsymbol.getSize().height)
                            ],
                            src: image
                        })
                    })
                );
            }
        }

        var styles = [
            new style.Style({
                stroke: new style.Stroke({
                    lineCap: "butt",
                    color: "#000000",
                    width: 2
                })
            })
        ];

        if (feature.graphic.isConverted() && (olFeature.getGeometry().getType() == "LineString" ||
                olFeature.getGeometry().getType() == "MultiLineString")) {
            if (feature.graphic.annotations) {
                styles = styles.concat(createAnnotationsStyle(feature.graphic.annotations, crs));
            }
            olFeature.setStyle(styles);
        }

        if (feature.graphic.isConverted() && olFeature.getGeometry().getType() == "Polygon") {
            if (feature.properties.fill == "dashes") {

                var pattern = makePattern('#000', 'obliqueLeft', 15);
                styles[0].setFill(
                    new style.Fill({
                        color: pattern
                    })
                );


            } else {
                styles[0].setFill(
                    new style.Fill({
                        color: "rgba(0,0,0,0)"
                    })
                );
            }

            if (feature.graphic.annotations) {
                if (!feature.graphic.annotations[0].geometry.coordinates) {
                    styles[0].setText(getText(feature.graphic.annotations[0].properties.text));
                }
                styles = styles.concat(createAnnotationsStyle(feature.graphic.annotations, crs));
            }
            olFeature.setStyle(styles);
        }


        features.push(olFeature);
    }

    return features;
}

function createAnnotationsStyle(annotations, crs) {
    var add_styles = [];
    for (var a = 0; a < annotations.length; a++) {
        if (annotations[a].geometry.coordinates) {
            var labelgeom = GeoJSON.default.prototype.readFeature(annotations[a].geometry, {
                dataProjection: 'EPSG:4326',
                featureProjection: crs
            }).getGeometry();
            add_styles.push(
                new style.Style({
                    text: getText(annotations[a].properties.text),
                    geometry: labelgeom
                })
            );
        }
    }
    return add_styles;
}

function getText(text) {
    return new style.Text({
        fill: new style.Fill({
            color: "black"
        }),
        font: "bold 16px sans-serif",
        stroke: new style.Stroke({
            color: "rgb(239, 239, 239)", // off-white
            width: 4
        }),
        text: text
    });
}

module.exports = asOpenLayers;