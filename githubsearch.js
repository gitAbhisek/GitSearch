$(document).ready(function(){

	var input;
	var name;
	var language;
	var result;
	var para;
	var i;
	var githubsearch;
	var total_items;
	var current_items;
	var prevResult;

	function initialize(){
		inputs = $("input");
		name = inputs.eq(0).val();
		language = inputs.eq(1).val();
		result = $("#result");
		para = $("body > p");
		i = 1;
	}

	function displayResult(resultList){
		$.each(resultList, function(i, item){
			var newResult = "<div class='newResult'>" +
				"<div class='name'><span>Project Name:</span> " + item.name + "</div>" +
				"<div class='language'><span>Language Used:</span> " + item.language + "</div>" +
				"<div class='project'><a class='link' href=' " + item.html_url + " '>" + "Check Out Project "+ "</a></div>" +
				"<div class='description'><span>Description:</span> " + item.description + "</div>" + 
				"</div>";
			result.append(newResult);
			
		});
		result.append(function(){
			if(i > 1)
				result.append($("<button id='prev'>prev</button>").click(prevPage));
			if(prevResult < total_items)
				result.append($("<button id='next'>next</button>").click(nextPage));
		});
	}


	function loadPage(){
		if(name){
			para.html("Searching GitHub...");
			result.empty();
			var githubsearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(name) + "+language:" + encodeURIComponent(language) +"&page=" + i;
			$.get(githubsearch, function(r){
				total_items = r.total_count;
				current_items = r.items.length;
				prevResult = (i-1)*30 + current_items;
				if(r.items.length == 0)
					para.html("No Match Found!!!");
				else{
					para.html( "showing " + ((i-1)*30 + 1) + "-" +  prevResult + " out of " + r.total_count + " results");
					displayResult(r.items);
				}
			});
		}
		return false;
	}

	function on_submit(){
		initialize();
		loadPage();
		return false;
	}

	function prevPage(){
		i--;
		loadPage();
	}

	function nextPage(){
		i++;
		loadPage();
	}

	$("form").on("submit", on_submit);

})