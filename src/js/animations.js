var triggerTimers = function(){
  [1000, 1300, 1700, 1900, 2000, 2400, 2600, 2700, 3300].forEach(function(delay){
    setTimeout(function(){
      Array.prototype.forEach.call(
            document.querySelectorAll('.animation .jsDelay' + delay),
            function(item){
              item.classList.add('isAnimated')
            }
      );
    }, delay)
  })
}

document.addEventListener("DOMContentLoaded", triggerTimers)
