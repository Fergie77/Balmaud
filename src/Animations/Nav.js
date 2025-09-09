import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const darkNavClass = 'w-variant-5bc79521-0627-45d0-3288-096227e51632'

const darkNavElements = [
  '.nav_background',
  '.nav_container',
  '.nav_brand',
  '.nav_button_icon',
  '.nav_link',
]

const isDarkNav = document.querySelector(darkNavElements[3])
  ? document.querySelector(darkNavElements[3]).classList.contains(darkNavClass)
  : false

let onDarkSection = false

export const navColourSwap = () => {
  const trigger = document.querySelector(
    '[balmaud-animation="nav-colour-swap"]'
  )

  if (!isDarkNav) {
    ScrollTrigger.create({
      trigger: trigger,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        onDarkSection = true
        darkNavElements.forEach((element) => {
          document.querySelector(element).classList.add(darkNavClass)
        })
      },
      onEnterBack: () => {
        onDarkSection = false
        darkNavElements.forEach((element) => {
          document.querySelector(element).classList.remove(darkNavClass)
        })
      },
    })
  }
}

export const FooterFade = () => {
  const mm = window.matchMedia('(min-width: 768px)')
  let st = null
  let tl = null

  const setup = () => {
    const triggerSection = document.querySelector('.main-wrapper')
    const footer = document.querySelector('footer')
    if (!triggerSection || !footer) return
    const footerHeight = footer.offsetHeight
    tl = gsap.timeline({ paused: true })
    tl.fromTo(
      footer,
      { filter: 'brightness(0.5)' },
      { filter: 'brightness(1)', duration: 1, ease: 'none' }
    )
    st = ScrollTrigger.create({
      trigger: triggerSection,
      start: 'bottom bottom',
      end: `bottom+=${footerHeight} bottom`,
      scrub: true,
      animation: tl,
    })
  }

  const cleanup = () => {
    if (st) {
      st.kill()
      st = null
    }
    if (tl) {
      tl.kill()
      tl = null
    }
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.filter = 'brightness(1)'
    }
  }

  const handleChange = (e) => {
    cleanup()
    if (e.matches) {
      setup()
    }
  }

  mm.addEventListener('change', handleChange)
  // Initial run
  if (mm.matches) {
    setup()
  }
}

export const mobileNav = () => {
  const navTrigger = document.querySelector('.nav_button')
  const navMenu = document.querySelector('.nav_menu')
  const navBackground = document.querySelector('.nav_menu_background')
  const navLinks = document.querySelectorAll('.nav_link')
  const navOverlay = document.querySelector('.w-nav-overlay')

  let navTimeline = null
  let observer = null
  let splitLinksArray = []

  function initNavAnimation() {
    if (navTimeline || !navTrigger || !navMenu || !navBackground) return

    // Create the timeline
    navTimeline = gsap.timeline({ paused: true })

    navTimeline.fromTo(
      navBackground,
      {
        pointerEvents: 'none',
        opacity: 0,
      },
      {
        pointerEvents: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onStart: () => {
          if (!isDarkNav && !onDarkSection) {
            darkNavElements.forEach((element) => {
              document.querySelector(element).classList.add(darkNavClass)
            })
          }
        },
      }
    )
    navTimeline.fromTo(
      navOverlay,
      {
        pointerEvents: 'none',
        opacity: 0,
      },
      {
        pointerEvents: 'auto',
        opacity: 1,
      },
      '<'
    )
    navTimeline.fromTo(
      navMenu,
      {
        pointerEvents: 'none',
        opacity: 0,
      },
      {
        pointerEvents: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onReverseComplete: () => {
          if (!isDarkNav && !onDarkSection) {
            darkNavElements.forEach((element) => {
              document.querySelector(element).classList.remove(darkNavClass)
            })
          }
        },
      },
      '<0.25'
    )

    function splitLinks() {
      navLinks.forEach((link) => {
        const splitLink = SplitText.create(link, {
          type: 'chars, words',
          charsClass: 'nav_link_char',
          wordsClass: 'nav_link_word',
          mask: 'words',
        })

        splitLinksArray.push(splitLink)
      })
    }

    function linksAnimation() {
      splitLinksArray.forEach((splitLink) => {
        navTimeline.fromTo(
          splitLink.chars,
          {
            opacity: 0,
            y: 10,
            scaleY: 1.1,
          },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.inOut',
            onComplete: () => {
              setTimeout(() => {
                splitLinksArray.forEach((splitLink) => {
                  splitLink.revert()
                })
              }, 100)
            },
          },
          '<'
        )
      })
    }

    function navAnimation(state) {
      if (state === 'open') {
        navTimeline.play()
        splitLinks()
        linksAnimation()
      } else if (state === 'close') {
        navTimeline.reverse()
      }
    }

    // Use MutationObserver to watch for class changes on navTrigger
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          if (navTrigger.classList.contains('w--open')) {
            navAnimation('open')
          } else {
            navAnimation('close')
          }
        }
      })
    })

    // Start observing the navTrigger for attribute changes
    observer.observe(navTrigger, {
      attributes: true,
      attributeFilter: ['class'],
    })

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navAnimation('close')
      })
    })
  }

  function destroyNavAnimation() {
    if (!navTimeline && !observer) return

    // Disconnect observer
    if (observer) {
      observer.disconnect()
      observer = null
    }

    // Kill timeline
    if (navTimeline) {
      navTimeline.kill()
      navTimeline = null
    }

    // Revert split text
    splitLinksArray.forEach((splitLink) => {
      splitLink.revert()
    })
    splitLinksArray = []

    // Reset styles
    if (navBackground) {
      gsap.set(navBackground, { clearProps: 'all' })
    }
    if (navMenu) {
      gsap.set(navMenu, { clearProps: 'all' })
    }
    navLinks.forEach((link) => {
      gsap.set(link, { clearProps: 'all' })
    })
  }

  // Desktop off, otherwise on
  const desktopMq = window.matchMedia('(min-width: 992px)')

  function apply() {
    if (desktopMq.matches) destroyNavAnimation()
    else initNavAnimation()
  }

  apply()
  desktopMq.addEventListener('change', apply)
}
