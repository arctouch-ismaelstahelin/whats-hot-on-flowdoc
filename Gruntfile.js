module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*
     =======================================================
     Clean the dist folder. Use before every run
     =======================================================
     */
    clean: {
      dist: {
        src: ['dist/*']
      }
    },

		copy: {
		  assets: {
				cwd: 'src',
				expand: true,
		    src: ['css/*.css', 'js/*.js', 'images/*.*', '*.html'],
		    dest: 'dist/'
		  },
			config: {
		    src: ['manifest.json'],
		    dest: 'dist/'
		  }
		},

		/*
     ==================================================
     Translates .less into .css files
     ==================================================
    */
    less: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/css/options.css': 'src/css/options.less',
          'src/css/popup.css': 'src/css/popup.less'
        }
      }
    },

		/*
     ==================================================
     Execute tasks when watched files change
     ==================================================
    */
		watch: {
			all: {
				files: ['src/css/*.less', 'src/js/*.js', 'src/images/*.*', 'src/*.html', './*.json'],
		    tasks: ['less', 'clean', 'copy']
			}
	  }

  });

  /*
   ==========================================================
   Load all necessary npm tasks to build and run the project
   ==========================================================
   */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

  /*
   ==================================================
   Default task.
   ==================================================
   */
  grunt.registerTask('default', ['watch']);
}
