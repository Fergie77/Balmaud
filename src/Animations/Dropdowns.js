export const dropdowns = () => {
  const dropdowns = document.querySelectorAll('.product-hero_dropdown')

  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector(
      '.product-hero_dropdown_toggle'
    )
    const dropdownNavigation = dropdown.querySelector(
      '.product-hero_dropdown_navigation'
    )

    if (dropdownToggle && dropdownNavigation) {
      dropdownToggle.addEventListener('click', () => {
        if (dropdownNavigation.classList.contains('is-open')) {
          dropdownNavigation.classList.remove('is-open')
        } else {
          dropdownNavigation.classList.add('is-open')
        }
      })
    }
  })
}
