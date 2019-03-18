import Accordion from '../components/accordion';

if ($('.accordion').length > 0) {
  $('.accordion__content').slideUp();

  $('.accordion-container').each((i, el) => {
    const accordion = new Accordion($(el));
  });
}
