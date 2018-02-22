module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {                   
      src: ["UserView.js"]
    },

    watch: {
      files: ['*.js'],
      tasks: ['eslint'],
    },
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", ["eslint"]);

};
