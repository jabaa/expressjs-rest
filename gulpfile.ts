import * as gulp from 'gulp';
import * as path from 'path';
import * as ts from 'gulp-typescript';
import * as pug from 'gulp-pug';
import * as sass from 'gulp-sass';
import * as sourcemaps from 'gulp-sourcemaps';

const APP_SRC = path.join('client', 'src');
const APP_DIST = path.join('client', 'dist');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['build'], () => {
  gulp.watch(path.join(APP_SRC, '**'), ['build']);
});

gulp.task('build', ['ts', 'pug', 'sass', 'assets']);

gulp.task('ts', () => {
  gulp.src(path.join(APP_SRC, '**', '*.ts'))
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(APP_DIST));
});

gulp.task('pug', () => {
  gulp.src(path.join(APP_SRC, '**', '*.pug'))
    .pipe(pug())
    .pipe(gulp.dest(APP_DIST));
});

gulp.task('sass', () => {
  gulp.src(path.join(APP_SRC, '**', '*.scss'))
    .pipe(sass())
    .pipe(gulp.dest(APP_DIST));
});

gulp.task('assets', () => {
  let src = [
    path.join(APP_SRC, '**'),
    '!' + path.join(APP_SRC, '**', '*.ts'),
    '!' + path.join(APP_SRC, '**', '*.pug'),
    '!' + path.join(APP_SRC, '**', '*.scss')];
  gulp.src(src)
    .pipe(gulp.dest(APP_DIST));
})
