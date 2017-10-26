var isInViewport = function(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

document.addEventListener("DOMContentLoaded", function() {

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var element = document.querySelector('header > div.fixed');
    if (scrollPosition > 80){
      element.classList.add('inverse')
    } else {
      element.classList.remove('inverse')
    }
  }

  var slider        = document.querySelector('.team_slider');
  var dot_count     = slider.querySelectorAll('.js_slide').length;
  var dot_container = document.querySelector('ul.navigation');
  var dot_list_item = document.createElement('li');

  function handleDotEvent(e) {
      if (e.type === 'before.lory.init') {
        for (var i = 0, len = dot_count; i < len; i++) {
          var clone = dot_list_item.cloneNode();
          dot_container.appendChild(clone);
        }
        dot_container.childNodes[0].classList.add('active');
      }
      if (e.type === 'after.lory.init') {
        for (var i = 0, len = dot_count; i < len; i++) {
          dot_container.childNodes[i].addEventListener('click', function(e) {
            var index = Array.prototype.indexOf.call(dot_container.childNodes, e.target);
            // console.log(index)
            dot_navigation_slider.slideTo(index);
          });
        }
      }
      if (e.type === 'after.lory.slide') {
        for (var i = 0, len = dot_container.childNodes.length; i < len; i++) {
          dot_container.childNodes[i].classList.remove('active');
        }
        // console.log(e.detail)
        if (dot_container.childNodes[e.detail.currentSlide - 1]){
          dot_container.childNodes[e.detail.currentSlide - 1].classList.add('active');
        }
      }
      if (e.type === 'on.lory.resize') {
          for (var i = 0, len = dot_container.childNodes.length; i < len; i++) {
              dot_container.childNodes[i].classList.remove('active');
          }
          dot_container.childNodes[0].classList.add('active');
      }
  }
  slider.addEventListener('before.lory.init', handleDotEvent);
  slider.addEventListener('after.lory.init', handleDotEvent);
  slider.addEventListener('after.lory.slide', handleDotEvent);
  slider.addEventListener('on.lory.resize', handleDotEvent);


  var dot_navigation_slider = lory(slider, {
      infinite: 1,
      slidesToScroll: 1
  });
})
