import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Timeline = () => {
  //const timeline = gsap.timeline({ paused: true })

  //timeline.fromTo('.timeline-item')

  const infoSections = gsap.utils.toArray('.timeline_info_component')
  const imageSections = gsap.utils.toArray('.timeline_images_section')

  //const animations = []

  // Pin the info wrapper for the whole timeline scroll
  ScrollTrigger.create({
    trigger: imageSections[0],
    endTrigger: imageSections[imageSections.length - 1],
    start: 'top top',
    end: 'bottom bottom',
    pin: '.timeline_info_wrapper',
    pinSpacing: true,
  })

  // Define fade in and fade out with animation, tracking last visible section
  let lastIndex = 0 // Track the last visible section

  const fadeIn = (currentIndex) => {
    if (lastIndex !== currentIndex) {
      gsap.to(infoSections[lastIndex], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    gsap.to(infoSections[currentIndex], {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    lastIndex = currentIndex
  }

  // Set all sections to opacity 0 except the first
  infoSections.forEach((section, idx) => {
    gsap.set(section, { opacity: idx === 0 ? 1 : 0 })
  })

  imageSections.forEach((section, index) => {
    // No need to set opacity here, handled above

    ScrollTrigger.create({
      trigger: section,
      start: 'top 30%',
      end: 'bottom 30%',

      onEnter: () => fadeIn(index),
      onEnterBack: () => fadeIn(index),
      onLeave: () => {
        if (index !== imageSections.length - 1)
          gsap.to(infoSections[index], {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
      },
      onLeaveBack: () => {
        if (index !== 0)
          gsap.to(infoSections[index], {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
      },
    })
  })

  // Instantly show the first section on load (handled above)
}
