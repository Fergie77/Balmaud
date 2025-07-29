import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const floatingCart = () => {
  const floatingCart = document.querySelector('.floating-add-to-cart_component')
  const floatingCartTrigger = document.querySelector(
    '.floating-add-to-cart_trigger'
  )

  const tl = gsap.timeline({
    paused: true,
  })

  tl.from(floatingCart, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
  })

  ScrollTrigger.create({
    trigger: floatingCartTrigger,
    start: 'top bottom',
    end: 'bottom 90%',
    animation: tl,
    scrub: 1,
  })
}
