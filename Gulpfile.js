var gulp            = require('gulp');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var webpack         = require('webpack-stream');
var webpackConfig   = require('./webpack.config.js');

function createTask(srcName, distName) {
    gulp.task(srcName + ':compile', function() {
        gulp.src('src/' + srcName + '/index.js')
            .pipe(webpack(webpackConfig))
            .pipe(rename(distName + '.js'))
            .pipe(gulp.dest('dist'));
    });
    gulp.task(srcName + ':release', [srcName + ':compile'], function() {
        gulp.src('dist/' + srcName + '.js')
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('dist'));
    });
}

createTask('form-view', 'backbone.formView');

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['form-view:compile']);
});

gulp.task('default', function() {
    gulp.start('watch');
});
