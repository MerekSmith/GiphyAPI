$(document).ready(function () {






	var buttonValueArray = ["Bear", "Puppy", "Funny Cat", "Funny Dog", "Otter", "Kitten", "Baby Goat"];

	console.log(!Array.isArray(buttonValueArray));


	intialize();

	function intialize() {
		renderButtons();
		userInput();
	}


	// This function grabs 10 giphy images using the url above which includes input from the user on the search term. It then puts each gif image into a div which also includes the rating.
	function getGiphys() {
		$('.userButton').on('click', function () {
			$('.giphyImages').empty();
			console.log('buttonPressed');
			searchTerm = $(this).attr('data-value');
			console.log(this);
			var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&api_key=OiwGqo590kaISF07Uz9XzOAdSb1OPymi";

			$.ajax({
				url: giphyURL,
				method: "GET"
			}).then(function (response) {
				console.log(response.data);
				var results = response.data;

				for (var i = 0; i < results.length; i++) {

					var imageURL = results[i].images.fixed_height.url;
					var imageStillURL = results[i].images.fixed_height_still.url;
					var rating = results[i].rating;
					var divTag = $('<div>');
					var pTag = $('<p>').text('Rating: ' + rating)
					var imgTag = $('<img>').attr('src', imageStillURL);
					imgTag.attr('data-still', imageStillURL);
					imgTag.attr('data-animate', imageURL);
					imgTag.attr('data-state', "still").attr('class', 'gif');
					$('.giphyImages').append(divTag);
					divTag.attr('class', 'gifDiv');
					divTag.append(pTag);
					divTag.append(imgTag);

				}
				animateGif();
			});
		});
	};

	
	function userInput() {
		$('#find-user-input').on('click', function () {
			// the event prevent default function prevents the submit button from trying to submit a form.
			event.preventDefault();
			var userInput = $('#user-input').val().trim();
			$('#user-input').val('');

			if (!buttonValueArray.includes(userInput)) {
				
				buttonValueArray.push(userInput);
				localStorage.setItem("userButtons", JSON.stringify(buttonValueArray));
				// Run the render buttons function to redisplay the buttons so they properly work.
				renderButtons();
			}
		});
	};
	
	
	function renderButtons() {
		$('.buttonsContainer').empty();

		buttonValueArray = JSON.parse(localStorage.getItem("userButtons"));

		// Checks to see if the user list exists in localStorage and is an array currently
		// If not, set a local list variable to an empty array
		// Otherwise list is our current list of button selectors
		if (!Array.isArray(buttonValueArray)) {
			buttonValueArray = ["Bear", "Puppy", "Funny Cat", "Funny Dog", "Otter", "Kitten", "Baby Goat"];
		}
		
		for (var i = 0; i < buttonValueArray.length; i++) {
			var buttonTag = $('<button>')
			buttonTag.addClass('userButton btn btn-primary');
			buttonTag.attr("data-value", buttonValueArray[i]);
			buttonTag.text(buttonValueArray[i])
			// buttonTag.css('margin-left', '4px').css('margin-right', '4px');
			$('.buttonsContainer').append(buttonTag)
		}
		getGiphys();
		
	}


	function animateGif() {
		$('img.gif').on('click', function () {
			var state = $(this).attr('data-state');

			if (state === "still") {
				$(this).attr('data-state', 'animate').attr('src', $(this).attr('data-animate'))
			}
			else if (state === "animate") {
				$(this).attr('data-state', 'still').attr('src', $(this).attr('data-still'))
			}


		});
	};










	///////////// End of document ready function ////////////
});
