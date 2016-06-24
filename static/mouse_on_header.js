function requestHeader(options, callback){
    $.ajax({ url: "/home",
        data: options,
        dataType: "json",
        type: "get",
        success: callback
    });
}

function caseSetUp(){
	$(".setup_buttons").empty().append(caseBtn);
	$(".col-md-9").empty().append(caseForm);
	$(".col-md-12-set").empty();
	$(".col-md-12-object").empty();
	$(".col-md-12-execution").empty();
	requestCase();
	$(".setup").show();
}

function dashboardChartSetup(){
	$(".setup_buttons").empty();
}


function GenerateHeader(data){
    var html = "";

    data.forEach(function(object){
        html +="<li><a href='#'>"+ object[0] +"</a></li>";
    });

    // Generation
    return html;
}

window.addEventListener("resize",function(ev){
	debugger;
})

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "dashboard"){
			$(".text_area").hide();
			$(".insert_jira_button").empty();
			addChart("pie","chartID");
			$(".setup_buttons").empty();
			chartFilterBar();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "reportBlog"){
			requestDashboard(
					{ active:true, filter:"" },
					function(res){
						//window.location.reload();
						$(".col-md-9").empty().append(newform);
						$(".col-md-9").append(res);
						$(".text_area").hide();
						$(".insert_jira_button").empty();
						addButtons();
					}
				);
				$(".setup").hide();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "design"){
			$(".col-md-9").empty();
			$(".setup_buttons").empty();
			$(".setup").show();
			requestCase();
			requestSet();
			requestObject();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "sets"){
			SetSetup();
			requestCase();
			$(".setup").show();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "executions"){
			exeSetup();
			requestSet();
			requestCase();
			$(".setup").show();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "cases"){
			caseSetUp();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "objects"){
			objectSetup();
			$(".col-md-12-set").empty();
			$(".col-md-12-case").empty();
			$(".col-md-12-execution").empty();
			$(".setup").show();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "test"){
			testSetup();
		}
	});
	$("#submenu").empty().append("<li><a href='#' id='report'>Report</a></li>")
    requestHeader(
        { active:true, filter:"" },

        function(res){
            $(".header-script").append(GenerateHeader(res));
        }
    );
	
	$("#admin").on("click",function(){
		requestAdmin(
			{ active:true, filter:"" },
			function(res){
				//window.location.reload();
				$(".col-md-9").empty().append(res);
				$(".col-md-9").append(insertUser)
				addAdminButtons();
			}
		);
	});
	
	$("body").on("click","#logout",function(){
		$.get("/logout",
			function(){
				window.location.href = "/logout";
			},
			"json"
		)
		window.location.href = "/logout"
	});
});