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
        files: ['./public/scripts/**/*', './public/css/**/*', './views/**/*.jade', './views/**/*.styl'],
        options: {
            debounceDelay: 750,
            livereload: 35729
        },
        task: ['']
      },
      boweradmin: {
        files: ['./public/scripts/admin/bower.json'],
        tasks: ['wiredep:admin']
      },
      bowersite: {
        files: ['bower.json'],
        tasks: ['wiredep:site']
      }
    },
    nodemon: {
      dev: {
            script: './bin/www',
            options: {
                ignore: [
                    'node_modules/**', 
                    'public/js/**/*',
                    'public/scripts/**/*'],
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
      admin: {
        src: ['views/layout-admin.jade'],
        options: {
          cwd: './public/scripts/admin/',
          ignorePath: '../public',
          overrides: {
            "directory": "./bower_components/"
          }
        }
      },
      site: {
        src: ['views/layout.jade'],
        options: {
          ignorePath: '../public',
          overrides: {
            "directory": "./bower_components/"
          }
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
    },
    useminPrepare: {
        html: 'views/**/*.jade',
        options: {
            dest: './public/dist/',
            flow: {
                html: {
                    steps: {
                        js: ['concat', 'uglifyjs'],
                        css: ['cssmin']
                    },
                    post: {
                        js: [{
                          name: 'uglify',
                          createConfig: function (context, block) {
                            var generated = context.options.generated;
                            generated.options = {
                              mangle: false
                              /*
                              http://mathieuhicauber-java.blogspot.com.ar/2013/12/grunt-uglify-task-breaks-angular-app.html
                              http://stackoverflow.com/questions/21688681/unknown-provider-aprovider-a-how-do-i-find-the-original-provider
                              http://stackoverflow.com/a/20945907/467034
                              */
                            };
                          }
                        }]
                    }
                }
            }
        }
    }
  });


  grunt.registerTask('buildprod', [
    'clean:public',
    //copy styles to .tmp
    'useminPrepare',
    //generates new task configs: concat, uglify
    'concat',
    'uglify',
    'cssmin'
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

              // register model in ./routes/main.js
              var appendm = grunt.template.process(grunt.file.read('./templates/append-model-registration.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filename = './routes/main.js';
              var mainroutes = grunt.file.read(filename);
              var regexpm = new RegExp(".*"+appendm.replace("(", "\\(").replace(")","\\)")+".*");
              if(!mainroutes.match(regexpm)){
                  grunt.file.write(filename, 
                      mainroutes.replace("/* models:registration:end */",appendm));
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
        case 'crud':
            if(typeof arg2 !== 'undefined') {
              // create Front-end files
              var feFilesRoot = {
                "templates" : "./templates/crud/admin/controllers/",
                "destination" : "./public/scripts/admin/controllers/"  
              };
              var feFiles = {
                  "model-edit-js.tpl" : "<%=modelname%>-edit.js",
                  "model-new-js.tpl" : "<%=modelname%>-new.js",
                  "model-js.tpl" : "<%=modelname%>.js",
                  "../views/model-html.tpl" : "../views/<%=modelname%>.html"
              }; 

              for(var i in feFiles){
                  var filefetemp = feFilesRoot.templates+i;
                  var filefe = grunt.template.process(grunt.file.read(filefetemp), {
                        data: {
                            'modelname': arg2
                        }
                  });
                  var filenamefe = feFilesRoot.destination+feFiles[i].replace("<%=modelname%>",arg2.toLowerCase());
                  grunt.file.write(filenamefe, filefe);
              }
              // append Front-end files
              var appendfe = grunt.template.process(grunt.file.read('./templates/crud/admin-crud-scripts-append.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filenamefe = './views/admin-panel.jade';
              var mainfe = grunt.file.read(filenamefe);
              grunt.file.write(filenamefe, mainfe.replace("//admin:crud:scripts:end",appendfe));
              // append CRUD menu into admin
              var appendcmenu = grunt.template.process(grunt.file.read('./templates/crud/admin-crud-menu-append.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filenamecmenu = './views/partials/admin-menu.jade';
              var maincmenu = grunt.file.read(filenamecmenu);
              grunt.file.write(filenamecmenu, maincmenu.replace("//admin:crud:menu:end",appendcmenu));
              // append routes to ./public/scripts/admin/app.js
              var appendcroute = grunt.template.process(grunt.file.read('./templates/crud/admin/app-route-append.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filenamecroute = './public/scripts/admin/app.js';
              var maincroute = grunt.file.read(filenamecroute);
              grunt.file.write(filenamecroute, maincroute.replace(".otherwise({",appendcroute));

              // create tests
              
              /*
              var appendp = grunt.template.process(grunt.file.read('./templates/append-model-rest-main.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filename = './routes/main.js';
              var mainroutes = grunt.file.read(filename);
              */
              //grunt.file.write(filename, mainroutes.replace("/* rest:public:end */",appendp));

              /*
              // create test
              var filetest = grunt.template.process(grunt.file.read('./templates/mongoose-model-rest-tests.js.tpl'), {
                    data: {
                        'modelname': arg2
                    }
              });
              var filenametest = './test/rest/models/'+arg2.toLowerCase()+'s-rest-tests.js';
              grunt.file.write(filenametest, filetest);
              */
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
        case 'locale':
            if(typeof arg2 !== 'undefined') {
              // append locale to ./apps.js
              var appendp = "'"+arg2.toLowerCase()+"',\n      //global:translation:end"
              var filename = './app.js';
              var mainroutes = grunt.file.read(filename);
              grunt.file.write(filename, mainroutes.replace("//global:translation:end",appendp));

              // append page link to ./views/partials/site-menu.jade
              var appendm = "li\n";
                  appendm += "              a(href='#', langsupport='"+arg2.toLowerCase()+"') "+arg2.toLowerCase()+"\n";
                  appendm += "            //public:translation:menu:end";
              
              var filename = './views/partials/site-menu.jade';
              var mainroutes = grunt.file.read(filename);
              grunt.file.write(filename, mainroutes.replace("//public:translation:menu:end",appendm));

            } else {
                grunt.log.warn('Parameter name missing for '+arg1+' task');
            }
        break;
      }
  });

  grunt.registerTask('default', ['jshint', 'concurrent']);
};
