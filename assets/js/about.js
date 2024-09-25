require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/TileLayer",
    "esri/Basemap",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/request",
    "esri/Graphic",
    "dojo/domReady!" 
  ], function (Map, SceneView, TileLayer, Basemap, FeatureLayer, LayerList, request, Graphic) {
  
    const satelliteLayer = new TileLayer({
      url: "https:
      title: "satellite"
    });
  
    const fireflyLayer = new TileLayer({
      url: "https:
      title: "half-earth-firefly"
    });
  
    const basemap = new Basemap({
      baseLayers: [satelliteLayer, fireflyLayer],
      title: "half-earth-basemap",
      id: "half-earth-basemap"
    });
  
    const myPlaces = new FeatureLayer({
      url: 'https:
      outFields: ["*"], 
      popupTemplate: {
        title: "My Places: {place_name}", 
        content: [{
          type: "fields",
          fieldInfos: [
            {
              fieldName: "duration",
              label: "Time Spent (Days)"
            },
            {
              fieldName: "note",
              label: "Comments"
            },
            {
              fieldName: "reason",
              label: "Reason"
            },
            {
              fieldName: "date_year",
              label: "Date"
            }
          ]
        }]
      }
    });
  
    const map = new Map({
      basemap: basemap,
      layers: [myPlaces]
    });
  
    const view = new SceneView({
      map: map,
      container: "sceneContainer",
      environment: {
        atmosphereEnabled: false,
        background: {
          type: "color",
          color: [0, 10, 16]
        }
      },
      ui: {
        components: ["zoom"]
      }
    });
  
    const layerList = new LayerList({
      view: view
    });
  
    view.ui.add(layerList, {
      position: "top-right"
    });
  
    const uploadForm = document.getElementById("uploadForm");
  
    uploadForm.addEventListener("change", function (event) {
      const filePath = event.target.value.toLowerCase(); 
      if (filePath.indexOf(".zip") !== -1) {
        generateFeatureCollection(uploadForm);
      }
    });
  
    function generateFeatureCollection(uploadFormNode) {
      const generateRequestParams = {
        filetype: "shapefile",
        publishParameters: JSON.stringify({
          targetSR: view.spatialReference
        }),
        f: "json"
      };
      request("https:
        query: generateRequestParams,
        body: uploadFormNode,
        responseType: "json"
      }).then(function (response) {
        addShapefileToMap(response.data.featureCollection);
        console.log(response);
      });
    }
  
    function createFeaturesGraphics(layer) {
      return layer.featureSet.features.map(function (feature) {
        return Graphic.fromJSON(feature);
      });
    }
  
    function createFeatureLayerFromGraphic(graphics) {
      return new FeatureLayer({
        objectIdField: "FID",
        source: graphics,
        title: "User uploaded shapefile"
      });
    }
  
    function addShapefileToMap(featureCollection) {
      let sourceGraphics = [];
      const collectionLayers = featureCollection.layers;
      const mapLayers = collectionLayers.map(function (layer) {
        const graphics = createFeaturesGraphics(layer);
        sourceGraphics = sourceGraphics.concat(graphics);
        const featureLayer = createFeatureLayerFromGraphic(graphics);
        return featureLayer;
      });
      map.addMany(mapLayers);
      view.goTo({ target: sourceGraphics, tilt: 40 });
    }
  });
  