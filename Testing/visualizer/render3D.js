window.addEventListener('DOMContentLoaded', function() {
    // All the following code is entered here.
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    
    var scene = null;
    
    engine.runRenderLoop(function() {
        if (imageRead)
            scene = rebuildScene(engine, canvas);
        
        if (scene != null)
            scene.render();
    });
    
    window.addEventListener('resize', function() {
        engine.resize();
    });
});

// colors
// layer3 4ac34e
// layer2 35a043
// layer1 347941
// stone  737a89
// sand   eee9a9
// water  83e1c3

function rebuildScene(engine, canvas) {
    imageRead = false; 
    
    console.log("building new scene");
    
    if (mapJSON == null)
        return null;
    
    var createScene = function() {
        // Create a basic BJS Scene object.
        var scene = new BABYLON.Scene(engine);

        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        var camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 5,-10), scene);

        // Target the camera to scene origin.
        camera.setTarget(BABYLON.Vector3.Zero());

        // Attach the camera to the canvas.
        camera.attachControl(canvas, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
// 
//         // Create a built-in "sphere" shape. 
//         var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
// 
//         // Move the sphere upward 1/2 of its height.
//         sphere.position.y = 1;
// 
//         // Create a built-in "ground" shape.
//         var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:6, width:6, subdivisions: 2}, scene);
        
        buildTerrainMesh(scene);
        var water = BABYLON.MeshBuilder.CreateGround('water', {height:90, width:90, subdivisions: 2}, scene);
        water.position.x = 45;
        water.position.y = 0;
        water.position.z = 45;
        water.material = buildSimpleMaterial(hexToRGB("83e1c3"), scene);
        
        // test Mesh
        
        /*var vertices = [
            
        ];
        var polygonTriangles = new BABYLON.PolygonMeshBuilder(terrainTypes[i]+"_polygon"+j, vertices, scene);
        var polygonMesh = polygonTriangles.build(null, terrainTallness[i]);
        */    
        
        // Return the created scene.
        return scene;
    };
    
    return createScene();
}

function buildTerrainMesh(scene) {
    var terrainTypes =    ["level1",  "level2", "level3", "rock",  "sand"];
    var terrainTallness = { //[0.5,       2,        2,        0.6,     0.1]; // how high the layer is compared to the one beneath it
        "sand": 0.1,
        "rock": 0.6,
        "level1": 0.5,
        "level2": 2,
        "level3": 2
    };
    var terrainHeights  = { // how high the base of the layer is
        "sand": 0,
        "rock": terrainTallness["sand"],
        "level1": terrainTallness["sand"],
        "level2": terrainTallness["sand"]+terrainTallness["level1"],
        "level3": terrainTallness["sand"]+terrainTallness["level1"]+terrainTallness["level2"]
    };
    var terrainColors = { 
        "sand": hexToRGB("eee9a9"),
        "rock": hexToRGB("737a89"),
        "level1": hexToRGB("347941"),
        "level2": hexToRGB("35a043"),
        "level3": hexToRGB("4ac34e")
    };
    console.log("building from: ");
    console.log(mapJSON);
    
    // build materials from terrainColors
    var terrainMaterials = {
        "sand": buildSimpleMaterial(terrainColors["sand"], scene);
        "rock": buildSimpleMaterial(terrainColors["rock"], scene);
        "level1": buildSimpleMaterial(terrainColors["level1"], scene);
        "level2": buildSimpleMaterial(terrainColors["level2"], scene);
        "level3": buildSimpleMaterial(terrainColors["level3"], scene);
        
    };
    
    for(var i = 0; i < terrainTypes.length; i++) {
        var layerName = terrainTypes[i];
        var layer =  mapJSON["drawing"][layerName];
        
        console.log("building layer " + terrainTypes[i]);
        
        // each layer is an array of arrays
        // each element of layer is its own polygon
        // I can't express just how amazing it is that the json is set up like this
        // THANK YOU!! :)
        for(var j = 0; j < layer.length; j++) {
            var polygon = layer[j];
            
            console.log("polygon " + j);
            
            // This is SUUUUUUPER easy thanks to the way Happy Island Designer stores its data
            // and Babylon.js' PolygonMeshBuilder. Check this out:
            
            var vertices = [];
            for(var k = 0; k < polygon.length-1; k += 2) {
                vertices.push(new BABYLON.Vector2(polygon[k], polygon[k+1]));
            }
            
            // I DON'T EVEN NEED TO BUILD A HEIGHTMAP OR WORRY ABOUT CLIFFS
            // PolygonMeshBuilder CAN EXTRUDE!!!!!!!!
            // Thanks you guys, the Happy Island Designer dev and the Babylon.js devs. 
            // You guys made this so easy to do
            
            var polygonTriangles = new BABYLON.PolygonMeshBuilder(terrainTypes[i]+"_polygon"+j, vertices, scene);
            var polygonMesh = polygonTriangles.build(null, terrainTallness[layerName]);
            polygonMesh.position.y = terrainHeights[layerName] + (terrainTallness[layerName]/2.0); // meshes are positioned based on their centers, so in order to get a mesh's base at a certain height, you also have to add half of its height
        
            polygonMesh.material = terrainMaterials[layerName];
        }
    }
}


// below function modified from https://doc.babylonjs.com/babylon101/materials#color
function buildSimpleMaterial(color, scene) {
    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

    myMaterial.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2]);
    //myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    myMaterial.ambientColor = new BABYLON.Color3(color[0], color[1], color[2]);

    return myMaterial;
}

function hexToRGB(hex) {
    // I was lazy :P
    var parseDigit = {
        "0": 0, "1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "a":10, "b":11, "c":12, "d":13, "e":14, "f":15 
    };
    var color = [0,0,0];
    
    for (var i = 0; i < 6-1; i += 2) {
        var value = 16*parseDigit[hex[i]]+parseDigit[hex[i+1]];
        color[i/2] = value / 256.0;
    }
    
    return color;
}
