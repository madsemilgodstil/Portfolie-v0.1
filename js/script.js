var btn = document.getElementById('button')

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    btn.classList.add('show')
  } else {
    btn.classList.remove('show')
  }
})

btn.addEventListener('click', function (e) {
  e.preventDefault()
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
})

document.addEventListener('DOMContentLoaded', function () {
  var menuLink5 = document.querySelector('.link5')

  function isElementInViewport (el) {
    var rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  function updateMenuLinkColor () {
    var section5 = document.getElementById('section_5')

    if (section5 && isElementInViewport(section5)) {
      menuLink5.classList.add('active-link')
    } else {
      menuLink5.classList.remove('active-link')
    }
  }

  window.addEventListener('scroll', updateMenuLinkColor)
  window.addEventListener('resize', updateMenuLinkColor)

  // Initial call to set the initial state on page load
  updateMenuLinkColor()
})
