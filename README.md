# Milgraphics

Military Tactical Graphics

This is a work in progress with the goal of being able to render tactical graphics in the web browser. 

The library is still in initial development and should not be used in production environments. The goal is to release an initial version during the summer of 2017. What this initial version will include will be decided at a later stage.

## Main idea

The main idea is to initially being able to convert input definition geometries to simple GeoJSON geometries.

### Input

First data will be input in GeoJSON, at the moment the data will be defined with the same geometries as in 2525D, the data specification will be published as [TacticalJSON](https://github.com/spatialillusions/TacticalJSON).

The library includes a parser for SitaWare SLF/SPF files just to be able to get some test data from an external source.

### Output

Points will be points with style information for different libraries (Cesium/OpenLayers etc.)

Lines will be lines, might have style information about simple label placement.

Polygons will be polygons, might have style information about simple label placement.

Other geometries (arrows and other complex geometries) will be converted to lines or polygons so that they can be displayed on a map and make sense.

The over all main idea is to keep it simple from the beginning and then move forward where it is needed.

## Feedback

Please add issues for feedback and ideas

## Technology

Milgraphics is built on top of [milsymbol](https://github.com/spatialillusions/milsymbol) and adds functionality for reading tactical data in GeoJSON and outputting it in different ways that makes it easy to use in webmaps.

## Contact

Milsymbol is created and maintained by Måns Beckman
 - http://www.spatialillusions.com to see more examples of what milsymbol can be used for
 - https://twitter.com/spatialillusion for milsymbol and mapping/military related information 

## Licensing

MIT, See [license.txt](license.txt) for details