import Comparison from '../components/comparison-slider';

window.addEventListener('load', () => {
  const elements = document.querySelectorAll('.comparison');

  if (elements.length > 0) {
    const sliders = [];

    for (let i = 0; i < elements.length; i++) {
      sliders.push(new Comparison(elements[i]));
    }
  }
});
