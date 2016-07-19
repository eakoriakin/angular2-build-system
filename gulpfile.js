const gulp = require('gulp'),
    merge = require('merge2'),
    runSequence = require('run-sequence'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    cleanCss = require('gulp-clean-css');

const paths = {
    source: {
        css: 'app/**/*.less',
        js: 'app/**/*.ts',
        html: ['app/**/*.html', '!app/index.html'],
        index: 'app/index.html',
        config: ['tsconfig.json']
    },
    build: {
        root: 'build',
        css: 'build/css',
        js: 'build',
        html: 'build/app'
    }
}

var build = function(complete) {
    runSequence('clean', ['check-ts', 'copy-js', 'copy-css', 'copy-html'], complete);
}

gulp.task('clean', function() {
    // Create an empty distribution directory to avoid errors (See #1).
    return gulp.src('/')
        .pipe(gulp.dest(paths.build.root));

    del.sync([paths.build.root + '/**/*', '!' + paths.build.root]);
});

gulp.task('copy-html', function() {
    gulp.src(paths.source.index)
        .pipe(gulp.dest(paths.build.root));

    return gulp.src(paths.source.html)
        .pipe(gulp.dest(paths.build.html));
});

gulp.task('copy-js', function() {
    // Create TS declaration files.
    var tsResult = gulp.src(tsconfig.files, {
            base: './'
        })
        .pipe(sourcemaps.init())
        .pipe(typescript(tsconfig.compilerOptions));

    // Create sourcemaps.
    tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build.js));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.build.js)),
        tsResult.js.pipe(gulp.dest(paths.build.js))
    ]);
});

gulp.task('copy-css', function() {
    return gulp.src(paths.source.css)
        .pipe(concat('app.css'))
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
});

gulp.task('check-ts', function() {
    return gulp.src(paths.source.js)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('build', function() {
    build(browserSync.reload);
});

gulp.task('start', function() {
    build(function() {
        browserSync.init({
            startPath: paths.build.root,
            server: {
                baseDir: './'
            }
        });

        // Watch CSS files.
        gulp.watch(paths.source.css, ['copy-css']);

        // Watch HTML files.
        gulp.watch([paths.source.html, paths.source.index], ['copy-html', browserSync.reload]);

        // Watch JS files.
        gulp.watch(paths.source.js).on('change', function() {
            build(browserSync.reload);
        });

        // Watch configuration files.
        gulp.watch(paths.source.config).on('change', function() {
            build(browserSync.reload);
        });
    });
});

gulp.task('default', ['start']);
