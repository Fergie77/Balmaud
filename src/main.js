import { contentFadeIn, heroBottleFadeIn } from './Animations/Content'
import { DiarySlider } from './Animations/DiarySlider'
import { dropdowns } from './Animations/Dropdowns'
import { floatingCart } from './Animations/FloatingCart'
import { navColourSwap, FooterFade } from './Animations/Nav'
import { fadeIn, splitFadeIn } from './Animations/Text'
import { Timeline } from './Animations/Timeline'

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

//mobileNav()
