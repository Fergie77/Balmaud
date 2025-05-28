import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const navColourSwap = () => {
  const navWrapper = document.querySelector('.nav_fixed')
  const trigger = document.querySelector(
    '[balmaud-animation="nav-colour-swap"]'
  )

  ScrollTrigger.create({
    trigger: trigger,
    start: 'top top',
    end: 'bottom top',
    onLeave: () => {
      navWrapper.classList.add('is-white')
    },
    onEnterBack: () => {
      navWrapper.classList.remove('is-white')
    },
  })
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
