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
      animation: gsap.fromTo(
        maskedImage,
        {
          opacity: 1,
          width: '50%',
          ease: 'power2.inOut',
          duration: 1.5,
        },
        {
          opacity: 1,
          width: '0%',
          ease: 'power2.inOut',
          duration: 1.5,
        }
      ),
    })
  })
}

export const maskedProductImage = () => {
  const maskedImages = document.querySelectorAll(
    '[balmaud-animation="masked-product-image"]'
  )

  maskedImages.forEach((maskedImage) => {
    // Ensure mask styles are in place before animating
    const maskGradient = 'linear-gradient(90deg, #000 0%, #000 100%)'
    maskedImage.style.maskImage = maskGradient
    maskedImage.style.webkitMaskImage = maskGradient
    maskedImage.style.maskRepeat = 'no-repeat'
    maskedImage.style.webkitMaskRepeat = 'no-repeat'
    maskedImage.style.maskPosition = 'left center'
    maskedImage.style.webkitMaskPosition = 'left center'
    maskedImage.style.maskSize = '0% 100%'
    maskedImage.style.webkitMaskSize = '0% 100%'

    // Find the inner image to scale during the reveal
    const innerImage =
      maskedImage.querySelector('img') ||
      maskedImage.querySelector('picture img') ||
      null

    if (innerImage) {
      gsap.set(innerImage, { transformOrigin: 'center center', scale: 1 })
    }

    const tl = gsap.timeline()
    tl.to(
      maskedImage,
      {
        maskSize: '100% 100%',
        webkitMaskSize: '100% 100%',
        ease: 'power4.out',
        duration: 1.5,
        delay: 0.5,
      },
      0
    )

    if (innerImage) {
      tl.from(
        innerImage,
        {
          scale: 1.25,
          ease: 'power2.out',
          duration: 1.8,
        },
        0
      )
    }

    ScrollTrigger.create({
      trigger: maskedImage,
      start: 'top 70%',
      end: 'bottom 70%',
      animation: tl,
    })
  })
}
