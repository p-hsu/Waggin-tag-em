$(document).ready(function(){
    $('.modal').modal();
  });

$(document).ready(function(){
  $('select').formSelect();
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
      edge:'left',
      draggable: false,
      inDuration: 200,
      outDuration: 150,
      onOpenStart: null,
      onOpenEnd: null,
      onCloseStart: null,
      onCloseEnd: null,
      preventScrolling: true
  });
});