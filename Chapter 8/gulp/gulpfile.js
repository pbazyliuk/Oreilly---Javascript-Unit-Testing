var gulp = require('gulp'),
    eslint = require('gulp-eslint');

var paths = {
  scripts: ['*.js']
};

gulp.task('eslint', function() {
    return gulp.src(['*.js'])
        // eslint() attaches the lint output to the eslint property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failOnError last. 
        .pipe(eslint.failOnError());
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['eslint']);
});

gulp.task('default', ['eslint'], function () {
    // This will only run if the lint task is successful... 
});
