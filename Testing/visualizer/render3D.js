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

var meshes = [];

function rebuildScene(engine, canvas) {
    imageRead = false; 
    meshes = [];
    
    console.log("building new scene");
    
    if (mapJSON == null)
        return null;
    
    var createScene = function() {
        // Create a basic BJS Scene object.
        var scene = new BABYLON.Scene(engine);

        // Create a camera that doesn't move
        var camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 5,-10), scene);
        camera.attachControl(canvas, false);
        
        // set WASD key events to move meshes
        /******* Code modified from https://www.babylonjs-playground.com/#Y1W3F9 ***********************/

    
        var map = {}; //object for multiple key presses

        scene.actionManager = new BABYLON.ActionManager(scene);

    
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {

            map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

    
        }));

    
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {

            map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

        }));

    
    
        // move meshes
        scene.registerAfterRender(function () {

            var x = 0;
            var z = 0;
            if (map["w"] || map["W"]) {

                z += 0.1;

            }
    
            if (map["z"] || map["Z"]) {

                z -= 0.1;
            }
    
            if (map["a"] || map["A"]) {

                x -= 0.1;

            }

    
            if (map["s"] || map["S"]) {

                x += 0.1;

            }

            
            if (x != 0 || z != 0)
                moveMeshes(x, z);
        });

        /***************************** End borrowed code ***********************************************/


        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        
        // build the terrain
        buildTerrainMesh(scene);
        
        // build the objects
        // note: try/catch for debugging only
        try {
            buildObjectMeshes(scene);
        } catch (err) {
            console.log(err.message);
        }
            
        // set up the water
        var waterSize = 150;
        var water = BABYLON.MeshBuilder.CreateGround('water', {height:waterSize, width:waterSize, subdivisions: 2}, scene);
        water.position.x = waterSize/2.0;
        water.position.y = 0;
        water.position.z = -waterSize/2.0;
        water.material = buildSimpleMaterial(hexToRGB("83e1c3"), scene);
        meshes.push(water);
        
        // Return the created scene.
        return scene;
    };
    
    return createScene();
}

function moveMeshes(dx, dz) {
    for(var mesh in meshes) {
        mesh.position.x += dx;
        mesh.position.z += dz;
    }
}

var terrainTypes =    ["level1",  "level2", "level3", "rock",  "sand"];
var terrainTallness = { //[0.5,       2,        2,        0.6,     0.1]; // how high the layer is compared to the one beneath it
    "sand": 0.1,
    "rock": 0.6,
    "level1": 0.5,
    "level2": 2,
    "level3": 2
};
var terrainHeights = { // how high the base of the layer is
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

function buildTerrainMesh(scene) {
    
    console.log("building from: ");
    console.log(mapJSON);
    
    // build materials from terrainColors
    var terrainMaterials = {
        "sand": buildSimpleMaterial(terrainColors["sand"], scene),
        "rock": buildSimpleMaterial(terrainColors["rock"], scene),
        "level1": buildSimpleMaterial(terrainColors["level1"], scene),
        "level2": buildSimpleMaterial(terrainColors["level2"], scene),
        "level3": buildSimpleMaterial(terrainColors["level3"], scene)
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
            for(var k = polygon.length-2; k >= 2; k -= 2) {
                // the mesh was appearing inverted compared to the map, so I made every coordinate negative
                vertices.push(new BABYLON.Vector2(polygon[k], -polygon[k+1]));
            }
            
            // I DON'T EVEN NEED TO BUILD A HEIGHTMAP OR WORRY ABOUT CLIFFS
            // PolygonMeshBuilder CAN EXTRUDE!!!!!!!!
            // Thanks you guys, the Happy Island Designer dev and the Babylon.js devs. 
            // You guys made this so easy to do
            
            var polygonTriangles = new BABYLON.PolygonMeshBuilder(terrainTypes[i]+"_polygon"+j, vertices, scene);
            var polygonMesh = polygonTriangles.build(null, terrainTallness[layerName]);
            polygonMesh.position.y = terrainHeights[layerName] + (terrainTallness[layerName]/2.0); // meshes are positioned based on their centers, so in order to get a mesh's base at a certain height, you also have to add half of its height
        
            polygonMesh.material = terrainMaterials[layerName];
            
            meshes.push(polygonMesh);
        }
    }
}

