import anime from 'animejs';

export default class Hero {
  constructor() {
    this.body = document.querySelector('body');
    this.toggle = this.body.querySelector('.js-delay');
    this.title = this.body.querySelector('.hero__title');
    this.items = this.body.querySelectorAll('.grid__item');
    this.images = this.body.querySelectorAll(
      '.grid__item:not(.js-no-scale) .img__inner'
    );
    this.squares = this.body.querySelectorAll(
      '.grid__item.js-no-scale .img__inner'
    );

    this.scale = 0.9;
    this.friction = 1 / 80;
    this.delay = anime.stagger(50, { from: 'center' });
    this.options = {
      targets: this.images,
      duration: 500,
      easing: 'cubicBezier(.56,.1,.31,1.02)',
      begin: () => {
        this.animating = true;
      },
      complete: () => {
        this.animating = false;
      }
    };

    this.x = 0;
    this.y = 0;
    this.followX = 0;
    this.followY = 0;

    this.animating = false;

    this.setup();
    this.animate();
  }

  setup() {
    // Mousemove
    this.body.addEventListener('mousemove', e => {
      this.mousemove(e);
    });

    // Mouseenter
    this.title.addEventListener('mouseenter', () => {
      if (!this.animating) {
        this.mouseenter();
      } else {
        setTimeout(() => {
          this.mouseenter();
        }, this.options.duration);
      }
    });

    // Mouseleave
    this.title.addEventListener('mouseleave', () => {
      if (!this.animating) {
        this.mouseleave();
      } else {
        setTimeout(() => {
          this.mouseleave();
        }, this.options.duration);
      }
    });

    // Click
    this.toggle.addEventListener('click', () => {
      if ('delay' in this.options) {
        delete this.options.delay;
        this.toggle.querySelector('span').textContent = 'enable';
      } else {
        this.options.delay = this.delay;
        this.toggle.querySelector('span').textContent = 'disable';
      }
    });
  }

  mousemove({ clientX, clientY }) {
    const mouseX = Math.max(
      -100,
      Math.min(100, window.innerWidth / 2 - clientX)
    );
    const mouseY = Math.max(
      -100,
      Math.min(100, window.innerHeight / 2 - clientY)
    );

    this.followX = (10 * mouseX) / 100;
    this.followY = (10 * mouseY) / 100;
  }

  mouseenter() {
    // Images
    anime({
      scale: [this.scale, 1],
      ...this.options
    });

    // Squares
    anime({
      scale: [1.2, 1],
      targets: this.squares,
      duration: this.options.duration,
      easing: this.options.easing
    });
  }

  mouseleave() {
    // Images
    anime({
      scale: [1, this.scale],
      ...this.options
    });

    // Squares
    anime({
      scale: [1, 1.2],
      targets: this.squares,
      duration: this.options.duration,
      easing: this.options.easing
    });
  }

  animate() {
    this.x += (this.followX - this.x) * this.friction;
    this.y += (this.followY - this.y) * this.friction;

    anime.set(this.items, {
      translateX: `${this.x}%`,
      translateY: `${-this.y}%`
    });

    this.RAF = requestAnimationFrame(this.animate.bind(this));
  }
}
