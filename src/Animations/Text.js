import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const splitFadeIn = (container, selector) => {
  const text = container.querySelectorAll(selector)
  gsap.set(text, { opacity: 1 })

  const isMobile = window.innerWidth <= 768 // Adjust breakpoint as needed
  const startValue = isMobile ? 'top 90%' : 'top 100%'

  text.forEach((element) => {
    const stagger = parseFloat(element.getAttribute('data-stagger')) || 0.005
    const revert = element.getAttribute('data-revert')

    const splitText = new SplitText(element, {
      type: 'lines, words',
      onSplit: (self) => {
        gsap.set(self.words, { opacity: 0, yPercent: 100 })
      },
      mask: 'words',
    })

    ScrollTrigger.create({
      trigger: element,
      start: startValue,
      end: 'bottom top',
      onEnter: () => {
        gsap.to(splitText.words, {
          yPercent: 0,
          duration: 1,
          stagger: stagger,
          ease: 'power2.inOut',
        })
        gsap.to(splitText.words, {
          opacity: 1,
          duration: 1,
          stagger: stagger * 2,
          ease: 'power2.inOut',
          onComplete: () => {
            if (revert) {
              console.log('revert')
              splitText.revert()
            }
          },
        })
      },
    })
  })
}

export const fadeIn = (container, selector) => {
  const text = container.querySelectorAll(selector)
  gsap.set(text, { opacity: 1 })

  text.forEach((element) => {
    const delay = parseFloat(element.getAttribute('data-delay')) || 0
    // If the element has [fade-in-sooner], use 'top 100%' as start, else use 'top 80%'
    const hasFadeInSooner = element.hasAttribute('fade-in-sooner')
    const startValue = hasFadeInSooner ? 'top 100%' : 'top 80%'

    gsap.set(element, { opacity: 0 })

    ScrollTrigger.create({
      trigger: element,
      start: startValue,
      end: 'bottom top',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          duration: 1,
          delay: delay,
          ease: 'power2.inOut',
        })
      },
    })
  })
}
