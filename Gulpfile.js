var gulp            = require('gulp');
var filter          = require('gulp-filter');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var webpack         = require('webpack-stream');
var webpackConfig   = require('./webpack.config.js');

function createTask(srcName, distName) {
    var config = Object.assign({}, webpackConfig, {
        output: { filename: distName + '.js' }
    });
    gulp.task(srcName + ':compile', function() {
        gulp.src('src/' + srcName + '/index.js')
            .pipe(webpack(config))
            .pipe(gulp.dest('dist'));
    });
    gulp.task(srcName + ':release', [srcName + ':compile'], function() {
        gulp.src('src/' + srcName + '/index.js')
            .pipe(webpack(config))
            // .pipe(gulp.dest('dist'))
            .pipe(filter('*.js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('dist'));
    });
}

createTask('form-view', 'FormView');

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['form-view:compile']);
});

gulp.task('default', function() {
    gulp.start('watch');
});
