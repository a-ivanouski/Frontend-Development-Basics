module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
        unit: {
            configFile: 'my.conf.js',
            singleRun: true
        }
    },
    concat: {
        options: {
            separator: ' ',
        },
        dist: {
            src: ['src/ajaxAndPromises.dropboxfileslist.js', 'src/dropboxapifacade.js'],
            dest: 'dist/dropboxclient.js',
        },
    },
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: 'dist/dropboxclient.js',
            dest: 'build/dropboxclient.min.js'
        }
    },
    watch: {
        scripts: {
            files: ['src/*.js'],
            tasks: ['jshint', 'karma'],
            options: {
                spawn: false,
            },
        },
    },
    jshint: {
        all: ['src/*.js']
    }
  });


  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'karma', 'concat', 'uglify']);
};