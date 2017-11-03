var initSlider = function(container){

  var elementVisible = function(parent, el) {
    let top = el.offsetTop
    let left = el.offsetLeft
    const width = el.offsetWidth
    const height = el.offsetHeight

    const ptop = parent.offsetTop
    const pleft = parent.offsetLeft
    const pwidth = parent.offsetWidth
    const pheight = parent.offsetHeight

    while(el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }
    return (
      left >= pleft &&
      (left + width) <= (pleft + pwidth)
    )
  }

  let items = container.querySelectorAll('li')
  let visible_items = 0
  const total = items.length
  Array.prototype.forEach.call(items, function(elm){
    (visible_items += (elementVisible(container, elm) ? 1 : 0))
  })
  const pages = Math.ceil(total / visible_items)

  const nav_container = document.querySelector('ul.navigation')
  Array.prototype.forEach.call(nav_container.querySelectorAll('li'), function(elm){
    nav_container.removeChild(elm)
  })
  container.scrollBy({left: -5000})
  // check if nav needed?
  if ((pages > 1) && (visible_items < total)){

    const dot = document.createElement('li')
    for(var i = 0; i < pages; i++){
      let clone = dot.cloneNode()
      if ((i==0 && container.scrollLeft == 0) || (i > 0 && container.scrollLeft > 0)){
        clone.classList.add('active')
      }
      nav_container.appendChild(clone)
      clone.addEventListener('click', function(e){
        Array.prototype.forEach.call(nav_container.querySelectorAll('li'), function(elm){
          elm.classList.remove('active')
        })
        this.classList.add('active')
        const i = Array.prototype.indexOf.call(nav_container.childNodes, e.target)
        // const len = container.querySelectorAll('li')[i].offsetLeft
        const len = container.querySelector('li').offsetWidth * i * visible_items - 1
        let xs = (i == 0) ? 0 :  len
        scrollV(container, xs, 1000, 'easeInOutQuint')
      })
    }
  }

}
