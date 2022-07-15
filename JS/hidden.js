const hiddenShow = document.querySelector('.hamburger');
const closeHiddenMenu = document.querySelector('.cross');
const hiddenMenu = document.querySelector('.hidden');

hiddenShow.addEventListener('click', function(e) {
    e.preventDefault();
    hiddenMenu.classList.add('hidden--active');
})

closeHiddenMenu.addEventListener('click', function(e) {
    e.preventDefault();
    hiddenMenu.classList.remove('hidden--active');
})

$("[data-scroll-to]").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);
  
  hiddenMenu.classList.remove('hidden--active');

  performTransition(reqSection.index());
});