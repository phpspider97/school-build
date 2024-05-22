(function () {
  setTimeout(() => {
    var myElement = document.getElementById("simple-bar"); 
    new SimpleBar(myElement, { autoHide: true });
  }, 100);
})();
 