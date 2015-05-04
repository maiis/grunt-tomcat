/*
 * grunt-tomcat
 *
 *
 * Copyright (c) 2015 Emmanuel Vuigner
 * Licensed under the MIT license.
 */

'use strict';

var spawn = require('cross-spawn');
var which = require('which');

module.exports = function (grunt) {

  var checkBinary = function (cmd, errMsg) {
    try {
      which.sync(cmd);
    } catch (err) {
      return grunt.warn(
        '\n' + errMsg + '\n' +
        'More info: https://github.com/maiis/grunt-tomcat\n'
      );
    }
  };

  grunt.registerTask('tomcat', 'Start / Stop Catalina Server', function () {

    var options = this.options();
    var bin = 'catalina';
    var cmd = this.args[0];

    if (options.bootstrap) {
      if (!grunt.file.exists(options.bootstrap)) {
        return grunt.warn(
          '\n Path to bootstrap dose not exist.' +
          'More info: https://github.com/maiis/grunt-tomcat\n'
        );
      } else {
        bin = 'sh ' + options.bootstrap;
      }
    } else {
      checkBinary(bin,
        'You need to have Catalina installed and in your PATH for this task to work.'
      );
    }

    grunt.verbose.writeln('Command: ' + bin + ' ' + cmd);

    spawn(bin, [cmd], {stdio: 'inherit'});
  });

};
