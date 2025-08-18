import KeenSlider from 'keen-slider'

export const DiarySlider = () => {
  const diaryItemsLayout = document.querySelector('.diary_items_layout')
  let slider = null

  function initSlider() {
    if (slider || !diaryItemsLayout) return
    const items = diaryItemsLayout.querySelectorAll('.diary_item')
    if (!items.length) return

    slider = new KeenSlider(diaryItemsLayout, {
      loop: true,
      selector: '.diary_item',
      slides: {
        perView: 1.2,
        origin: 'center',
        spacing: 16,
      },
    })
  }

  function destroySlider() {
    if (!slider) return
    slider.destroy()
    slider = null
  }

  // Desktop off, otherwise on
  const desktopMq = window.matchMedia('(min-width: 992px)')

  function apply() {
    if (desktopMq.matches) destroySlider()
    else initSlider()
  }

  document.addEventListener('DOMContentLoaded', apply)
  desktopMq.addEventListener('change', apply)
}

export const ProductSlider = () => {
  const productHeroSlider = document.querySelector('.product-hero_slider')
  let slider = null
  function initSlider() {
    if (slider || !productHeroSlider) return
    const slides = productHeroSlider.querySelectorAll(
      '.product-hero_slider_slide'
    )
    if (!slides.length) return

    slider = new KeenSlider(productHeroSlider, {
      loop: true,
      selector: '.product-hero_slider_slide',
      slides: {
        perView: 1,
        origin: 'center',
        spacing: 0,
      },
    })
  }

  initSlider()
}
