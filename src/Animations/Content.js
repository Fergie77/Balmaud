import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const contentFadeIn = () => {
  const content = document.querySelectorAll(
    '[balmaud-animation="content-fade-in"]'
  )
  content.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 100%',
      end: 'bottom top',
      onEnter: () =>
        gsap.to(element, {
          filter: 'brightness(1)',
          duration: 1,
          ease: 'none',
        }),
    })
  })
}

export const heroBottleFadeIn = () => {
  const content = document.querySelector('.hero_bottle_image')

  ScrollTrigger.create({
    trigger: content,
    start: 'top 100%',
    end: 'bottom top',
    onEnter: () =>
      gsap.to(content, {
        filter: 'brightness(1) blur(0px)',
        duration: 1,
        delay: 0.1,
        ease: 'none',
      }),
  })
}
