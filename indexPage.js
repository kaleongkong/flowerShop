window.onload = function(){
  mainNavBarLogic();
  mainInventoryContainerLogic();
  resizeinventoryListContainer();
  scrollDownButtonMainLogic();
  contactUs();

  window.addEventListener("resize", function(){
    resizeinventoryListContainer();
  });

  window.addEventListener("scroll", function(){
    var inventorySectionY = parseInt(document.getElementById("inventorySection").getBoundingClientRect().top);
    var navBarBgOverlay = document.getElementsByClassName("navBarBgOverlay")[0];
    var heightOfnavBar = parseInt(window.getComputedStyle(navBarBgOverlay, null).height);
    if (inventorySectionY <= heightOfnavBar ) {
      navBarBgOverlay.classList.remove('hidden');
      navBarBgOverlay.classList.add('transparent');
    } else {
      navBarBgOverlay.classList.add('hidden');
      navBarBgOverlay.classList.remove('transparent');
    }
  });
  var deepInput = document.getElementById('deep');
  var neutralInput = document.getElementById('neutral');
  var lightInput = document.getElementById('light');
  colorInputHelper(deepInput.value, neutralInput.value, lightInput.value);
  deepInput.addEventListener("change", function(e){
    var newColor = e.target.value;
    colorInputHelper(newColor, neutralInput.value, lightInput.value);
  });
  neutralInput.addEventListener("change", function(e){
    var newColor = e.target.value;
    colorInputHelper(deepInput.value, newColor, lightInput.value);
  });
  lightInput.addEventListener("change", function(e){
    var newColor = e.target.value;
    colorInputHelper(deepInput.value, neutralInput.value, newColor);
  });
};

function colorInputHelper(deep, neutral, light) {
  var css7 = ".title-color{color: "+deep+ " } ";
  var css8 = ".title-bg-color{background: "+deep+ " } ";

  var css5 = "a:link{color: "+light+ " } ";
  var css4 = ".navListItem a:visited{color: "+light+ " } ";
  var css6 = ".inventorySection{background: "+light+ " } ";

  var css9 = ".text-color{color: "+neutral+ " } ";
  var css0 = ".navShopName a:link{color: "+neutral+ " } ";
  var css1 = ".navShopName a:hover{color: "+neutral+ " } ";
  var css2 = ".navShopName a:visited{color: "+neutral+ " } ";
  var css3 = ".navListItem a:hover{color: "+neutral+ " } ";

  var style = document.createElement('style');
  var css = css0 + css1 + css2 + css3 + css4 + css5 + css6 + css7 + css8 + css9;
  if (style.styleSheet) {
      style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
}

function resizeinventoryListContainer() {
  var inventoryContainers = document.getElementsByClassName('inventoryContainer');
  var inventoryListContainer = document.getElementsByClassName('inventoryListContainer')[0];
  inventoryListContainer.style.width = '80%';
  var inventoryContainerWidth = inventoryContainers[0].offsetWidth + 2 * (parseInt(window.getComputedStyle(inventoryContainers[0], null).margin) + 2)
  var inventoryContainerHeight = inventoryContainers[0].offsetHeight + document.getElementsByClassName('inventorySelectContainer')[0].offsetHeight + document.getElementsByClassName('infoContainer')[0].offsetHeight;
  var inventoryListContainerWidth = inventoryListContainer.offsetWidth;
  var expectingInventoryListContainerWidth = Math.floor(inventoryListContainerWidth/inventoryContainerWidth) * inventoryContainerWidth;
  inventoryListContainer.style.width = expectingInventoryListContainerWidth;
  inventoryListContainer.style.height = Math.ceil(inventoryContainers.length / (expectingInventoryListContainerWidth / inventoryContainerWidth)) * inventoryContainerHeight;
  document.getElementsByClassName('inventorySection')[0].style.height = parseInt(inventoryListContainer.style.height) + 200;
}