﻿define(["require", "exports", 'ol3'], function(require, exports, ol3) {
    var OpenLayersMap = (function () {
        function OpenLayersMap(id) {
            var _this = this;
            this.layers = {};
            this.getLayers = function () {
                var result = [];
                for (var i in _this.layers) {
                    result.push(_this.layers[i]);
                }
                return result;
            };
            this.getLayer = function (name) {
                return _this.layers[name];
            };
            this.activateDrawing = function (type) {
                if (type == "Circle")
                    type = "Point";
                else if (type == "Strip")
                    type = "LineString";
                else
                    type = "Polygon";

                _this.drawInteraction = new ol.interaction.Draw({
                    source: _this.getLayer('drawing').getSource(),
                    type: type
                });
                _this.map.addInteraction(_this.drawInteraction);
            };
            this.deactivateDrawing = function () {
                if (!_this.drawInteraction)
                    return;
                _this.map.removeInteraction(_this.drawInteraction);
                _this.getLayer('drawing').getSource().clear();
            };
            this.addFeature = function (geoJSON, focus) {
                if (typeof focus == 'undefined')
                    focus = true;
                var geoJsonFormat = new ol.format.GeoJSON();
                var geometry = geoJsonFormat.readGeometry(geoJSON);
                var transformFn = ol.proj.getTransform('EPSG:4326', 'EPSG:3857');
                geometry.transform(transformFn);
                var feature = new ol.Feature(geometry);
                var source = _this.layers['vector'].getSource();
                source.addFeature(feature);
                if (focus) {
                    var extent = geometry.getExtent();
                    _this.map.getView().fitExtent(extent, _this.map.getSize());
                }
                return feature;
            };
            this.removeFeature = function (feature) {
                var source = _this.layers['vector'].getSource();
                source.removeFeature(feature);
            };
            this.teleport = function (id) {
                _this.map.setTarget(id);
            };
            ol3;
            this.initLayers();

            this.map = new ol.Map({
                target: id,
                layers: this.getLayers(),
                view: this.getView()
            });
        }
        /*
        if (navigator.geolocation) {
        var showPosition = function (position) {
        var coords = position.coords;
        view.setZoom(15);
        view.setCenter(ol.proj.transform([coords.longitude, coords.latitude], 'EPSG:4326', 'EPSG:3857'));
        };
        navigator.geolocation.getCurrentPosition(showPosition);
        }
        */
        OpenLayersMap.prototype.initLayers = function () {
            this.layers['osm'] = new ol.layer.Tile({
                source: new ol.source.OSM()
            });

            this.layers['drawing'] = new ol.layer.Vector({
                source: new ol.source.GeoJSON(),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });

            this.layers['vector'] = new ol.layer.Vector({
                source: new ol.source.GeoJSON(),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 0, 0, 0.1)'
                    }),
                    image: new ol.style.Icon({
                        src: 'Content/Images/marker.png'
                    })
                })
            });
        };

        OpenLayersMap.prototype.getView = function () {
            return new ol.View2D({
                center: ol.proj.transform([25.1, 42.8], 'EPSG:4326', 'EPSG:3857'),
                minZoom: 5,
                zoom: 6
            });
        };
        return OpenLayersMap;
    })();

    
    return OpenLayersMap;
});
//# sourceMappingURL=OpenLayersMap.js.map
