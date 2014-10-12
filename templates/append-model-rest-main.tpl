
// GET /api/v1/<%=modelname.toLowerCase() %>s
restify.serve(app, <%=modelname %>, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});
/* rest:public:end */
