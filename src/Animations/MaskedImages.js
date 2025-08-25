import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const maskedImages = () => {
  const maskedImages = document.querySelectorAll('.manifesto_image_mask')

  maskedImages.forEach((maskedImage) => {
    ScrollTrigger.create({
      trigger: maskedImage,
      start: 'top 70%',
      end: 'bottom 70%',
      animation: gsap.to(maskedImage, {
        width: '0%',
        ease: 'power2.inOut',
        duration: 1.5,
      }),
    })
  })
}
