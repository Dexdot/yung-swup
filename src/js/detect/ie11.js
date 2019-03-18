const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
export default isIE11;

if (isIE11) {
  document.querySelector('html').classList.add('ie11');
}
