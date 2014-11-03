var forms = require('mongoose-forms');
var Admin  = require('../models/admins.js');

module.exports = function() {
  return forms.Form(Admin, {
    method: 'post',
    action: '/admin',
    maps: ['email', 'password'],
    fields: {
      email: {
        formname: "loginForm"    
      },
      password: {
        template: 'Password',
        validate: function(value, check) {
          check(value, 'Minimum 6 characters and maximum 10').len(6, 10);
        }
      }
    }
  });
};
