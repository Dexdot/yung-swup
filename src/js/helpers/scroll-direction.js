let lastScrollTop = 0;
let scrollDirection = 0;
const getScrollDirection = () => scrollDirection;
const $window = $(window);

// Направление скролла
// -1: вверх
// 1: вниз
// Направление скролла

const checkScrollDirection = () => {
  const windowScrollTop = $window.scrollTop();
  if (windowScrollTop > lastScrollTop) {
    scrollDirection = 1;
  } else {
    scrollDirection = -1;
  }
  lastScrollTop = windowScrollTop;
};

$window.on('scroll', checkScrollDirection);

export default getScrollDirection;
