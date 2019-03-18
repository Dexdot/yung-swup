export default class Tabs {
  init(selector) {
    this.$parent = $(selector);
    this.$tabs = this.$parent.find('.js-tab');
    this.$slides = this.$parent.find('.js-tab-slide');

    this.initEvents();
  }

  initEvents() {
    const self = this;

    this.$tabs.on('click', function onTabClick() {
      self.hideAll();
      const i = self.onClick(this);
      self.showSlide(i);
    });
  }

  hideAll() {
    this.$tabs.removeClass('active');
    this.$slides.removeClass('active');
  }

  showSlide(i) {
    this.$slides[i].classList.add('active');
  }

  onClick = context => {
    const index = $(context)
      .parent()
      .index();

    $(context).addClass('active');

    return index;
  };
}
