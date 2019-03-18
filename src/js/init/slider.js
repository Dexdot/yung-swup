import Slider from '../components/Slider';

const slider = new Slider();
slider.init('.actions-bar__slide');

$(document).on(
  'click',
  '.actions-bar__dots button',
  function onActionDotClick() {
    const $this = $(this);
    const index = $this.parent().index();

    // Toggle class
    $('.actions-bar__dots li').removeClass('active');
    $(`.actions-bar__dots li:nth-child(${index + 1})`).addClass('active');

    // Slide
    slider.hideActiveSlide();
    slider.updateActiveSlide(index);
    slider.showSlide();
  }
);
