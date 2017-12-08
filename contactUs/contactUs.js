/**
4. social media icon.
5. background on the general info section.
*/

window.onload = function(){
  var buttons = document.getElementsByClassName('emailUsSendButton');
  Array.from(buttons).forEach(function(button){
    button.addEventListener('mouseenter', function(e){
      e.target.style.backgroundColor = "#f45b41";
    });
    button.addEventListener('mouseleave', function(e){
      e.target.style.backgroundColor = "#e8554e";
    });
    button.addEventListener('mousedown', function(e){
      e.target.style.borderBottom = "0px";
      e.target.style.transform= "translateY(10%)";
    });
    button.addEventListener('mouseup', function(e){
      e.target.style.borderBottom = "5px solid #9a3834";
      e.target.style.transform= "translateY(0%)";
    });
  });
}