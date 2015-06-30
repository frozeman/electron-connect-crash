
document.addEventListener('DOMContentLoaded', function() {
    var w = document.getElementById('webview');
    w.setAttribute('preload', 'file://'+ __dirname +'/preloader.js');
    w.src = 'about:blank';//'http://google.com';

    w.addEventListener("dom-ready", function(){
      w.openDevTools();
    });
},false);
