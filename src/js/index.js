window.onscroll = function() {
  var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  var element = document.querySelector('header > div.fixed');
  if (scrollPosition > 80){
    element.classList.add('inverse')
  } else {
    element.classList.remove('inverse')
  }
}
