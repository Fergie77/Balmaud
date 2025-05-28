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
  const triggerSection = document.querySelector('.main-wrapper')
  const footer = document.querySelector('footer')
  const footerHeight = footer.offsetHeight
  console.log(footerHeight)

  const tl = gsap.timeline({ paused: true })
  tl.fromTo(
    footer,
    { filter: 'brightness(0.5)' },
    { filter: 'brightness(1)', duration: 1, ease: 'none' }
  )

  ScrollTrigger.create({
    trigger: triggerSection,
    start: 'bottom bottom',
    end: `bottom+=${footerHeight} bottom`,
    scrub: true,
    animation: tl,
  })
}
