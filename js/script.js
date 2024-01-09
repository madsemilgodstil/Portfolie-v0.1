// Funktion til at vise eller skjule "Tilbage til toppen" knappen baseret på scroll-position
var btn = document.getElementById('button')

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    btn.classList.add('show')
  } else {
    btn.classList.remove('show')
  }
})

// Funktion til at scrolle til toppen ved klik på "Tilbage til toppen" knappen
btn.addEventListener('click', function (e) {
  e.preventDefault()
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
})

document.addEventListener('DOMContentLoaded', function () {
  // Vælg alle menu-links
  var menuLinks = document.querySelectorAll('.nav_menu a')

  // Funktion til at kontrollere om et element er synligt i synsfeltet
  function isElementInViewport (el) {
    var rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  // Funktion til at opdatere farven på menu-links baseret på synlig sektion
  function updateMenuLinkColor () {
    // Vælg sektionen, der er forbundet med "Tema 5"
    var section5 = document.getElementById('section_5')

    if (section5 && isElementInViewport(section5)) {
      // Tilføj en klasse til alle menu-links for at ændre farve
      menuLinks.forEach(function (link) {
        if (!link.classList.contains('active-link')) {
          link.classList.add('new_color')
        }
      })
    } else {
      // Fjern klassen fra alle menu-links, hvis sektionen ikke er i synsfeltet
      menuLinks.forEach(function (link) {
        link.classList.remove('new_color')
      })
    }
  }

  window.addEventListener('scroll', updateMenuLinkColor)
  window.addEventListener('resize', updateMenuLinkColor)

  // Initial kald for at sætte den indledende tilstand ved indlæsning af siden
  updateMenuLinkColor()
})

document.addEventListener('DOMContentLoaded', function () {
  // Opret en observer for at håndtere synlighed af sektioner i menuen
  var observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })

  // Observer alle menu-links og associerede sektioner
  document.querySelectorAll('.link').forEach(function (link) {
    var targetId = link.getAttribute('href').substring(1)
    var target = document.getElementById(targetId)

    if (target) {
      observer.observe(target)
    }
  })

  // Funktion til at håndtere synlighedsændringer i observerede elementer
  function handleIntersect (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Fjern 'active-link'-klassen fra alle links
        document.querySelectorAll('.link').forEach(function (link) {
          link.classList.remove('active-link')
        })

        // Tilføj 'active-link'-klassen til linket, der svarer til den synlige sektion
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
  // Opret en observer for at håndtere synlighed af h1-elementer
  var observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })

  // Observer alle h1-elementer med 'h1_animate' klassen
  document.querySelectorAll('.h1_animate').forEach(function (h1Element) {
    observer.observe(h1Element)
  })

  // Funktion til at håndtere synlighedsændringer i observerede elementer
  function handleIntersect (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Tilføj en klasse for at udløse CSS-animationen
        entry.target.classList.add('animate')
      } else {
        // Fjern klassen, hvis elementet ikke er i synsfeltet
        entry.target.classList.remove('animate')
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', function () {
  // Hent alle knapper og sektioner
  const buttons = document.querySelectorAll('[id^="nextSectionButton"]')
  const sections = document.querySelectorAll('section')

  // Initialiser det nuværende sektionsindeks
  let currentSectionIndex = 0

  // Funktion til at rulle til næste sektion ved klik på knap
  function nextSection () {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++
      sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Vedhæft funktionen til hver knap-klikbegivenhed
  buttons.forEach((button, index) => {
    button.addEventListener('click', nextSection)
  })
})

function changeToVideo () {
  // Get the image element
  var imageElement = document.getElementById('mads1')

  // Create a video element
  var videoElement = document.createElement('video')
  videoElement.src = 'https://mheitmann.dk/assets/videosite_mads.webm'
  videoElement.controls = true // Show video controls

  // Set the video dimensions to match the image
  videoElement.width = imageElement.width
  videoElement.height = imageElement.height

  // Replace the image with the video
  imageElement.parentNode.replaceChild(videoElement, imageElement)
}
