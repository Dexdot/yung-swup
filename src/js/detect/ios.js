const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
export default iOS;

if (iOS) {
  document.querySelector('html').classList.add('ios');
}
