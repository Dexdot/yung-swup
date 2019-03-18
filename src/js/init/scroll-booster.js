// Init
$('.js-scroll').each((i, el) => {
  const viewport = el;
  const content = viewport.querySelector('.js-scroll-content');

  const sb = new window.ScrollBooster({
    viewport,
    content,
    friction: 0.1,
    mode: 'x',
    onUpdate: ({ position }) => {
      content.style.transform = `translateX(${-position.x}px)`;
    }
  });
});