function buildObjectMeshes(scene) {
    var outlineheightmap = getOutlineHeightMap();
    
    for(object in mapJSON["objects"]) {
        var objectCoords = mapJSON["objects"][object];
        for(var i = 0; i < objectCoords.length-1; i += 2) {
            
            var height = fillOutlineAndFindHeight(outlineheightmap, objectCoords[i], objectCoords[i+1]);
            
            // create a box at height "height"
            // with back left corner at x=[i] and z=[i+1]
            var box = BABYLON.MeshBuilder.CreateBox(object+"_"+(i/2), {}, scene);
            box.position.x = objectCoords[i];
            box.position.z = objectCoords[i+1];
            box.position.y = height;
            
            // put the box into meshes
            meshes.push(box);
        }
    }
}

function getOutlineHeightMap() {
    var outlineheightmap = {};
    
    for(var k = 0; k < terrainTypes.length; k++) {
        var layerName = terrainTypes[k];
        var layer =  mapJSON["drawing"][layerName];
        for(var i = 0; i < layer.length; i++) {
            for(var j = 0; j < layer[i].length-1; j += 2) {
                outlineheightmap[layer[i][j]+","+layer[i][j+1]] = terrainHeights[layerName];
            }
        }
    }
    
    return outlineheightmap;
}

function fillOutlineAndFindHeight(outlineheightmap, x, z) {
    
    var iterations = 0;
    var result = -1;
    var visited = Set();
    var frontier = [];
    frontier.push([x,z]);
    
    while (frontier.length > 0) {
        var coord = frontier.pop();
        var coordString = coord[0]+","+coord[1];
        visited.add(coordString);
        
        if (outlineheightmap.has(coordString)) {
            result = outlineheightmap[coordString];
            break;
        }
        
        var dx = [-1, 0, 1, 0];
        var dz = [0, -1, 0, 1];
        for (var i = 0; i < dx.length; i++) {
            if (visited.has( (x+dx[i])+","+(z+dz[i]) )) continue;
            frontier.push([x+dx[i], z+dz[i]]);
        }
        
        // infinite loop protection
        iterations++;
        if (iterations > 99999) {
            return 0;
        }
    }
    
    for (var coord in visited) {
        outlineheightmap[coord] = result;
    }
    
    return result;
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
/*
function registerWorldWarpShader() {
    BABYLON.Effect.ShadersStore["customVertexShader"]=                
        "precision highp float;\r\n"+

        "// Attributes\r\n"+
        "attribute vec3 position;\r\n"+
        "attribute vec2 uv;\r\n"+

        "// Uniforms\r\n"+
        "uniform mat4 worldViewProjection;\r\n"+

        "// Varying\r\n"+
        "varying vec2 vUV;\r\n"+

        "// adapted from https://alastaira.wordpress.com/2013/10/25/animal-crossing-curved-world-shader/\r\n"+
        "// This is where the curvature is applied\r\n"+
        "vec4 warp(vec4 v, float curvature)\r\n"+
        "{\r\n"+
        "    // Now adjust the coordinates to be relative to the camera position\r\n"+
        "    // I'm actually just going to freeze the camera and move the terrain instead\r\n"+
        "    vec4 vv = v.xyzw;\r\n"+

        "    // Reduce the y coordinate (i.e. lower the "height") of each vertex based\r\n"+
        "    // on the square of the distance from the camera in the z axis, multiplied\r\n"+
        "    // by the chosen curvature factor\r\n"+
        "    vv = vec4( 0.0f, (vv.z * vv.z) * - curvature, 0.0f, 0.0f );\r\n"+

        "    // Now apply the offset back to the vertices in model space\r\n"+
        "    v += worldViewProjection * vv;\r\n"+
        "    return v;\r\n"+
        "}\r\n"+

        "void main(void) {\r\n"+
        "    gl_Position = warp(worldViewProjection * vec4(position, 1.0), 0.01);\r\n"+

        "    vUV = uv;\r\n"+
        "}\r\n";


        BABYLON.Effect.ShadersStore["customFragmentShader"]=                "precision highp float;\r\n"+

        "varying vec2 vUV;\r\n"+

        "uniform sampler2D textureSampler;\r\n"+

        "void main(void) {\r\n"+
        "    gl_FragColor = texture2D(textureSampler, vUV);\r\n"+
        "}\r\n";

        // Compile
        var shaderMaterial = new BABYLON.ShaderMaterial
        (
            "shader", 
            scene, 
            {
                vertex: "custom",
                fragment: "custom",
            },
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            }
        );
}*/
