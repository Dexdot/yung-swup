/* eslint-disable */

const gulp = require('gulp');
const browserSync = require('browser-sync');
const devip = require('dev-ip');
const fileinclude = require('gulp-file-include');
const notify = require('gulp-notify');

const del = require('del');
const named = require('vinyl-named');
const rename = require('gulp-rename');

const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const mmq = require('gulp-merge-media-queries');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const svgstore = require('gulp-svgstore');
const svgo = require('gulp-svgo');

const pth = require('path');

const path = {
  js: 'src/js',
  html: 'src/html',
  sass: 'src/sass',
  css: 'src/css',
  sprite: 'src/sprite'
};

const jsSubfolders = [
  'components',
  'helpers',
  'init',
  'observer',
  'pages',
  'polyfill',
  'router'
];

// Server
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      host: devip(),
      baseDir: 'src'
    },
    notify: false
  });
});

// HTML
gulp.task('html', () =>
  gulp
    .src([`${path.html}/pages/*.html`])
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: '@',
        basepath: '@file'
        // context: {
        //   webRoot: 'http://che.devproject.ru'
        // }
      })
    )
    .pipe(gulp.dest('./src/'))
);

// JS
gulp.task('js', () =>
  gulp
    .src(`./${path.js}/pages/*.js`)
    .pipe(plumber())
    .pipe(named())
    .pipe(
      webpackStream({
        module: {
          rules: [
            {
              exclude: /node_modules/,
              loader: 'babel-loader',
              test: /\.(js)$/
            }
          ]
        }
      })
    )
    .pipe(gulp.dest(`./${path.js}`))
    .pipe(browserSync.reload({ stream: true }))
);

// JS Minify
gulp.task('js-min', () =>
  gulp
    .src(`./${path.js}/pages/*.js`)
    .pipe(plumber())
    .pipe(named())
    .pipe(
      webpackStream(
        {
          module: {
            rules: [
              {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.(js)$/
              }
            ]
          },
          mode: 'production'
        },
        webpack
      )
    )
    .pipe(gulp.dest(`./${path.js}`))
    .pipe(browserSync.reload({ stream: true }))
);

// SASS
gulp.task('sass', () =>
  gulp
    .src(`${path.sass}/**/*.sass`)
    .pipe(
      sass({ outputStyle: 'expand', precision: 5 }).on(
        'error',
        notify.onError()
      )
    )
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        })
      ])
    )
    .pipe(
      mmq({
        log: true
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({ stream: true }))
);

// SVG Sprite
gulp.task('sprite', () => {
  return gulp
    .src(`${path.sprite}/i-*.svg`)
    .pipe(plumber())
    .pipe(
      svgo({
        plugins: [
          { removeAttrs: { attrs: ['fill', 'fill-rule', 'stroke', 'style'] } }
        ]
      })
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(`${path.sprite}/`));
});

gulp.task('removedist', () => del.sync('dist'));

// Watcher
gulp.task('watch', ['html', 'js', 'sass', 'sprite', 'browser-sync'], () => {
  // Styles
  gulp.watch(`${path.sass}/**/*.sass`, ['sass']);

  // SVG
  gulp.watch(`${path.sprite}/i-*.svg`, ['sprite']);

  // JS
  jsSubfolders.forEach(subfolder => {
    gulp.watch([`${path.js}/${subfolder}/**/*.js`], ['js']);
  });

  // HTML
  gulp.watch(`${path.html}/**/*.html`, ['html']);
  gulp.watch('src/*.html', browserSync.reload);
});

// Build
gulp.task('build', ['removedist', 'html', 'sass', 'sprite', 'js-min'], () => {
  const buildFiles = gulp.src(['src/*.html']).pipe(gulp.dest('dist'));

  const buildFonts = gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts'));

  const buildCss = gulp
    .src([`${path.css}/main.min.css`])
    .pipe(gulp.dest('dist/css'));

  const buildJs = gulp.src([`${path.js}/*.js`]).pipe(gulp.dest('dist/js'));

  const buildImg = gulp.src(['src/img/**/*']).pipe(gulp.dest('dist/img'));
});

// Default task
gulp.task('default', ['watch']);
