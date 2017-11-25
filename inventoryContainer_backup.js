var svgns = "http://www.w3.org/2000/svg";
window.onload = function(){
  var inventorySelectContainer = document.getElementsByClassName('inventorySelectContainer')[0];
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
  focusOption(inventoryOptions[0]);
};

function svgMouseLeaveHandler(e) {
  var inventoryContainer = findAncestor(e.target, 'inventoryContainer');
  Array.from(inventoryContainer.getElementsByClassName('inventoryOption')).forEach(function(option){
    removeArc(option);
  });
}

function hoverHandler(e) {
  var inventoryContainer = findAncestor(e.target, 'inventoryContainer');
  var target = findAncestor(e.target, 'inventoryOption');
  var idParts = target.id.split('_');
  var numId = idParts[idParts.length-1];
  var existingArc = target.getElementsByClassName('arc')[0];
  Array.from(inventoryContainer.getElementsByClassName('inventoryView')).forEach(function(view){
    var viewIdParts = view.id.split('_');
    var viewNumId = viewIdParts[viewIdParts.length-1];
    if (viewNumId == numId) {
      if (!existingArc) {
        target.getElementsByClassName('option')[0].appendChild(drawArc('arc_' + numId));
      }
      view.style.display = 'inline';
    } else {
      var option = document.getElementById('option_' + viewNumId);
      removeArc(option);
      view.style.display = 'none';
    }
  }.bind(this));
}

function drawCircle(){
  var shape = document.createElementNS(svgns, "circle");
  shape.setAttributeNS(null, "cx", 15);
  shape.setAttributeNS(null, "cy", 15);
  shape.setAttributeNS(null, "r",  10);
  shape.setAttributeNS(null, "fill", "gray");
  return shape;
}

function drawArc(id) {
  var arc = document.createElementNS(svgns, "path");
  arc.setAttributeNS(null, 'd', 'M 14.790571122752597 3.001827658123304 A 12 12 0 1 0 15 3');
  arc.setAttributeNS(null, 'fill', 'none');
  arc.setAttributeNS(null, 'stroke', 'gray');
  arc.setAttributeNS(null, 'stroke-width', 2);
  arc.setAttributeNS(null, 'class', 'arc');
  arc.setAttributeNS(null, 'id', id);
  return arc;
}

function findAncestor (el, cls) {
  if (el.classList.contains(cls)) {
    return el;
  }
  while ((el = el.parentElement) && !(el.classList.contains(cls)));
  return el;
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
  var idParts = target.id.split('_');
  var numId = idParts[idParts.length-1];
  target.classList.add('focus');
  var arc = drawArc(numId);
  arc.setAttributeNS(null, 'stroke', 'black');
  target.getElementsByClassName('option')[0].appendChild(arc);
}

function mouseLeaveHandler(e){
  var inventoryContainer = findAncestor(e.target, 'inventoryContainer');
  var inventorySelectContainer = findAncestor(e.target, 'inventorySelectContainer');
  var focusTarget = inventorySelectContainer.getElementsByClassName('focus')[0];
  if( focusTarget ){
    var focusTargetId = focusTarget.id.split('_')[focusTarget.id.split('_').length - 1];
    Array.from(inventoryContainer.getElementsByClassName('inventoryView')).forEach(function(view){
      view.style.display = 'none';
    });
    Array.from(inventoryContainer.getElementsByClassName('inventoryOption')).forEach(function(option){
      if (!option.classList.contains('focus')) {
        removeArc(option);
      }
    });
    Array.from(inventoryContainer.getElementsByClassName('inventoryView')).forEach(function(view){
      var viewNumId = view.id.split('_')[view.id.split('_').length - 1];
      if (viewNumId == focusTargetId) {
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


