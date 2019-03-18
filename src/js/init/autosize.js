// Textarea autosize
$(() => {
  $('.js-autosize')
    .on('change keyup keydown paste cut', 'textarea', function onAutosize() {
      const $this = $(this);
      const padding =
        +$this.css('padding-top').split('px')[0] +
        +$this.css('padding-bottom').split('px')[0];

      $this.height(0).height(this.scrollHeight - padding);
    })
    .find('textarea')
    .change();
});
