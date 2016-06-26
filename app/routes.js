var Exam = require('./models/exam');



module.exports= function(app){
		
        // route to handle all angular requests * is all other routes
		app.get('/', function(req,res){
			res.sendfile('./public/views/index.html');// load our public/index.html file
		});

		app.get('/viewExam', function(req,res){
			res.sendfile('./public/views/index.html');
		});

		app.get('/deleteExam', function(req,res){
			res.sendfile('./public/views/index.html');
		});


		app.get('/editExam', function(req,res){
			res.sendfile('./public/views/index.html');
		});


		app.get('/addExam', function(req,res){
			res.sendfile('./public/views/index.html');
		});
//============= Main exam route handlers ===================

		app.get('/api/exam', function(req,res){
			Exam.find(function (err, exams) {

        	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
        	if (err) {
        		console.log("here");
            	res.send(err);
        	}

        	res.json(exams); // return all todos in JSON format
    		});
		});

		app.post('/api/exam', function(req,res){

			var exam = new Exam(req.body);
			
  			exam.save(function(err, post){
    				if(err){ return next(exam); }

    				res.json(exam);
  			});
		});

		app.delete('/api/exam', function(req,res){
			Exam.remove(function(err){
				if(err){
					res.send(err);
				}
				return res.send('');
			});
		});
//============= Id exam route handers =====================
		app.get('/api/exam/:exam_id', function(req,res){
			Exam.findById(req.params.exam_id, function(err,exam){
				if(err){
					res.send(err);
				}
				console.log("Get Exam "+req.params.exam_id+".");
				res.json(exam);
			});
		});

		app.put('/api/exam/:exam_id', function(req,res){
			Exam.findById(req.params.exam_id, function(err,exam){
				if(err){
					res.send(err);
				}

				exam.name = req.body.name;
				exam.complete = req.body.complete;
				exam.time = req.body.time; //epoch time
				exam.submitter= req.body.submitter;

				exam.save(function (err){
					if(err){
						res.send(err);
					}
					console.log("Exam "+req.params.exam_id+" updated.");
					res.json(exam);
				});
			});
		});

		app.delete('/api/exam/:exam_id', function(req,res){
			Exam.remove({
				_id: req.params.exam_id
			}, function(err, exam){
				if(err){
					res.send(err);
				}
				console.log("Exam "+req.params.exam_id+" removed.");
				res.json(exam);
			});
		});
};
