import KeenSlider from 'keen-slider'

export const DiarySlider = () => {
  // Get the diary items layout element
  const diaryItemsLayout = document.querySelector('.diary_items_layout')

  if (!diaryItemsLayout) {
    console.warn('Element with class "diary_items_layout" not found')
    return
  }

  // Get all child elements
  const children = Array.from(diaryItemsLayout.children)

  if (children.length === 0) {
    console.warn('No child elements found in diary_items_layout')
    return
  }

  // Initialize KeenSlider after a delay to ensure DOM has settled

  const items = diaryItemsLayout.querySelectorAll('.diary_item')
  if (items.length > 0) {
    new KeenSlider(diaryItemsLayout, {
      loop: true,
      slides: {
        perView: 1.2,
        origin: 'center',
        spacing: 16,
      },

      selector: '.diary_item',
    })
  }
}
