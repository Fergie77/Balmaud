import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Timeline = () => {
  const mm = window.matchMedia('(min-width: 480px)')
  let initialized = false

  // Helper to clear all ScrollTriggers related to Timeline
  const clearTimelineScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      // Only kill triggers related to timeline classes
      if (
        trigger.trigger &&
        (trigger.trigger.classList.contains('timeline_images_section') ||
          trigger.trigger.classList.contains('timeline_info_component'))
      ) {
        trigger.kill()
      }
    })
    // Also unpin the info wrapper if needed
    const pinTrigger =
      ScrollTrigger.getById && ScrollTrigger.getById('timeline-pin')
    if (pinTrigger) pinTrigger.kill()
  }

  // The main Timeline logic
  const runTimeline = () => {
    //const timeline = gsap.timeline({ paused: true })
    //timeline.fromTo('.timeline-item')
    const infoSections = gsap.utils.toArray('.timeline_info_component')
    const imageSections = gsap.utils.toArray('.timeline_images_section')
    // Pin the info wrapper for the whole timeline scroll
    ScrollTrigger.create({
      id: 'timeline-pin',
      trigger: imageSections[0],
      endTrigger: imageSections[imageSections.length - 1],
      start: 'top top',
      end: 'bottom bottom',
      pin: '.timeline_info_wrapper',
      pinSpacing: true,
      anticipatePin: 0.2,
      markers: true,
    })
    let lastIndex = 0 // Track the last visible section
    const fadeIn = (currentIndex) => {
      if (lastIndex !== currentIndex) {
        gsap.to(infoSections[lastIndex], {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
      gsap.to(infoSections[currentIndex], {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
      lastIndex = currentIndex
    }
    infoSections.forEach((section, idx) => {
      gsap.set(section, { opacity: idx === 0 ? 1 : 0 })
    })
    imageSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        end: 'bottom 30%',
        markers: true,
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
  }

  // Handler for matchMedia changes
  const handleMediaChange = (e) => {
    if (e.matches) {
      if (!initialized) {
        runTimeline()
        initialized = true
      }
    } else {
      clearTimelineScrollTriggers()
      initialized = false
    }
  }

  // Initial check
  handleMediaChange(mm)
  // Listen for changes
  mm.addEventListener('change', handleMediaChange)
}
