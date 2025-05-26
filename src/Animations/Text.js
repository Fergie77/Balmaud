import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const splitFadeIn = (container, selector) => {
  const text = container.querySelectorAll(selector)
  gsap.set(text, { opacity: 1 })

  text.forEach((element) => {
    const stagger = parseFloat(element.getAttribute('data-stagger')) || 0.005

    const splitText = new SplitText(element, {
      type: 'lines, words, chars',
      onSplit: (self) => {
        gsap.set(self.words, { opacity: 0, yPercent: 100 })
      },
      mask: 'words',
    })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 100%',
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
        })
      },
    })
  })
}

export const fadeIn = (container, selector) => {
  const text = container.querySelectorAll(selector)
  gsap.set(text, { opacity: 1 })

  text.forEach((element) => {
    gsap.set(element, { opacity: 0 })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom top',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        })
      },
    })
  })
}
