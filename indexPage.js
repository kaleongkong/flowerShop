window.onload = function(){
  mainNavBarLogic();
  mainInventoryContainerLogic();
  resizeinventoryListContainer();
  scrollDownButtonMainLogic();

  window.addEventListener("resize", function(){
    resizeinventoryListContainer();
  });
};

function resizeinventoryListContainer() {
  var inventoryContainers = document.getElementsByClassName('inventoryContainer');
  var inventoryListContainer = document.getElementsByClassName('inventoryListContainer')[0];
  inventoryListContainer.style.width = '80%';
  var inventoryContainerWidth = inventoryContainers[0].offsetWidth + 2 * (parseInt(window.getComputedStyle(inventoryContainers[0], null).margin) + 2)
  var inventoryListContainerWidth = inventoryListContainer.offsetWidth;
  var expectingInventoryListContainerWidth = Math.floor(inventoryListContainerWidth/inventoryContainerWidth) * inventoryContainerWidth;
  inventoryListContainer.style.width = expectingInventoryListContainerWidth;
  console.log(inventoryListContainer.style.width);
}