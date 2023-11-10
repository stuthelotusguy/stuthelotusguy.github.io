// var time = 15; /* how long the timer runs for */
// var initialOffset = '440';
// var i = 1
// // var timer = setInterval(function() {
// //     $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
// //     $('#timer-count').text(i);
// //     if (i == time) {
// //         clearInterval(timer);
// //     }
// //     i++;  
// // }, 1000);
// var timer;
// var timeCount = 0;
// function timer(){
// 	timer = setInterval(function() {
// 	    $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
// 	    $('#timer-count').text(i);
// 	    timeCount++;
// 	    console.log(timeCount);
// 	    if (i == time) {
// 	        clearInterval(timer);
// 	    }
// 	    i++;  
// 	}, 1000);
// }

// function clearTimer(timer){
// 	clearInterval(timer);
// }

// timer();

var gameObject = {

	score: 0,
	time: 40,
	correctNumber: 0,
	incorrectNumber: 0,
	answeredQuestion: 0,
	unansweredQuestion: 0,
	questionIndex: 0,
	questionNumber: 1,
	selectedIndex: 0,

	questions: [
		{
			point: 10,
			question: 'Which of the following is a disadvantage of using JavaScript?',
			choices: ['Client-side JavaScript does not allow the reading or writing of files', 'JavaScript can not be used for Networking applications because there is no such support available.', 'JavaScript does not have any multithreading or multiprocess capabilities', 'All of the above'],
			answer: 4
		},
		{
			point: 20,
			question: 'How do you write "Hello World" in an alert box?',
			choices: ['msgBox("Hello Word");', 'alert("Hello Word");', 'alertBox("Hello World");', 'msg("Hello World");'],
			answer: 2
		},
		{
			point: 30,
			question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
			choices: ['if (i != 5)', 'if (i <> 5)', 'if i = ! 5 then', 'if i <> 5'],
			answer: 1
		},
		{
			point: 40,
			question: 'How does a FOR loop start?',
			choices: ['for i = 1 to 5', 'for(i = 0; i <= 5)', 'for(i = 0; i <= 5; i++)', 'for(i <= 5; i++)'],
			answer: 3
		},
		{
			point: 50,
			question: 'How do you round the number 7.25, to the nearest integer?',
			choices: ['round(7.25)', 'Math.rnd(7.25)', 'Math.round(7.25)', 'rnd(7.25)'],
			answer: 3
		},
		{
			point: 60,
			question: 'How does a WHILE loop start?',
			choices: ['while (i <= 10)', 'while (i <= 10; i++)', 'while i = 1 to 10', 'while (i = 0; i <= 5; i++)'],
			answer: 2
		},
		{
			point: 70,
			question: 'Which operator is used to assign a value to a variable?',
			choices: ['*', '===', '+', '='],
			answer: 4
		},
		{
			point: 80,
			question: 'Which of the following statements are true for Java script?',
			choices: ['JavaScript is case sensitive', 'JavaScript statements can be grouped together in blocks', 'semicolon at the end of statement is mandatory', 'Both A and B above'],
			answer: 4

		},
		{
			point: 90,
			question: 'Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?',
			choices: ['indexOf( )', 'search( )', 'lastIndexOf( )', 'substr( )'],
			answer: 1
		},
		{
			point: 100,
			question: 'Which built-in method adds one or more elements to the end of an array and returns the new length of the array?',
			choices: ['last( )', 'put( )', 'push( )', 'Non of the above'],
			answer: 3
		}
	],

	updateScoreBoard: function () {

		$('.quiz-status').html(

			'<h3>' + gameObject.questionNumber + ' / ' + gameObject.questions.length + '</h3>' +
			'<p>Question Number</p>' 

		);

		$('.quiz-point').html(
			
			'<h3>' + gameObject.score + '</h3>' + 
			'<p>Total Point</p>'

		);
	},

	generateQuestions: function () {

		$('.intro').addClass('hide');
		$('.quiz-container').empty();
		$('.choice-container').empty();

		gameObject.updateScoreBoard();

		//append question
		$('.quiz-container').append(

			'<h4 class="animated fadeIn">' + gameObject.questions[gameObject.questionIndex].question + '</h4>'

		);

		//append choices
		$('.quiz-container').append(

			'<div class="row justify-content-center animated fadeIn">' + 
				'<div class="col-md-6 col-md-offset-3 col-sm-12 text-center">' + 
					'<div id="1" class="choice">' + 'A.   ' + gameObject.questions[gameObject.questionIndex].choices[0] + '</div>' + 
					'<div id="2" class="choice">' + 'B.   ' + gameObject.questions[gameObject.questionIndex].choices[1] + '</div>' +
					'<div id="3" class="choice">' + 'C.   ' + gameObject.questions[gameObject.questionIndex].choices[2] + '</div>' +
					'<div id="4" class="choice">' + 'D.   ' + gameObject.questions[gameObject.questionIndex].choices[3] + '</div>' +
				'</div>' +
			'</div>'

		);

		console.log(" ");
		console.log("Question Number: " + gameObject.questionNumber);
		console.log("questionIndex: " + gameObject.questionIndex);
		console.log("Correct Answer is: " + gameObject.questions[gameObject.questionIndex].answer);
		console.log(" ");

		gameObject.timer();
		gameObject.questionNumber++;
	},

	//Timer function, use svg and animation to stroke circular timer.
	timer: function () {

		$('.quiz-timer').removeClass('hide');
		
		var initialOffset = '440';
		var currentTime = gameObject.time;
		var i = 1;

		var timer = setInterval(function () {

			$('#timer-count').text(currentTime);
			$('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/gameObject.time)));
	    	
	    	currentTime--;

	    	//When time is over
	    	if (currentTime === 0){
	    		//if there is next question, display next question and reset timer
	    		if(gameObject.questionNumber < 11){

	    			gameObject.evalAnswer();
		    		gameObject.questionIndex++;
		    		gameObject.generateQuestions();
		    		clearInterval(timer);
		    		console.log("Time is done! Go to next question");

		    	//if there is no next question, calculate result of game
	    		} else {

	    			currentTime = 0;
	    			clearInterval(timer);
	    			gameObject.evalAnswer(undefined);
	    			gameObject.calcResult();
	    		}
	    	}
	    	i++;

		}, 1000);

		//handle multiple choices click event 
		$('.choice').on( 'click', function (event){

			var selected = $(this).attr('id');
			var selectedAsInt = parseInt(selected);

			clearInterval(timer);

			if (gameObject.questionNumber < 11) {

				gameObject.evalAnswer(selectedAsInt);
				gameObject.questionIndex++;
				gameObject.generateQuestions();

			} else if (gameObject.questionNumber === 11) {

				currentTime = 0;
				gameObject.evalAnswer(selectedAsInt);
				gameObject.calcResult();

			}

		});
	},

	//Evaluate answers
	evalAnswer: function (choice) {

		var correctAnswer = gameObject.questions[gameObject.questionIndex].answer;

		console.log("------------------ Status ---------------------------------------");
		console.log("evalAnswer() --------- correctAnswer: " + correctAnswer);
		console.log("evalAnswer() --------- choice: " + choice);

		if ( choice === correctAnswer ) {

			gameObject.correctNumber++;
			gameObject.answeredQuestion++;
			gameObject.score += gameObject.questions[gameObject.questionIndex].point;

			// console.log('choice: ' + choice + ' /// ' + 'correct answer: ' + correctAnswer);

		} else if ( choice !== correctAnswer && choice !== undefined) {

			gameObject.incorrectNumber++;
			gameObject.answeredQuestion++;

			// console.log('choice: ' + choice + ' /// ');
		
		} else if (choice === undefined) {

			gameObject.unansweredQuestion++;

		}


		console.log("---------------------------- Result Display -----------------------------")
		console.log("evalAnswer() --------- correct number: " + gameObject.correctNumber);
		console.log("evalAnswer() --------- incorrect number: " + gameObject.incorrectNumber);
		console.log("evalAnswer() --------- unanswered number: " + gameObject.unansweredQuestion);
		console.log("--------------------------------------------------------------------------");

	},

	//Render Result Page.
	calcResult: function () {

		$('.main-board').empty();
		$('.status-board').empty();

		if (gameObject.questionNumber === 11) {

			$('.main-board').append(
				'<h1 class="animated infinite pulse">Calculating...</h1>'
			);

			setTimeout( function () {

				$('.main-board').empty();

				if (gameObject.score === 550) {

					$('.main-board').addClass('animated zoomIn').append(

						'<h2>Congratulation! </h2>'+ 
						'<h2>You Have Earned Maximum Points!</h2>' + 
						'<br>' + 
						'<button class="waves-effect waves-light btn-large btn-flat tooltipped" data-position="right" data-delay="50" data-tooltip="Click To Reload Game." id="resetBtn" onClick="location.reload();">Play Again?</button>'

					)
				} else {

					$('.main-board').addClass('animated zoomIn').append( 

						'<h3>Correct Answer: ' + gameObject.correctNumber + '</h3>' + 
						'<h3>Incorrect Answer: ' + gameObject.incorrectNumber + '</h3>' + 
						'<h3>Unanswered Questions: ' + gameObject.unansweredQuestion + '</h3>' + 
						'<h2>Total Point: ' + gameObject.score + '</h2>' + 
						'<br>' +
						'<button class="waves-effect waves-light btn-large btn-flat tooltipped" data-position="right" data-delay="50" data-tooltip="Click To Reload Game." id="resetBtn" onClick="location.reload();">Play Again?</button>'

					);
				}
				

			}, 2500);
		}
	}
}



window.onload = function () {

    // Get the client host based on url
    //var host = window.document.location.host.replace(/:.*/, '');
    //console.log(host);
    // Get the port if any. Usually this is empty in production
    //var port = location.port ? ':' + location.port : '';
    // Our game client links to the server using websocket
    //var serverWebsocketUrl = location.protocol.replace("http", "ws") + "//" + host + port;
    
	var serverWebsocketUrl = "ws://localhost:2567/";

    console.log(serverWebsocketUrl);
    var client = new Colyseus.Client(serverWebsocketUrl);

    let myId = null

    client.joinOrCreate("chat").then(room => {
        console.log("joined");

        console.log(room)
        myId = room.sessionId
        room.onStateChange.once(function (state) {
            console.log("initial room state:", state);
        });

        // new room state
        room.onStateChange(function (state) {
            // this signal is triggered on each patch
            console.log("room state changed:", state);
        });

        // listen to patches coming from the server
        room.onMessage("messages", function (message) {
            var p = document.createElement("p");
            const modifiedMessage = message.replace(myId, 'Me')
            p.innerText = modifiedMessage;
            console.log(message)
            document.querySelector("#messages").appendChild(p);
        });
    });

	$('.tooltipped').tooltip({
		delay: 50
	});

	//after 3.5sec, add animation on startBtn
	setTimeout ( function () {
		$('#startBtn').removeClass('bounceInUp').addClass('infinite pulse');
	}, 3500);

	//start game
	$('#startBtn').on('click', function () {
		gameObject.generateQuestions();
	});
}
