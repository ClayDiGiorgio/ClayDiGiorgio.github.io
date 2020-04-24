window.addEventListener('DOMContentLoaded', function() {
    // All the following code is entered here.
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    
    var scene = null;
    
    engine.runRenderLoop(function() {
        if (imageRead)
            scene = rebuildScene();
        
        if (scene != null)
            scene.render();
    });
    
    window.addEventListener('resize', function() {
        engine.resize();
    });
});

function rebuildScene() {
    imageRead = false; 
    
    console.log("building new scene");
    
    if (mapJSON == null)
        return null;
    
    var createScene = function() {
        // Create a basic BJS Scene object.
        var scene = new BABYLON.Scene(engine);

        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5,-10), scene);

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

        // Return the created scene.
        return scene;
    };
    
    return createScene();
}

function buildTerrainMesh(scene) {
    var terrainTypes =    ["level1",  "level2", "level3", "rock",  "sand"];
    var terrainTallness = [0.5,       2,        2,        0.6,     0.1]; // how high the layer is compared to the one beneath it
    var terrainHeights  = [0          0.5,      2.5       0.6      0.0]; // how high the base of the layer is
    var terrainColors =   [[0,0,0],   [0,0,0],  [0,0,0]   [0,0,0], [0,0,0]];
    
    for(var i = 0; i < terrainTypes.length; i++) {
        var layer =  mapJSON["drawing"][terrainTypes[i]];
        
        // each layer is an array of arrays
        // each element of layer is its own polygon
        // I can't express just how amazing it is that the json is set up like this
        // THANK YOU!! :)
        for(var j = 0; j < layer.length; j++) {
            var polygon = layer[j];
            
            // This is SUUUUUUPER easy thanks to the way Happy Island Designer stores its data
            // and Babylon.js' PolygonMeshBuilder. Check this out:
            
            var vertices = [];
            for(var k = 0; k < polygon.length-1; k += 2) {
                vertices.append(new BABYLON.Vector2(polygon[j], polygon[j+1]));
            }
            
            // I DON'T EVEN NEED TO BUILD A HEIGHTMAP OR WORRY ABOUT CLIFFS
            // PolygonMeshBuilder CAN EXTRUDE!!!!!!!!
            // Thanks you guys, the Happy Island Designer dev and the Babylon.js devs. 
            // You guys made this so easy to do
            
            var polygonTriangles = new BABYLON.PolygonMeshBuilder(terrainTypes[i]+"_polygon"+j, vertices, scene);
            var polygonMesh = polygonTriangles.build(null, terrainTallness[i]);
            polygonMesh.position.y = terrainHeights[i];
        }
    }
}

