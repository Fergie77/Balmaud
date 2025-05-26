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
