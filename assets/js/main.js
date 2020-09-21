document.addEventListener('DOMContentLoaded', function(){

  ////// GET PLANTS FROM COCKPIT

  function getPlants(data){

    var gallery = document.querySelector("#plants .gallery");

    for(var i = 0; i < data.entries.length; i++) {

      var newPlant = document.createElement("div");
      newPlant.classList.add("plant");
      newPlant.innerHTML = "" + data.entries[i].svg + "";
      gallery.appendChild(newPlant);

    }

    ////// MAKE EVERY PLANT VISIBLE

    var plantsFill = document.querySelectorAll('#plants [fill]');
    for (var i = 0; i < plantsFill.length; i++) {
      var fill = plantsFill[i].getAttribute('fill');
      if(fill != "none"){
        plantsFill[i].setAttribute("fill", "#C4F8BC");
      }
    }

  }

  load_data(getPlants);


  ///// CREATE CIRCLE //////
  ///// CREATE CIRCLE //////
  ///// CREATE CIRCLE //////
  ///// CREATE CIRCLE //////

  // Make insertAfter possible
  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  ///// INITIATE VALUES //////

  var ringCount = 1;
  var ring = [];
  var panels = document.querySelectorAll('.panel');

  ///// SKULL CONSTRUCTOR //////

  function createSkull(dash, ringRadius, shapeSize, shapeCount, rotation, theShape){

    let drawing = document.getElementById('drawing');
    var shape = [];
    var canvas = SVG().addTo('#drawing').size('100%', '100%').viewbox(0,0,800,800)
    for (var i = 0; i < shapeCount; i++) {
      if(theShape == "square"){
        shape[i] = canvas.rect(shapeSize, shapeSize);
      }
      if(theShape == "ellipse"){
        shape[i] = canvas.ellipse(shapeSize, shapeSize);
      }
      if(theShape == "triangle"){
        shape[i] = canvas.polygon(''+ shapeSize*0.9 +',0 ' + 0 + ',' + (-shapeSize/2) + ' ' + 0 + ','+ shapeSize/2 +'');
      }
      if(theShape == "rectangle"){
        shape[i] = canvas.rect(shapeSize, shapeSize/20);
      }
      shape[i].fill('#C4F8BC')
    }
    var path = canvas.path("M 150, 150 m -" + ringRadius + ", 0 a " + ringRadius + "," + ringRadius + " 0 1,0 " + (ringRadius*2) + ",1 a " + ringRadius + "," + ringRadius + " 0 1,0 -" + (ringRadius*2) + ",0")
    var length = path.length();
    path.center(800/2, 800/2)
    if (dash == 1) {
      path.fill('none').stroke({ width: 1, color: '#C4F8BC', dasharray: '5,5' })
    }
    else{
      path.fill('none')
    }

    eased = function(t){ return t*(2-t); };

    for (var i = 0; i < shapeCount; i++) {
      var p = [];
      var shapeR = parseInt(rotation, 10);
      var shapePos = (((length/(shapeCount)) * ( i + 1 )));
      p[i] = path.pointAt(shapePos);
      var shapeX = parseInt(p[i].x, 10);
      var shapeY = parseInt(p[i].y, 10);
      shape[i].center(shapeX, shapeY);
      shape[i].rotate(-(360/shapeCount)*(i+1));
    }

    canvas.rotate(rotation, 0, 0);

  }

  createSkull(1, 250, 60, 6, 0, "square");

  ////// GET INDEX IN PARENT ///////

  function getNodeindex( elm ){
    var c = elm.parentNode.children, i = 0;
    for(; i < c.length; i++ )
    if( c[i] == elm ) return i;
  }

  /////// VARIATORS ////////

  function variators(){
    var input = document.querySelectorAll('input');

    input.forEach(function (e, index) {

      e.addEventListener('input',
      function () {

        // Clear svgs

        document.getElementById('drawing').innerHTML = "";

        for (var i = 0; i < ringCount; i++) {

          ///// Get the corresponding nth plant
          var parent = e.parentNode.parentNode;
          var indexRing = getNodeindex(parent);

          ///// Delete the actual corresponding plant in the canvas
          //
          // var theSvg = document.querySelectorAll('#drawing svg')[indexRing];
          // theSvg.parentNode.removeChild(theSvg);

          ///// Initiate cursors value

          var cursorOne = document.getElementsByClassName('inputRing')[i].value;
          var cursorTwo = document.getElementsByClassName('inputSize')[i].value;
          var cursorThree = document.getElementsByClassName('inputCount')[i].value;
          var cursorFour = document.getElementsByClassName('inputRotation')[i].value;
          var shapeChoice = document.getElementsByClassName('selected')[i].getAttribute("data-shape");

          ///// Get if Structure is checked

          var check = document.getElementById("dashed").checked;

          ///// Construct new plant

          if(check == true){
            createSkull(1, cursorOne, cursorTwo, cursorThree, cursorFour, shapeChoice);
          }
          else{
            createSkull(0, cursorOne, cursorTwo, cursorThree, cursorFour, shapeChoice);
          }

        }
      }
    );

  });
}

variators();

/////// Change shape of ring

function innerShape(){

  var shapeSelected = document.querySelectorAll('.shape');

  shapeSelected.forEach(function (e, index) {

    e.addEventListener('click',
    function () {

      //// Get nth inside parent

      var parent = e.parentNode.parentNode;
      var indexShape = getNodeindex(parent);
      var shapesParent = document.querySelectorAll('.shapes')[indexShape].querySelectorAll(".shape");

      for (var i = 0; i < shapesParent.length; i++) {
        shapesParent[i].classList.remove("selected");
      }

      e.classList.add("selected");

      document.getElementById('drawing').innerHTML = "";

      // Re-initialize variators
      variators();

      var cursorOne = document.getElementsByClassName('inputRing')[(indexShape)].value;
      var cursorTwo = document.getElementsByClassName('inputSize')[(indexShape)].value;
      var cursorThree = document.getElementsByClassName('inputCount')[(indexShape)].value;
      var cursorFour = document.getElementsByClassName('inputRotation')[(indexShape)].value;
      var shapeChoice = document.getElementsByClassName('selected')[(indexShape)].getAttribute("data-shape");

      ///// Get if Structure is checked

      var check = document.getElementById("dashed").checked;

      ///// Construct new plant

      if(check == true){
        createSkull(1, cursorOne, cursorTwo, cursorThree, cursorFour, shapeChoice);
      }
      else{
        createSkull(0, cursorOne, cursorTwo, cursorThree, cursorFour, shapeChoice);
      }

    });

  });

}

innerShape();

/////// ADD A NEW RING ///////

document.getElementById('new').onclick = function() {

  ringCount = ringCount + 1;
  var panels = document.querySelectorAll('.panel').length;

  // Create a clone of element
  let clone = document.querySelector('.panel').cloneNode( true );

  // Append the newly created element on the list
  document.querySelector('.panels').appendChild( clone );

  // Change the # of this new panel
  document.getElementsByClassName('number')[panels].innerHTML = (panels + 1);

  // Re-initialize variators and inner shape
  variators();
  innerShape();

  var cursorOne = document.getElementsByClassName('inputRing')[(ringCount - 1)].value;
  var cursorTwo = document.getElementsByClassName('inputSize')[(ringCount - 1)].value;
  var cursorThree = document.getElementsByClassName('inputCount')[(ringCount - 1)].value;
  var cursorFour = document.getElementsByClassName('inputRotation')[(ringCount - 1)].value;
  var shapeChoice = document.getElementsByClassName('selected')[(ringCount - 1)].getAttribute("data-shape");

  ///// Get if Structure is checked

  var check = document.getElementById("dashed").checked;

  ///// Construct new plant

  if(check == true){
    createSkull(1, cursorOne, cursorTwo, cursorThree, cursorFour, shapeChoice);
  }
  else{
    createSkull(0, cursorOne, cursorTwo, cursorThree, cursorFour, shapeChoice);
  }

}

/////// DOWLNOAD PLANT ///////
/////// DOWLNOAD PLANT ///////
/////// DOWLNOAD PLANT ///////
/////// DOWLNOAD PLANT ///////
/////// DOWLNOAD PLANT ///////


////// Initialize matrice

function matrice(){
  document.querySelector("#matrice svg").innerHTML = "";

  for (var i = 0; i < ringCount; i++) {

    var thisSvg = document.querySelector('#drawing');

    var htmlNode = thisSvg.innerHTML;
    let newStroke = htmlNode.replaceAll('stroke-width="1"', 'stroke-width="0"');
    let newColor = newStroke.replaceAll('fill="#c4f8bc"', 'fill="#125347"');
    let eraseSvg = newColor.replaceAll('xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"', '');
    let makeSymbol = eraseSvg.replaceAll('svg', 'g');
    let origin = makeSymbol.replaceAll('width="100%"', 'style="transform-origin: center;" width="100%"');

    document.querySelector("#matrice svg").innerHTML =   document.querySelector("#matrice svg").innerHTML + origin;

  }
}

////// Download png

var svg = document.querySelector('#matrice svg');

document.getElementById('png').addEventListener('click', function () {
  matrice();
  var canvas = document.getElementById('theCanvas');
  svg.setAttribute('width', 2000);
  svg.setAttribute('height', 2000);
  canvas.width = 2000;
  canvas.height = 2000;
  var data = new XMLSerializer().serializeToString(svg);
  var win = window.URL || window.webkitURL || window;
  var img = new Image();
  var blob = new Blob([data], { type: 'image/svg+xml' });
  var url = win.createObjectURL(blob);
  img.onload = function () {
    canvas.getContext('2d').drawImage(img, 0, 0);
    win.revokeObjectURL(url);
    var uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = uri
    a.download = (svg.id || 'untitled') + '.png';
    a.click();
    window.URL.revokeObjectURL(uri);
    document.body.removeChild(a);
  };
  img.src = url;
});

////// Copy matrice to cockpit

document.querySelector("#library").addEventListener('click', function () {

  matrice();

  var savesvg = document.querySelector("#matrice").innerHTML;

  save_data({
    date: "2020-06-03",
    svg: savesvg
  }, test)

});

}, false);
