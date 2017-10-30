;

(function () {
  'use strict';

  var isInViewport = function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);
  };

  var debounce = function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  document.addEventListener("DOMContentLoaded", function () {
    var elements = Array.from(document.querySelectorAll('.scroll_watch'));
    Array.prototype.forEach.call(document.querySelectorAll('.navigation_link'), function (li) {
      li.querySelector('a').addEventListener('click', function (event) {
        event.preventDefault();
        li.classList.add('active');
        scrollIt(document.querySelector(this.hash), 1000, 'easeInOutQuint');
      });
    });
    var scroll_watch = debounce(function () {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      var element = document.querySelector('header > div.fixed');
      if (scrollPosition > 80) {
        element.classList.add('inverse');
      } else {
        element.classList.remove('inverse');
      }
      var sections = [];
      Array.prototype.forEach.call(elements, function (e) {
        document.querySelector('a[href*=' + e.id + ']').parentNode.classList.remove('active');
        var top = e.offsetTop;
        var bottom = top + e.offsetHeight;
        sections[e.id] = {
          top: top - top * 0.09,
          bottom: bottom - bottom * 0.1
        };
      });
      for (i in sections) {
        if (sections[i].top <= scrollPosition && sections[i].bottom >= scrollPosition) {
          document.querySelector('a[href*=' + i + ']').parentNode.classList.add('active');
        }
      }
    }, 25);
    window.addEventListener('scroll', scroll_watch);

    var slider = document.querySelector('.team_slider');
    var dot_count = slider.querySelectorAll('.js_slide').length;
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
          dot_container.childNodes[i].addEventListener('click', function (e) {
            var index = Array.prototype.indexOf.call(dot_container.childNodes, e.target);
            dot_navigation_slider.slideTo(index);
          });
        }
      }
      if (e.type === 'after.lory.slide') {
        for (var i = 0, len = dot_container.childNodes.length; i < len; i++) {
          dot_container.childNodes[i].classList.remove('active');
        }

        if (dot_container.childNodes[e.detail.currentSlide - 1]) {
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

    var faq_container = document.querySelector('.questions');
    var questions = faq_container.querySelectorAll('.question');
    var questions_cnt = questions.length;
    for (var i = 0; i < questions_cnt; i++) {
      questions[i].addEventListener('click', function (e) {
        e.preventDefault();
        var self = this;
        for (var x = 0; x < questions_cnt; x++) {
          if (questions[x] != self) {
            questions[x].classList.remove('active');
          }
        }
        self.classList.toggle('active');
      });
    }
  });

  function scrollIt(destination) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'linear';
    var callback = arguments[3];


    var easings = {
      linear: function linear(t) {
        return t;
      },
      easeInQuad: function easeInQuad(t) {
        return t * t;
      },
      easeOutQuad: function easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad: function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic: function easeOutCubic(t) {
        return --t * t * t + 1;
      },
      easeInOutCubic: function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart: function easeOutQuart(t) {
        return 1 - --t * t * t * t;
      },
      easeInOutQuart: function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint: function easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint: function easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
      },
      easeInOutQuint: function easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
    };

    var start = window.pageYOffset;
    var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      var now = 'now' in window.performance ? performance.now() : new Date().getTime();
      var time = Math.min(1, (now - startTime) / duration);
      var timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }
    scroll();
  }
})();