var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var watchify = require('watchify');
var browserify = require('browserify');
var gulpify = require('gulp-browserify');
var sync = require('browser-sync');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
// var plumber = require('gulp-plumber');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var vulcanize = require('gulp-vulcanize');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var paths = {
    scripts: 'www/index.js',
    images: 'www/assets/**/*',
    html: 'www/components/index.html',
    build: {
        js: 'www/build/js/*.js',
        html: 'www/build/html/*.html'
    },
    bower: 'www/bower_components/',
    node: 'node_modules/'
};
// Primary Build Task
gulp.task('sync', ['build'], function() {
    sync.init({
        ui: {
            port: 9091,
            weinre: {
                port: 9090
            }
        },
        server: {
            baseDir: "./www"
        },
        shim: {
		    angular: {
                path: node + '/angular.js',
                exports: 'angular'
		    },
            'angular-route': {
                path: '/vendor/angular-route/angular-route.js',
                exports: 'ngRoute',
                depends: {
                    angular: 'angular'
                }
            }
        }
    });
});

// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src` 
    return del(['build']);
});

// Basic usage 
gulp.task('scripts', function() {
    // Single entry point to browserify 
    return gulp.src(paths.scripts)
        .pipe(gulpify({
            insertGlobals: true,
            debug: !gulp.env.production,
            transform: ['debowerify'],
        }))
        .pipe(gulp.dest('./www/build/js'));
});

// gulp.task('scripts', function() {
//     // Single entry point to browserify 
//     var bundler = browserify(paths.scripts, {
//         entries: [paths.scripts],
//         cache: {},
//         packageCache: {},
//         plugin: [watchify]
//     });
//     bundler.transform('debowerify');
//     bundler.on('update', rebundle);
    
//     function rebundle () {
//         return bundler.bundle()
//         .pipe(source('bundle.js'))
//         // .pipe(streamify(uglify()))
//         .pipe(gulp.dest('./www/build/js'))
//         .pipe(sync.reload({stream:true, once: true}));
//     }
    
//     return rebundle();
// });

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false
        }))
        .pipe(gulp.dest('./www/build/html'));
});

// Copy all static images 
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        // Pass in options to the task 
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('build/assets'));
});

gulp.task('ugly-js', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(paths.build.js)
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(concat('bundle.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('www'));
});

gulp.task('ugly-html', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(paths.build.html)
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(concat('bundle.html'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('www'));
});


gulp.task('watch', ['sync'], function () {
    gulp.watch(['./gulpfile.js'], ['default']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch([paths.html, 'www/components/**/*', 'www/index.html'], ['html']);
});


gulp.task('build', ['scripts', 'html', 'images', 'ugly-js', 'ugly-html']);
gulp.task('default', ['sync', 'watch']);