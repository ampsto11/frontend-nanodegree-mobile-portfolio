/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
 //Thanks James!

'use strict'

var ngrok = require('ngrok');
var LintStream = require('jslint').LintStream;

module.exports = function (grunt) {

    // Load grunt tasks
    require('load-grunt-tasks')(grunt);
    require('css-optimizer')(grunt);
    require('squirrelminify');

    // Grunt configuration
    grunt.initConfig({
        pagespeed: {
            options:{
                nokey:true,
                locale: "en_GB",
                threshold: 40
            },
            local:{
                options:{
                    strategy: "desktop"
                }
            },
            mobile: {
                options:{
                    strategy: "mobile"
                }
            }
        }
    });

    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function(){
        var done = this.async();
        var port = 8000;

         ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  // Register default tasks
  grunt.registerTask('default', ['psi-ngrok']);
  grunt.registerTask('css-optimizer');
  grunt.registerTask('squirrelminify');
  // node path/to/squirrelminify/minify.js path/to/directory
}
