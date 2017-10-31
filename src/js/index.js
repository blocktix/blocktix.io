
var debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var menu = document.querySelector('.mobile')
  var elements = Array.from(document.querySelectorAll('.scroll_watch'))
  Array.prototype.forEach.call(document.querySelectorAll('.navigation_link'), function(li){
    li.querySelector('a').addEventListener('click', function(event){
      event.preventDefault()
      li.classList.add('active')
      scrollIt(document.querySelector(this.hash), 1000, 'easeInOutQuint')
      menu.classList.remove('active');
    });
  });
  var scroll_watch = debounce(function(){
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var element = document.querySelector('header > div.fixed');
    if (scrollPosition > 80){
      element.classList.add('inverse')
    } else {
      element.classList.remove('inverse')
    }
    var sections = []
    Array.prototype.forEach.call(elements, function(e) {
      document.querySelector('a[href*=' + e.id + ']').parentNode.classList.remove('active')
      var top = e.offsetTop
      var bottom = top + e.offsetHeight
      sections[e.id] = {
        top: top * 0.91,
        bottom: bottom * 0.9
      }
    });
    for (i in sections) {
      if (sections[i].top <= scrollPosition && sections[i].bottom >= scrollPosition) {
        document.querySelector('a[href*=' + i + ']').parentNode.classList.add('active')
      }
    }
  }, 25);
  window.addEventListener('scroll', scroll_watch);

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
            dot_navigation_slider.slideTo(index);
          });
        }
      }
      if (e.type === 'after.lory.slide') {
        for (var i = 0, len = dot_container.childNodes.length; i < len; i++) {
          dot_container.childNodes[i].classList.remove('active');
        }

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

  var faq_container = document.querySelector('.questions')
  var questions     = faq_container.querySelectorAll('.question')
  var questions_cnt = questions.length;
  for(var i = 0; i < questions_cnt; i++){
    questions[i].addEventListener('click', function(e){
      e.preventDefault();
      var self = this;
      for(var x = 0; x < questions_cnt; x++){
        if (questions[x] != self){
          questions[x].classList.remove('active')
        }
      }
      self.classList.toggle('active');
    })
  }


  document.querySelector('.toggle_menu').addEventListener('click', function(e){
    e.preventDefault();
    menu.classList.toggle('active');
  })

})
