import isIOS from '../detect/ios';

const html = document.querySelector('html');

const freezeVp = e => {
  e.preventDefault();
};
let unlock = null;

const disable = el => {
  if (isIOS) {
    unlock = window.locky.lockyOn(el);
  } else {
    html.classList.add('no-scroll');
    document.body.addEventListener('touchmove', freezeVp, false);
  }
};

const enable = () => {
  if (isIOS) {
    if (unlock) unlock();
  } else {
    html.classList.remove('no-scroll');
    document.body.removeEventListener('touchmove', freezeVp, false);
  }
};

export default { disable, enable };
