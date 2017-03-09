# Milgraphics Documentation


# Creating military graphics layers

## ms.GraphicsLayer(GeoJSON)

Creates a new Graphics Layer from the provided GeoJSON. Properties in the GeoJSON should be mapped with the same names as in milsymbol. GeoJSON in other formats can be cloned and remapped using ms.format.GeoJSON.


-----


### asOpenLayers(*crs*)


**Returns**

```javascript
Array.<ol.Feature>
```

-----

# Reading Files


## ms.format.GeoJSON(GeoJSON, mapping)

Reads GeoJSON, clones it and maps properties according to the mapping object.

## ms.format.SLF( file )

Reads a SitaWare SLF file and parses it to GeoJSON with attributes mapped to the values milgraphics expects.

