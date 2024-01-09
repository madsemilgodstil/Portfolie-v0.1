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
  // Select all menu links
  var menuLinks = document.querySelectorAll('.nav_menu a')

  function isElementInViewport (el) {
    var rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  function updateMenuLinkColor () {
    // Select the section associated with "Tema 5"
    var section5 = document.getElementById('section_5')

    if (section5 && isElementInViewport(section5)) {
      // Add a class to all menu links to change color
      menuLinks.forEach(function (link) {
        if (!link.classList.contains('active-link')) {
          link.classList.add('new_color')
        }
      })
    } else {
      // Remove the class from all menu links if the section is not in the viewport
      menuLinks.forEach(function (link) {
        link.classList.remove('new_color')
      })
    }
  }

  window.addEventListener('scroll', updateMenuLinkColor)
  window.addEventListener('resize', updateMenuLinkColor)

  // Initial call to set the initial state on page load
  updateMenuLinkColor()
})

document.addEventListener('DOMContentLoaded', function () {
  var observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })

  document.querySelectorAll('.link').forEach(function (link) {
    var targetId = link.getAttribute('href').substring(1)
    var target = document.getElementById(targetId)

    if (target) {
      observer.observe(target)
    }
  })

  function handleIntersect (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Remove the 'active-link' class from all links
        document.querySelectorAll('.link').forEach(function (link) {
          link.classList.remove('active-link')
        })

        // Add the 'active-link' class to the link corresponding to the visible section
        var linkId = '#' + entry.target.id
        var activeLink = document.querySelector('a[href="' + linkId + '"]')
        if (activeLink) {
          activeLink.classList.add('active-link')
        }
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', function () {
  var observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })

  document.querySelectorAll('.h1_animate').forEach(function (h1Element) {
    observer.observe(h1Element)
  })

  function handleIntersect (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add a class to trigger the CSS animation
        entry.target.classList.add('animate')
      } else {
        // Remove the class if the element is not in the viewport
        entry.target.classList.remove('animate')
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', function () {
  // Get the buttons and sections
  const buttons = document.querySelectorAll('[id^="nextSectionButton"]')
  const sections = document.querySelectorAll('section')

  // Initialize the current section index
  let currentSectionIndex = 0

  // Function to scroll to the next section
  function nextSection () {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++
      sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Attach the function to each button click event
  buttons.forEach((button, index) => {
    button.addEventListener('click', nextSection)
  })
})
