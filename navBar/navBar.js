function mainNavBarLogic() {
  // Array.from(document.getElementsByClassName('navBarContainer')).forEach(function(navBarContainer){
  //   Array.from(navBarContainer.getElementsByClassName('navItem')).forEach(function(navItem){
  //     navItem.addEventListener('mouseenter', function(e){
  //       handleHover(e.target)
  //     });
  //     navItem.addEventListener('mouseleave', function(e){
  //       resetFont(e.target)
  //     });
  //     navItem.addEventListener('mousedown', function(e){
  //       handleClick(e.target);
  //     });
  //     navItem.addEventListener('mouseup', function(e){
  //       handleHover(e.target)
  //     });
  //   });
  // });
}

// function handleClick(target) {
//   target = findAncestor(target, 'navItem');
//   target.style.textShadow = "2px 2px grey";
// }

// function handleHover(target) {
//   target = findAncestor(target, 'navItem');
//   resetFont(target);
//   console.log(target);
//   target.style.color = 'whitesmoke';
//   target.style.textShadow = "1px 1px grey";
// }

// function resetFont(target){
//   target = findAncestor(target, 'navItem');
//   var container = findAncestor (target, 'navBar');
//   Array.from(container.getElementsByClassName('navItem')).forEach(function(navItem){
//     target.style.color = 'black';
//     target.style.textShadow = "";
//   });
// }

function findAncestor (el, cls) {
  if (el.classList.contains(cls)) {
    return el;
  }
  while ((el = el.parentElement) && !(el.classList.contains(cls)));
  return el;
}