
var channels = ["ESL_SC2", "OgamingSC2", "freecodecamp", "brunofin", "comster404"];
var logo = "";

$.each(channels, function getUsers(index, value) {
		$.ajax({
			type: "GET",
			url: "https://api.twitch.tv/kraken/users/" + value,
			data: {format: "json", client_id: "m8s9p3rmmtcy0ob9673050zcok5rf7"},
			dataType: "json",
			error: function(xhr) {
							if (xhr.responseJSON.status === 422 || xhr.responseJSON.status === 404) {
								$(".streams").append(
	    						"<tr class='table-danger'>" +
	    							"<td><i class='logo fa fa-question fa-2x img-thumbnail text-center bg-danger'></i></td>" +
	    							"<td class='align-middle'><a class='text-danger' href='#'>" + value + "</a></td>" +
	    							"<td class='align-middle'><p class='d-inline font-italic text-danger'>" + xhr.responseJSON.message + "</p></td>" +
	    						"</tr>"
	    					);
							} 
    				 },
			success: function getStreams(userData) {
	    					$.ajax({
									type: "GET",
									url: "https://api.twitch.tv/kraken/streams/" + value,
									data: {format: "json", client_id: "m8s9p3rmmtcy0ob9673050zcok5rf7"},
									dataType: "json",
									error: function(streamData) {
													
						    				 },
									success: function (streamData) {
														if (streamData.stream === null) {
							    						$(".streams").append(
								    						"<tr class='table-warning'>" +
								    							"<td><img class='logo img-fluid img-thumbnail' src='" + userData.logo + "'></td>" +
								    							"<td class='align-middle'>" + 
								    								"<a class='text-warning' href='https://www.twitch.tv/" + userData.name +"' target='_blank'>" + 
								    										userData.display_name + 
								    								"</a>" + 
							    								"</td>" +
								    							"<td class='align-middle'><p class='d-inline font-italic text-warning'>Offline</p></td>" +
								    						"</tr>"
							    						);
							    					}	else {
							    						$(".streams").append(
								    						"<tr class='table-success'>" +
								    							"<td><img class='logo img-fluid img-thumbnail' src='" + streamData.stream.channel.logo + "'></td>" +
								    							"<td class='align-middle'>" + 
								    								"<a class='text-success' href='" + streamData.stream.channel.url +"' target='_blank'>" + 
								    									streamData.stream.channel.display_name + 
							    									"</a>" + 
						    									"</td>" +
								    							"<td class='align-middle'><p class='d-inline font-italic text-success'>" + streamData.stream.channel.status + "</p></td>" +
								    						"</tr>"
								    					);	
							    					}						    												    				
						    					 },
								});
    					 },
		});
});