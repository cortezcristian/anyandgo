var path = require('path');

module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  var appconf = {
    dist: {
      public: "./public/dist/scripts",
      admin: "./public/dist/scripts/admin" 
    }
  };

  grunt.initConfig({
    anyandgo: appconf,
	jshint: {
      options: {
        reporter: require('jshint-stylish'),
        // https://gist.github.com/haschek/2595796
        jshintrc: './.jshintrc'
      },
	  all: ['Grunfile.js', 'routes/*.js',
      "models/*js", "forms/*js", 'test/**/*.js']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/unit/**/*.js']
      }
    },
    watch: {
      scripts: {
        options: { livereload: 35729 },
        files: ['./app.js', './Gruntfile.js', './bin/www',
        './models/*.js', './routes/*.js', './forms/*.js'],
        tasks: ['jshint','mochaTest','docco'],
        options: {
            debounceDelay: 750
        }
      },
      tests: {
        options: { livereload: 35729 },
        files: ['./test/**/*.js'],
        tasks: ['mochaTest', 'docco']
      },
      public: {
        files: ['./public/**/*', './views/**/*.jade', './views/**/*.styl'],
        options: {
            debounceDelay: 750,
            livereload: 35729
        },
        task: ['']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      }
    },
    nodemon: {
      dev: {
            script: './bin/www',
            options: {
                ignore: ['node_modules/**', 'public/js/**/*'],
                callback: function (nodemon) {
                    // opens browser on initial server start
                    nodemon.on('config:update', function () {
                      // Delay before server listens on port
                      setTimeout(function() {
                        require('open')('http://localhost:3000/');
                      }, 3000);
                    });
                }
            }
      }
    },
    docco: {
      debug: {
        src: ['test/**/*.js','models/*.js','routes/*.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    wiredep: {
      target: {
        src: ['views/layout-admin.jade'],
        ignorePath: '../public'
      },
      options: {
        overrides: {
          "directory": "./bower_components/"
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true,
          limit: 5
        }
      },
      test: ['mochaTest']
    },
    clean: {
      public: './public/dist/{,*/}*',
      temporal: '.tmp'
    }
  });


  grunt.registerTask('build', [
    'clean:public',
    //copy styles to .tmp
  ]);

  grunt.task.registerTask('create', 'Create mongoose model + test', function(arg1, arg2) {
      grunt.log.debug(arg1, arg2);
      switch(arg1){
        case 'model':
            if(typeof arg2 !== 'undefined') {
              // create model
              var filemodel = grunt.template.process(grunt.file.read('./templates/mongoose-model.js.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filename = './models/'+arg2.toLowerCase()+'.js';
              grunt.file.write(filename, filemodel);

              // create test
              var filetest = grunt.template.process(grunt.file.read('./templates/mongoose-model-tests.js.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filenametest = './test/unit/models/'+arg2.toLowerCase()+'-tests.js';
              grunt.file.write(filenametest, filetest);

              // append model to ./routes/main.js
              var appendm = grunt.template.process(grunt.file.read('./templates/append-model-routes-main.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filename = './routes/main.js';
              var mainroutes = grunt.file.read(filename);
              var regexpm = new RegExp(".*"+appendm.replace("(", "\\(").replace(")","\\)")+".*");
              if(!mainroutes.match(regexpm)){
                  grunt.file.write(filename, 
                      mainroutes.replace("/* models:end */",appendm+"  /* models:end */"));
              }


            } else {
                grunt.log.warn('Parameter name missing for '+arg1+' task');
            }
        break;
        case 'page':
            if(typeof arg2 !== 'undefined') {
              // create model
              var filepage = grunt.template.process(grunt.file.read('./templates/view-page.jade.tpl'), {
                    data: {
                        'pagename': arg2
                    }
              });
              var filename = './views/'+arg2.toLowerCase()+'.jade';
              grunt.file.write(filename, filepage);

              // append page route to ./routes/main.js
              var appendp = grunt.template.process(grunt.file.read('./templates/append-page-routes-main.tpl'), {
                    data: {
                        'pagename': arg2
                    }
              });
              var filename = './routes/main.js';
              var mainroutes = grunt.file.read(filename);
              grunt.file.write(filename, mainroutes.replace("/* page:public:end */",appendp+"/* page:public:end */"));

              // append page link to ./views/partials/site-menu.jade
              var appendm = grunt.template.process(grunt.file.read('./templates/append-site-menu-item.tpl'), {
                    data: {
                        'pagename': arg2
                    }
              });
              var filename = './views/partials/site-menu.jade';
              var mainroutes = grunt.file.read(filename);
              grunt.file.write(filename, mainroutes.replace("// public:page:menu:end",appendm));
            } else {
                grunt.log.warn('Parameter name missing for '+arg1+' task');
            }
        break;
        case 'rest':
            if(typeof arg2 !== 'undefined') {
              // append rest to ./routes/main.js
              var appendp = grunt.template.process(grunt.file.read('./templates/append-model-rest-main.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filename = './routes/main.js';
              var mainroutes = grunt.file.read(filename);
              grunt.file.write(filename, mainroutes.replace("/* rest:public:end */",appendp));

              // create test
              var filetest = grunt.template.process(grunt.file.read('./templates/mongoose-model-rest-tests.js.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filenametest = './test/rest/models/'+arg2.toLowerCase()+'s-rest-tests.js';
              grunt.file.write(filenametest, filetest);
            } else {
                grunt.log.warn('Parameter name missing for '+arg1+' task');
            }
        break;
      }
  });

  grunt.registerTask('default', ['jshint', 'concurrent']);
};
