/// <reference path="liveMapNamespace.js" />
/// <reference path="openLayersMap.js" />

; (function ($) {

    var updateIndex = 0;
    var simulatedUpdates = [
        { id: "Vehicle1", coords: [-4.708710, 50.365963], course: 200, type: 'hgv' },
        { id: "Vehicle2", coords: [-4.517972, 50.340481], course: 260, type: 'hgv' },
        { id: "Vehicle3", coords: [-4.435468, 50.398065], course: 60, type: 'hgv' },
        { id: "Vehicle4", coords: [-4.501771, 50.353811], course: 310, type: 'hgv' },
        { id: "Vehicle5", coords: [-4.455723, 50.358897], course: 350, type: 'hgv' },

        { id: "Vehicle1", coords: [-4.715062, 50.364649], course: 250, type: 'hgv' },
        { id: "Vehicle2", coords: [-4.519153, 50.339810], course: 220, type: 'hgv' },
        { id: "Vehicle3", coords: [-4.414353, 50.396423], course: 110, type: 'hgv' },
        { id: "Vehicle4", coords: [-4.518637, 50.357809], course: 340, type: 'hgv' },
        { id: "Vehicle5", coords: [-4.455723, 50.364400], course: 0, type: 'hgv' },

        { id: "Vehicle1", coords: [-4.718495, 50.357641], course: 190, type: 'hgv' },
        { id: "Vehicle2", coords: [-4.520977, 50.338413], course: 210, type: 'hgv' },
        { id: "Vehicle3", coords: [-4.397573, 50.391718], course: 90, type: 'hgv' },
        { id: "Vehicle4", coords: [-4.524259, 50.365447], course: 350, type: 'hgv' },
        { id: "Vehicle5", coords: [-4.453449, 50.367028], course: 80, type: 'hgv' },

        { id: "Vehicle1", coords: [-4.721628, 50.353260], course: 200, type: 'hgv' },
        { id: "Vehicle2", coords: [-4.522436, 50.336947], course: 250, type: 'hgv' },
        { id: "Vehicle3", coords: [-4.373197, 50.392402], course: 80, type: 'hgv' },
        { id: "Vehicle4", coords: [-4.527993, 50.371934], course: 0, type: 'hgv' },
        { id: "Vehicle5", coords: [-4.445982, 50.370285], course: 20, type: 'hgv' },

        { id: "Vehicle1", coords: [-4.720619, 50.352274], course: 125, type: 'hgv' },
        { id: "Vehicle2", coords: [-4.524946, 50.335934], course: 270, type: 'hgv' },
        { id: "Vehicle3", coords: [-4.344616, 50.390432], course: 30, type: 'hgv' },
        { id: "Vehicle4", coords: [-4.533701, 50.375000], course: 310, type: 'hgv' },
        { id: "Vehicle5", coords: [-4.438428, 50.378031], course: 45, type: 'hgv' }
    ];

    var getNextUpdate = function()
    {
        var update = simulatedUpdates[updateIndex];
        updateIndex++;

        // loop back round at end of simulation
        if (updateIndex >= simulatedUpdates.length) {
            updateIndex = 0;
        }

        return update;
    }

    var simulateServerUpdate = function () {
        var update = getNextUpdate();
        console.log("Simulating server update " + JSON.stringify(update));
        liveMapData.map.instance.moveFeature(update.id, update.coords, update.course, update.type);
    };

    $(function () {
               
        liveMapData.map.instance = new liveMapData.map();
        liveMapData.map.instance.init();

        // do an update every second
        var simInterval = setInterval(function () {
            simulateServerUpdate();
        }, 1000);

        $(document).on("click", "#stop-button", function () {
            clearInterval(simInterval);
        });


    });
})(window.jQuery);