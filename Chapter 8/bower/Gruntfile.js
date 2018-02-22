module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    wiredep: {
      task: {
        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'index.html',
        ],
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
};
