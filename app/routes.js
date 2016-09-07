var Exam = require('./models/exam');
var Question = require('./models/question');

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

		app.post('/api/exam', function(req,res,next){

			console.log(req.body);

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
			req.exam.populate('questions', function(err, exam) {
    		if (err) { 
    			return next(err); 
    		}

    			res.json(exam);
  			});
		});

		app.put('/api/exam/:exam_id', function(req,res){
			Exam.findById(req.params.exam_id, function(err,exam){
				if(err){
					res.send(err);
				}
				if(req.body.status){
					exam.status = req.body.status;
				}
				if(req.body.markAvg){
					exam.markAvg = req.body.markAvg;
				}
				if(req.body.complete){
					exam.complete = req.body.complete;
				}
				if(req.body.time){
					exam.time = req.body.time; //epoch time
				}
				if(req.body.submitter){
					exam.submitter= req.body.submitter;
				}
				

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


		app.param('exam_id', function(req,res,next,id){
			var query = Exam.findById(id);

			query.exec(function (err,exam){
				if(err){
					return next(err);
				}
						if(!exam){
							return next(new Error('can\'t find exam'));
						}
						req.exam = exam;
						next();
				});
		});


		app.post('/api/exam/:exam_id/questions', function(req,res){
			var question = new Question(req.body);
			question.save(function(err, quest){
				if(err){ return next(question); }
				req.exam.questions.push(question);
				req.exam.save(function(err, exam){
					if(err){
						return next(err);
					}

					res.json(question);
				});
    				
			})
		});

		app.get('/api/exam/:exam_id/questions/:question_id',function(req,res,next){
			Question.findById(req.params.question_id, function(err, question){
					if(err){
						res.send(err);
					}
					console.log("Get Question "+req.params.question_id+" From Exam "+req.params.exam_id+".");
					res.json(question);
			});
		});
};
