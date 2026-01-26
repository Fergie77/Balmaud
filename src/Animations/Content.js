import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const contentFadeIn = () => {
  const content = document.querySelectorAll(
    '[balmaud-animation="content-fade-in"]'
  )
  content.forEach((element) => {
    // Hero images should be visible immediately for LCP
    // Check if this is a hero background wrapper (always at top of page)
    const isHeroWrapper = element.classList.contains('hero_background_wrapper')
    
    if (isHeroWrapper) {
      // Hero images must be visible immediately for LCP
      gsap.set(element, { filter: 'brightness(1)' })
    } else {
      // Other content can animate on scroll
      const rect = element.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      if (!isInViewport) {
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
      } else {
        gsap.set(element, { filter: 'brightness(1)' })
      }
    }
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
