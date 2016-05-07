const gulp = require('gulp'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tsConfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Cleans the distribution directory.
gulp.task('clean', function () {
    return del('dist/**/*');
});1

// Copies dependencies to the distribution directory.
gulp.task('copy-libraries', ['clean'], function() {
    gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
    ])
    .pipe(gulp.dest('dist/libraries/angular2'));

    gulp.src([
        'node_modules/systemjs/dist/system.src.js'
    ])
    .pipe(gulp.dest('dist/libraries/systemjs'));

    gulp.src([
        'node_modules/rxjs/bundles/Rx.js'
    ])
    .pipe(gulp.dest('dist/libraries/rxjs'));

    gulp.src([
        'node_modules/node-uuid/uuid.js'
    ])
    .pipe(gulp.dest('dist/libraries/node-uuid'));

    return gulp.src([
        'node_modules/immutable/dist/immutable.js'
    ])
    .pipe(gulp.dest('dist/libraries/immutable'));
});

// Copies static assets to the distribution directory.
gulp.task('copy-assets', ['clean'], function() {
    return gulp.src([
            'app/**/*',
            'index.html',
            'styles.css',
            '!app/**/*.ts'
        ],
        { base : './' }
    )
    .pipe(gulp.dest('dist'))
});

// Compiles the project.
gulp.task('compile', ['clean'], function () {
    return gulp
        .src(tsConfig.files)
        .pipe(sourcemaps.init())
        .pipe(typescript(tsConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

// Lints the project.
gulp.task('tslint', function() {
    return gulp.src('app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

// Runs browsersync for development.
gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['build-and-reload']);
    //
    // gulp.watch('app/*.css', ['css']);

    // gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['build'])
    //     .on('change', browserSync.reload);

    // gulp.watch('styles.css').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
// gulp.task('css', function() {
//     return gulp.src('app/*.css')
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });

gulp.task('build', ['tslint', 'compile', 'copy-libraries', 'copy-assets']);
gulp.task('build-and-reload', ['build'], reload);
gulp.task('default', ['build']);
