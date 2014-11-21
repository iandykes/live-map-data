
var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-4.495420, 50.339800], 'EPSG:4326', 'EPSG:3857')),
    name: 'Null Island',
    population: 4000,
    rainfall: 500
});


;(function ($) {

 
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'content/img/marker.png'
        }))
    });

    iconFeature.setStyle(iconStyle);

    var vectorSource = new ol.source.Vector({
        features: [iconFeature]
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
              source: new ol.source.OSM()
          }),
          vectorLayer          
        ],
        view: new ol.View({
            center: ol.proj.transform([-4.495420, 50.339800], 'EPSG:4326', 'EPSG:3857'),            
            zoom: 12
        })
    });

    function getRandomOffset() {
        var num = Math.random() * 0.005;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

        return num;
    }

    function clickTestButton()
    {
        var g = iconFeature.getGeometry();
        var current = ol.proj.transform(g.getCoordinates(), 'EPSG:3857', 'EPSG:4326');
        current[0] = current[0] + getRandomOffset();
        current[1] = current[1] + getRandomOffset();
        iconFeature.setGeometry(new ol.geom.Point(ol.proj.transform(current, 'EPSG:4326', 'EPSG:3857')));
    }

    $(function () {
        $(document).on("click", "#test-button", function () {
            clickTestButton();
        });
    });
})(window.jQuery);