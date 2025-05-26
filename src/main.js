import { contentFadeIn } from './Animations/Content'
import { navColourSwap } from './Animations/Nav'
import { fadeIn, splitFadeIn } from './Animations/Text'
import { Timeline } from './Animations/Timeline'

history.scrollRestoration = 'manual'

window.scrollTo(0, 0)

Timeline()
splitFadeIn(document, '[balmaud-animation="split-fade-in"]')
fadeIn(document, '[balmaud-animation="fade-in"]')
contentFadeIn()
navColourSwap()
