/**
4. social media icon.
*/

function contactUs() {
  var buttons = document.getElementsByClassName('emailUsSendButton');
  Array.from(buttons).forEach(function(button){
    button.addEventListener('mouseenter', function(e){
      e.target.style.backgroundColor = "#f45b41";
    });
    button.addEventListener('mouseleave', function(e){
      e.target.style.backgroundColor = "#e8554e";
    });
    button.addEventListener('mousedown', function(e){
      e.target.style.borderTop = "5px solid #28292A";
      e.target.style.borderBottom = "0px";
      // e.target.style.transform= "translateY(10%)";
    });
    button.addEventListener('mouseup', function(e){
      e.target.style.borderTop = "0px";
      e.target.style.borderBottom = "5px solid #9a3834";
      // e.target.style.transform= "translateY(0%)";
    });
  });
}