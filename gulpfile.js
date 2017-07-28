var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpmocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

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
    env({vars: {
        ENV: 'test'
    }});
    gulp.src('src/**/*.tests.js', {read: false})
    .pipe(gulpmocha({reporter: 'nyan'}));
});
