
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
      var target = document.querySelector(this.hash)
      var dest = target.offsetTop - 90
      scrollIt(dest, 1000, 'easeInOutQuint')
      menu.classList.remove('active');
    });
  });
  var scroll_watch = debounce(function(){
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var element = document.querySelector('header > div.fixed');
    if (scrollPosition > 180){
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

  initSlider(document.querySelector('.cards'))
  window.onresize = function(){
    initSlider(document.querySelector('.cards'))
  }

  var faq_container = document.querySelector('.questions')
  var questions     = faq_container.querySelectorAll('.question')
  var questions_cnt = questions.length;
  for(var i = 0; i < questions_cnt; i++){
    questions[i].querySelector('.title').addEventListener('click', function(e){
      e.preventDefault();
      var self = this.parentNode;
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
  });
});
