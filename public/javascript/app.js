var firebase ="https://personlisting.firebaseio.com/";

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
				var x = "<p>" + data[person].first + "<br>" + data[person].last + "</p>"
				+ "<button onclick='_delete(" + "" + JSON.stringify(person) + "" + ")'>" + "Delete" + "</button>"
				$("#people").append(x);
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
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

