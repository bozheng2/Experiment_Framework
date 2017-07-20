// var express = require("express"),
// app         = express(),
// bodyParser  = require("body-parser"),
// mongoose    = require("mongoose");

// //App Config
// mongoose.connect("mongodb://localhost/expweb");

// //mongoose.connect("mongodb://lovetoeat:lovetoeat@ds163360.mlab.com:63360/lovetoeatreact");

// app.set("view engine", "ejs");
// app.use(express.static("public"));

// app.use(bodyParser.json()) // handle json data;
// app.use(bodyParser.urlencoded({ extended: true})); // handle URL-encoded data

// //Mongoose/Model Config
// var experimentSchema = new mongoose.Schema({
//       title: String,
//       version: String,
//       contact: String,
//       studydescription: String,
//       instruction: String,
//       consentform: String
// });

// var Experiment = mongoose.model("Experiment", experimentSchema);

// //RESTful Routes

// app.get("/", function(req,res){
//  res.json({ message: 'API Initialized!'});
// });

// //INDEX ROUTE
// app.get("/experiments", function(req,res){
//  Experiment.find({}, function(err,experiments){
//   if(err){
//   console.log(err);
//   } else {
//   res.json({experiments: experiments});
//   }
//  });
// });


// //CREATE ROUTE
// app.post("/experiments", function(req,res){
//     console.log(req.body.experiments);
//  Experiment.create(req.body.experiments, function(err, newExperiment){
//   if(err) {
//   console.log(err);
//   } else {
//   res.redirect("/experiments");
//   }
//  });
// });

// //EDIT ROUTE
// app.get("/edit/:id", function(req,res) {
//  Experiment.findById(req.params.id, function(err, foundExperiment){
//   if(err){
//   console.log("Something went wrong!");
//   } else {
//   res.json({foundExperiment: foundExperiment})}
//   });
//  });


// // UPDATE ROUTE
// app.put("/edit/:id", function(req, res){
//  Experiment.findByIdAndUpdate(req.params.id, req.body.experiments, function(err, updatedExperiment){
//   if(err){
//   console.log(err);
//   } else {
//  console.log(updatedExperiment);
//  updatedExperiment = req.body;
//  console.log(updatedExperiment);
// res.json(updatedExperiment);
//  }
//  });
//   }
//  );


// //DELETE
// app.delete("/experiments/:id", function(req,res){
//  Experiment.findByIdAndRemove(req.params.id, function(err){
//   if(err){
//   res.redirect("/blogs");
//   } else {
//   console.log("deleted successfully");
//   }
//  });
// });


// console.log(process.env.PORT);
// app.listen(8081, process.env.IP, function(){
//  console.log("We are live!");
// })
