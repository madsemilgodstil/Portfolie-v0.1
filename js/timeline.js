var sliderOutput = document.getElementById('timeline-slider-output')

let has3dTransform = true,
  target

var timelineDragger = function () {
  var sliderInner = document.querySelector('.timeline-slider--inner'),
    sliderEl = document.querySelector('.timeline-slider')

  let sliderWidthHalf = sliderOutput.offsetWidth / 2,
    padding = 50,
    positionX = 0, // starting position,
    friction = 0.92,
    velocityX = 0,
    isDragging = false,
    autoDragging = false, // we need to keep track of whether the timeline is sliding automatically, so we know not to interfere with it
    dragPositionX = positionX,
    rightBound = sliderWidthHalf - padding,
    leftBound = -sliderEl.offsetWidth + sliderWidthHalf + padding,
    mousedownX,
    dragStartPositionX

  function update () {
    velocityX *= friction
    applyLeftBoundForce()
    applyRightBoundForce()
    applyDragForce()
    positionX += velocityX
  }

  function applyForce (force) {
    velocityX += force
  }

  function applyRightBoundForce () {
    if (autoDragging || isDragging || positionX < rightBound) {
      return
    }

    // bouncing past bound
    let distance = rightBound - positionX,
      force = distance * 0.088,
      // calculate resting position with this force
      restX = positionX + (velocityX + force) / (1 - friction)
    // apply force if resting position is out of bounds
    if (restX > rightBound) {
      applyForce(force)
    } else {
      // if in bounds, apply force to align at bounds
      force = distance * 0.088 - velocityX
      applyForce(force)
    }
  }

  function applyLeftBoundForce () {
    if (autoDragging || isDragging || positionX > leftBound) {
      return
    }

    // bouncing past bound
    let distanceXleft = leftBound - positionX,
      forceXleft = distanceXleft * 0.088,
      // calculate resting position with this force
      restXneg = positionX + (velocityX + forceXleft) / (1 - friction)

    if (restXneg < leftBound) {
      applyForce(forceXleft)
    } else {
      forceXleft = distanceXleft * 0.088 - velocityX
      applyForce(forceXleft)
    }
  }

  function applyDragForce () {
    if (!isDragging) {
      return
    }

    // check if inertia has stopped
    if (Math.floor(Math.abs(velocityX)) === 0) {
      autoDragging = false
    }

    let dragVelocity = dragPositionX - positionX,
      dragForce = dragVelocity - velocityX

    applyForce(dragForce)
  }

  function goToPosition (pos) {
    autoDragging = true

    var distance = pos - positionX
    var force = distance * 0.088
    applyForce(force)
  }

  // event delegate the clickable items
  sliderEl.addEventListener('click', function (e) {
    e.preventDefault()

    target = e.target

    if (target && target.nodeName === 'BUTTON') {
      if (!!sliderEl.querySelector('.active')) {
        // remove previously selected item, and add it to new one
        sliderEl.querySelector('.active').classList.remove('active')
      }

      target.classList.add('active')

      // get new item offset
      let x = target.offsetLeft - sliderWidthHalf + padding

      //console.log(x)
      goToPosition(-x)
      showSelectedArticle(target.id)
    }
  })

  sliderInner.addEventListener('mousedown', function (e) {
    isDragging = true
    autoDragging = false
    sliderInner.classList.add('dragging')
    mousedownX = e.pageX
    dragStartPositionX = positionX
    setDragPosition(e)
    window.addEventListener('mousemove', setDragPosition)
    window.addEventListener('mouseup', onMouseup)
  })

  sliderInner.addEventListener('touchstart', function (e) {
    isDragging = true
    autoDragging = false
    mousedownX = e.pageX
    dragStartPositionX = positionX
    setDragPosition(e)
    window.addEventListener('touchmove', setDragPosition)
    window.addEventListener('touchend', onTouchend)
  })

  function setDragPosition (e) {
    var moveX = e.pageX - mousedownX
    dragPositionX = dragStartPositionX + moveX
    e.preventDefault()
  }

  function onMouseup () {
    isDragging = false
    sliderInner.classList.remove('dragging')
    window.removeEventListener('mousemove', setDragPosition)
    window.removeEventListener('mouseup', onMouseup)
  }

  function onTouchend () {
    isDragging = false
    window.removeEventListener('touchmove', setDragPosition)
    window.removeEventListener('touchend', onTouchend)
  }

  function animate () {
    update()

    if (has3dTransform) {
      sliderEl.style.transform = 'translate3d(' + positionX + 'px,0,0)'
    } else {
      sliderEl.style.msTransform = 'translateX(' + positionX + 'px)' // ie9
      sliderEl.style.transform = 'translateX(' + positionX + 'px)'
    }

    requestAnimationFrame(animate)
  }

  animate()
}

var populate = function () {
  var ul = document.createElement('ul'),
    template = document.getElementById('timeline-template').innerHTML,
    articleOutput = document.getElementById('article-output'),
    articleOuter = document.createElement('div')

  window.timelineData.forEach(function (article) {
    // populate list of years

    let li = document.createElement('li'),
      button = document.createElement('button')

    button.id = article.year
    button.innerHTML = article.year

    li.appendChild(button)
    ul.appendChild(li)

    // populate articles

    let articleEl = document.createElement('article')

    articleEl.innerHTML = template
    articleEl.id = 'article-' + article.year

    articleEl.querySelector('#timeline--heading').innerHTML += article.heading
    articleEl.querySelector('#timeline--text').innerHTML += article.text
    articleEl.querySelector('img').src += article.img

    articleOuter.classList.add('article--outer')
    articleOuter.id = 'article--outer'
    articleOuter.appendChild(articleEl)
  })

  ul.classList.add('timeline-slider')
  articleOutput.appendChild(articleOuter)

  sliderOutput.appendChild(ul)

  // force click on latest item (presumably the latest year)
  setTimeout(() => {
    ul.lastElementChild.querySelector('button').click()
  }, 0)
}

var showSelectedArticle = function (selectedYear) {
  selectedYear = parseInt(selectedYear, 10)

  // hide existing article

  let previouslyActive = document
      .getElementById('article-output')
      .querySelector('.active'),
    articleOuter = document.getElementById('article--outer')

  if (!!previouslyActive) {
    previouslyActive.classList.remove('active')
  }

  // slide to new article

  let newActive = document.getElementById('article-' + selectedYear)

  //console.log(newActive.offsetLeft)

  if (has3dTransform) {
    articleOuter.style.transform =
      'translate3d(' + -newActive.offsetLeft + 'px,0,0)'
  } else {
    articleOuter.style.msTransform =
      'translateX(' + -newActive.offsetLeft + 'px)' // ie9
    articleOuter.style.transform = 'translateX(' + -newActive.offsetLeft + 'px)'
  }

  newActive.classList.add('active')
}

if (window.timelineData) {
  populate()
  timelineDragger()

  window.addEventListener(
    'resize',
    function () {
      showSelectedArticle(target.id)
    },
    750
  )
}
