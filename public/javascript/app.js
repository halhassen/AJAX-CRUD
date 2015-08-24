var firebase ="https://superheroshoebox.firebaseio.com";
var superheroes = [];
$("#update").hide();

var create = function() {
	var hero = {
		name: $("#name").val(),
		identity: $("#identity").val(),
		powers: $("#powers").val(),
		img: $("#img").val(),
		video: $("#video").val()	
	};
	if(hero.name === "" || hero.identity === "" || hero.powers === "" || hero.img === "" || hero.video === "") return;

	$.ajax({
		data: JSON.stringify(hero),
		url: firebase + '/.json',
		method: 'POST',
		dataType: 'json',
		success: function(res) {
			read();
		},
		error: function(res, status) {
			console.log(res, status)
		}
	})
};

//Create is finished!

var read = function() {
	$("#superHeroes").html("");
	$.ajax({
		url: firebase + "/.json",
		method: 'GET',
		dataType: "json",
		sucess: function(data) {
			superheroes.length = 0;
			var x = "";
			for (var hero in data) {
				data[hero]._id = hero;
				superheroes.push(data[hero]);

				x += "<div class='page-header row col-sm-4 text-center'>" + "<a href='" + data[hero].video + "'>" +
				"<span id='play' class='btn glyphicon glyphicon-play'>" + "</a>" +  "<img class='img-responsive img-rounded' src='" + data[hero].img + "' style='border: auto; margin: auto; height: 200px'/>" + "</span>" + "<br>" + 
				"<span style='font-weight: strong; font-size: 1.35em'>" + data[hero].identity + " - <i>" + data[hero].name + "</span><br>" +
				"<span>" + data[hero].powers + "</i></span>" + "</div>" + "<button onclick='_delete(" + JSON.stringify(hero) + ")'>Delete</button>"
				+ "<button onclick='update(" + people.indexOf(data[hero]) + ")'>Edit</button>";
			}
			$("#superHeroes").html(x);
		}, 
		error: function(data) {
			console.log(data)
		}
	})
}


var update = function(index) {
	$("#update").show();
	$("#edit_name").val(superheroes[index].name);
	$("#edit_identity").val(superheroes[index].identity);
	$("#edit_powers").val(superheroes[index].powers);
	$("#edit_img").val(superheroes[index].img);
	$("#edit_video").val(superheroes[index].video);
	$("#submit_edit").on('click',function() {
		var updatedHero = {
			name: $("#edit_name").val(),
			identity: $("#edit_identity").val(),
			powers: $("#edit_powers").val(),
			img: $("#edit_img").val(),
			video: $("#edit_video").val()
		};
		$.ajax({
			url: firebase + superheroes[index]._id + "/.json",
			method: 'PUT',
			dataType: "json",
			data: JSON.stringify(updatedHero),
			success: function(data) {
				$("#update").hide();
				$("#submit_edit").off();
				read();
			},
			error: function(data) {
				console.log(data)
			}
		})

	})
};



var _delete = function(id) {
	$.ajax({
		url: firebase + id + "/.json",
		method: 'DELETE',
		dataType: "json",
		success: function(data) {
			console.log("Successfully deleted.");
			read();
		},
		error: function(data) {
			console.log(data)
		}

	})
}


read();





//Below was practice for the above exercise

/*
//firebase db ref
var firebase ="https://personlisting.firebaseio.com";
//array to temporarily store firebase data, and easily access values
var people =[];

//hides the element with the id of update onload
$("#update").hide();


var create = function() {
	//construct an object with the values from the form inputs
	var person = {
		first: $("#first").val(),
		last: $("#last").val()
	};
	//check if both of the input fields are empty, otherwise the function will be exited
	if(person.first === "" || person.last === "") return;
	//perform ajax request to firebase database with inputed data
	$.ajax({
		data: JSON.stringify(person),
		url: firebase + ".json",
		method: 'POST',
		datatype: 'json',
		success: function(res) {
			//invoke the read function on usccess
			read();
		},
		error: function(res, status) {
			console.log(res, status)
		}
	})
}	


var read = function() {
	//empty the element with the id of people before outputting
	$("#people").html("");
	//perform ajax request to firebase database, retrieving all records
	$.ajax({
		url: firebase + ".json",
		method: 'GET',
		dataType: "json",
		success: function(data) {
			//on success of the GET request, sets the people array to 0
			people.length = 0;
			//loops through each person in the response object from firebase
			for (var person in data) {
			//assign the guid to a property named _id on each item in the array as they are iterated over	
			data[person]._id = person;
			//push said iteration of person onto the local array people	
			people.push(data[person]);

			//concatation magic where the outputs of the first and last fields are recorded to the DOM
			//pass in the guid to the delete function so we can target the correct data to delete in our DB
			//pass in the correct index of each person in the update function so we can grab the correct info from the array to update in the DB
			var x = "<div class='row col-md-3'>" + "<p>" + data[person].first + "<br>" + data[person].last + "</p>"
			+ "<button id='deleteButton' onclick='_delete(" + "" + JSON.stringify(person) + "" + ")'>" + "Delete" + "</button>"
			+ "<button id='updateButton' onclick='update(" +  people.indexOf(data[person]) + ")'>" + "Edit" + "</button>" + "</div>"
			$("#people").append(x);

		}
	},
	error: function(data) {
		console.log(data);
	}
});
}

var update = function(index) {

	//show update form
	$("#update").show();
	//grabs values from the edit form's input fields
	$("#edit_first").val(people[index].first);
	$("#edit_last").val(people[index].last);
	//assign an event listener to the submit_edit tag
	$("#submit_edit").on('click', function() {
		//onclick, create an object with the values of the input
		var updatedPerson = {
			first: $("#edit_first").val(),
			last: $("#edit_last").val()
		};
		//make ajax request to firebase with update data, passing in the corresponding
		//guid to identify which item to update
		$.ajax({
			url: firebase + people[index]._id + "/.json",
			method: 'PUT',
			dataType: "json",
			data: JSON.stringify(updatedPerson),
			success: function(data) {
				//on success hide the edit form element, and remove all listeners from the button to submit an edit
				$("#update").hide();
				$("#submit_edit").off();
				read();
			},
			error: function(data) {
				console.log(data)
			}

		})

	})
}

var _delete = function(id) {
	//taking in the id we passed in during the read function for in loop
	$.ajax({
		//perform ajax request with the guid passed in to target which document to delete from the db
		url: firebase + id + "/.json",
		method: "DELETE",
		dataType: "json", 
		success: function(data) {
			//on success re-run the function to refresh the page to get current data
			console.log("Successfully deleted.");
			read();
		},
		error: function(data) {
			console.log(data)
		}
	})
}

//onload run the read function to get current data
read();
*/
