import gsap from 'gsap'

export const heroImageAnimation = () => {
  const heroImage = document.querySelectorAll('.hero_background-content')
  heroImage.forEach((image) => {
    gsap.from(image, {
      scale: 1.1,
      duration: 2,
      ease: 'power2.out',
    })
  })
}
