const slider = $('.slider__content').bxSlider({
  pager: false,
  controls: false,
});

$('.arrow--left').click((e) => {
  e.preventDefault();
  slider.goToPrevSlide();
})
$('.arrow--right').click((e) => {
  e.preventDefault();
  slider.goToNextSlide();
})