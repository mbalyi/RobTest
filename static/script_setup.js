function requestSetup(options, callback){
    $.ajax({ url: "/setup",
        data: options,
        dataType: "json",
        type: "get",
        success: callback
    });
}

function GenerateCaseTableTest(data){
    var html = "<p><b>Cases</b></p>";
	data.forEach(function(object){
		html+="<a href='#' id='"+object[0]+"' class='case'>"+ object[1] +"</a><br>";
    });
	return html;
}


$(function(){
    $("#setup").one("click",function(){
		requestSetup({active:true, filter:""},
			function(res){
				$(".col-md-12-case").empty().append(GenerateCaseTableTest(res));
			}
		)
	});
	
});