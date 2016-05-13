const gulp = require('gulp'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    cleanCss = require('gulp-clean-css');

var paths = {
    source: {
        css: 'app/**/*.less',
        js: 'app/**/*.ts',
        html: ['app/**/*.html', '!app/index.html'],
        index: 'app/index.html'
    },
    build: {
        root: 'build',
        css: 'build/css',
        js: 'build',
        html: 'build/app',
        libraries: 'build/libraries'
    }
}

// Cleans the distribution directory.
gulp.task('clean', function() {
    return del(paths.build.root + '/**/*');
});

// Copies dependencies to the distribution directory.
gulp.task('copy-libraries', ['clean'], function() {
    gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/angular2/bundles/angular2.js',
            'node_modules/angular2/bundles/router.js',
        ])
        .pipe(gulp.dest(paths.build.libraries + '/angular2'));

    gulp.src([
            'node_modules/systemjs/dist/system.src.js'
        ])
        .pipe(gulp.dest(paths.build.libraries + '/systemjs'));

    gulp.src([
            'node_modules/rxjs/bundles/Rx.js'
        ])
        .pipe(gulp.dest(paths.build.libraries + '/rxjs'));
});

// Compiles TypeScript and copies it to the distribution directory.
gulp.task('copy-html', function() {
    gulp.src(paths.source.index)
        .pipe(gulp.dest(paths.build.root));

    return gulp.src(paths.source.html)
        .pipe(gulp.dest(paths.build.html));
});

// Compiles TypeScript and copies it to the distribution directory.
gulp.task('copy-js', function() {
    return gulp
        .src(tsconfig.files, {
            base: './'
        })
        .pipe(sourcemaps.init())
        .pipe(typescript(tsconfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build.js));
});

// Compiles CSS, copies it to the distribution directory and auto-injects it into browsers.
gulp.task('copy-css', function() {
    return gulp.src(paths.source.css)
        .pipe(concat('app.css'))
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
});

// Lints the project.
gulp.task('tslint', function() {
    return gulp.src(paths.source.js)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

// Starts the project.
gulp.task('start', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: paths.build.root
        }
    });

    gulp.watch('tsconfig.json', ['build'], browserSync.reload);
    gulp.watch(paths.source.css, ['copy-css']);
    gulp.watch([paths.source.html, paths.source.index], ['copy-html'], browserSync.reload);

    // TypeScript files contain paths to HTML templates which may change.
    // Need to copy html.
    gulp.watch(paths.source.js, ['tslint', 'copy-js', 'copy-html'], browserSync.reload);
});

gulp.task('build', ['clean'], function() {
    gulp.start(['tslint', 'copy-libraries', 'copy-css', 'copy-html', 'copy-js']);
});

gulp.task('default', ['start']);
