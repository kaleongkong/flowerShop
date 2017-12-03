var svgns = "http://www.w3.org/2000/svg";
function mainInventoryContainerLogic(){
  var inventorySelectContainers = document.getElementsByClassName('inventorySelectContainer');
  Array.from(inventorySelectContainers).forEach(function(inventorySelectContainer, i){
    var inventoryOptions = inventorySelectContainer.getElementsByClassName('inventoryOption');
    Array.from(inventoryOptions).forEach(function(option){
      var svg = document.createElementNS(svgns, "svg");
      svg.setAttribute('class', 'option')
      svg.setAttribute('width', 30);
      svg.setAttribute('height', 30);
      var circle = drawCircle();
      svg.appendChild(circle);
      option.appendChild(svg);
      circle.addEventListener('mouseenter', function(e){
        if (e.target == circle){
          hoverHandler(e);
        }
      });
      circle.addEventListener('click', function(e){
        if (e.target == circle){
          clickHandler(e);
        }
      });
      circle.addEventListener("mouseleave", function(e){
        if (e.target == circle){
          svgMouseLeaveHandler(e);
        }
      });
    });
    inventorySelectContainer.addEventListener("mouseleave", function(e){
      if (e.target == inventorySelectContainer){
        mouseLeaveHandler(e);
      }
    });
    focusView(inventoryOptions[0]);
    focusOption(inventoryOptions[0]);
  });
};

function svgMouseLeaveHandler(e) {
  var inventoryContainer = findAncestor(e.target, 'inventoryContainer');
  Array.from(inventoryContainer.getElementsByClassName('inventoryOption')).forEach(function(option){
    removeArc(option);
  });
}

function hoverHandler(e) {
  var target = findAncestor(e.target, 'inventoryOption');
  focusView(target);
}

function focusView(target) {
  var inventoryContainer = findAncestor(target, 'inventoryContainer');
  var numId = 0;
  Array.from(inventoryContainer.getElementsByClassName('inventoryOption') ).forEach(function(option, i){
    if (option == target) {
      numId = i;
    }
    removeArc(option);
  });
  var existingArc = target.getElementsByClassName('arc')[0];
  Array.from(inventoryContainer.getElementsByClassName('inventoryView')).forEach(function(view, i){
    if (i == numId) {
      if (!existingArc) {
        target.getElementsByClassName('option')[0].appendChild(drawArc());
      }
      view.style.display = 'inline';
    } else {
      view.style.display = 'none';
    }
  }.bind(this));
}

function clickHandler(e) {
  var target = findAncestor(e.target, 'inventoryOption');
  focusOption(target);
}

function focusOption(target) {
  var inventoryContainer = findAncestor(target, 'inventoryContainer');
  Array.from(inventoryContainer.getElementsByClassName('inventoryOption')).forEach(function(option){
    option.classList.remove('focus');
    var arcToRemove = option.getElementsByClassName('arc')[0];
    if (arcToRemove) {
      arcToRemove.remove();
    }
  });
  target.classList.add('focus');
  var arc = drawArc();
  arc.setAttributeNS(null, 'stroke', 'black');
  target.getElementsByClassName('option')[0].appendChild(arc);
}

function mouseLeaveHandler(e){
  var inventoryContainer = findAncestor(e.target, 'inventoryContainer');
  var inventorySelectContainer = findAncestor(e.target, 'inventorySelectContainer');
  var focusTarget = inventorySelectContainer.getElementsByClassName('focus')[0];
  if( focusTarget ){
    var focusTargetIndex = 0;
    Array.from(inventoryContainer.getElementsByClassName('inventoryOption')).forEach(function(option, i){
      if (option == focusTarget) {
        focusTargetIndex = i;
      }
      if (!option.classList.contains('focus')) {
        removeArc(option);
      }
    });
    Array.from(inventoryContainer.getElementsByClassName('inventoryView')).forEach(function(view, i){
      view.style.display = 'none';
      if (i == focusTargetIndex) {
        view.style.display = 'inline';
      }
    });
  }
}

function removeArc(option){
  if (!option.classList.contains('focus')) {
    var nonTargetArc = option.getElementsByClassName('arc')[0];
    if (nonTargetArc) {
      nonTargetArc.remove();
    }
  }
}

function drawCircle(){
  var shape = document.createElementNS(svgns, "circle");
  shape.setAttributeNS(null, "cx", 15);
  shape.setAttributeNS(null, "cy", 15);
  shape.setAttributeNS(null, "r",  10);
  shape.setAttributeNS(null, "fill", "gray");
  return shape;
}

function drawArc() {
  var arc = document.createElementNS(svgns, "path");
  arc.setAttributeNS(null, 'd', 'M 14.790571122752597 3.001827658123304 A 12 12 0 1 0 15 3');
  arc.setAttributeNS(null, 'fill', 'none');
  arc.setAttributeNS(null, 'stroke', 'gray');
  arc.setAttributeNS(null, 'stroke-width', 2);
  arc.setAttributeNS(null, 'class', 'arc');
  return arc;
}

function findAncestor (el, cls) {
  if (el.classList.contains(cls)) {
    return el;
  }
  while ((el = el.parentElement) && !(el.classList.contains(cls)));
  return el;
}

