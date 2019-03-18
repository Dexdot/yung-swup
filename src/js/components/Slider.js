export default class Slider {
  init(selector) {
    this.$slides = $(selector);

    this.index = 0;
    this.$activeSlide = this.$slides.eq(this.index);

    return this;
  }

  prev() {
    // Update index
    if (this.index <= 0) {
      this.index = this.$slides.length - 1;
    } else {
      this.index = this.index - 1;
    }

    this.hideActiveSlide();

    this.updateActiveSlide();

    // Show new active slide
    this.showSlide();
  }

  next() {
    // Update index
    if (this.index === this.$slides.length - 1) {
      this.index = 0;
    } else {
      this.index = this.index + 1;
    }

    this.hideActiveSlide();

    this.updateActiveSlide();

    // Show new active slide
    this.showSlide();
  }

  updateActiveSlide(i = this.index) {
    // Update active slide
    this.$activeSlide = this.$slides.eq(i);
  }

  hideActiveSlide() {
    // Прячем слайд
    this.$activeSlide.removeClass('active');
  }

  showSlide() {
    this.$activeSlide.addClass('active');
  }
}
