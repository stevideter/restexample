var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpmocha = require('gulp-mocha');

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules']
    }).on('restart', function() {
        console.log('restarted...');
    });

});
gulp.task('test', function() {
    gulp.src('src/**/*.tests.js', {read: false})
    .pipe(gulpmocha({reporter: 'nyan'}));
});
