// below function modified from clabe45 via https://stackoverflow.com/a/45931408
window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
          img.onload = imageIsLoaded;
          var json = loadJSONfromImage(img);
      }
  });
});

function loadJSONfromImage(image) {
  var mapJSONString = steg.decode(image.src, {
    height: image.height,
    width: image.width,
  });
  
  var json;
  try {
    json = JSON.parse(mapJSONString);
  } catch(e) {
    try {
        json = JSON.parse(LZString.decompressFromUTF16(mapJSONString))
    } catch (e) {
        json = JSON.parse(LZString.decompress(mapJSONString))
    }
  }
  
  return json;
}