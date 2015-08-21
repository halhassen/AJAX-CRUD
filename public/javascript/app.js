var firebase ="https://personlisting.firebaseio.com/";
var people =[];
$("#update").hide();


var create = function() {
	var person = {
		first: $("#first").val(),
		last: $("#last").val()
	};
	if(person.first === "" || person.last === "") return;
	$.ajax({
		data: JSON.stringify(person),
		url: firebase + ".json",
		method: 'POST',
		datatype: 'json',
		success: function(res) {
			read();
		},
		error: function(res, status) {
			console.log(res, status)
		}
	})
}	


var read = function() {
	$("#people").html("");
	$.ajax({
		url: firebase + ".json",
		method: 'GET',
		dataType: "json",
		success: function(data) {
			for (var person in data) {
				data[person]._id = person;
				people.push(data[person]);
				var x = "<p>" + data[person].first + "<br>" + data[person].last + "</p>"
				+ "<button onclick='_delete(" + "" + JSON.stringify(person) + "" + ")'>" + "Delete" + "</button>"
				+ "<button onclick='update(" +  people.indexOf(data[person]) + ")'>" + "Edit" + "</button>"
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
	$.ajax({
		url: firebase + id + "/.json",
		method: "DELETE",
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

var edit = function(id) {
	$.ajax({
		url: firebase + id + "/.json",
		method: "DELETE",
		dataType: "json", 
		success: function(data) {
			console.log()
			read();
		}
	})
}

