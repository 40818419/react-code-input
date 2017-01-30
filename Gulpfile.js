const createBlueKit = require('react-bluekit/lib/createBlueKit').default;

const gulp = require('gulp')

createBlueKit({
 // your directory where components are located
 baseDir: __dirname,
 // relative paths from base dir where to look for components
 paths: ['./src']
});

gulp.task('bluekit:build', ['build-bluekit'])
gulp.task('bluekit:watch', ['build-bluekit', 'watch-bluekit'])
