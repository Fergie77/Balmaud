import { contentFadeIn, heroBottleFadeIn } from './Animations/Content'
import { dropdowns } from './Animations/Dropdowns'
import { floatingCart } from './Animations/FloatingCart'
import { maskedImages } from './Animations/MaskedImages'
import { navColourSwap, FooterFade, mobileNav } from './Animations/Nav'
import { DiarySlider, ProductSlider } from './Animations/Sliders'
import { fadeIn, splitFadeIn } from './Animations/Text'
import { Timeline } from './Animations/Timeline'

console.log('main.js loaded')

history.scrollRestoration = 'manual'

window.scrollTo(0, 0)

Timeline()

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    setTimeout(() => {
      splitFadeIn(document, '[balmaud-animation="split-fade-in"]')
      fadeIn(document, '[balmaud-animation="fade-in"]')
      // Initialize diary slider after animations
      DiarySlider()
      ProductSlider()
      floatingCart()
      dropdowns()
    }, 10)
  })
} else {
  // Fallback for older browsers
  window.addEventListener('load', () =>
    setTimeout(() => {
      splitFadeIn(document, '[balmaud-animation="split-fade-in"]')
      fadeIn(document, '[balmaud-animation="fade-in"]')
      // Initialize diary slider after animations
      DiarySlider()
    }, 10)
  )
}

contentFadeIn()
heroBottleFadeIn()
navColourSwap()
FooterFade()
maskedImages()
mobileNav()
