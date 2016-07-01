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
	caseForm();
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


function projectChanging(){
    $.get("/projectChanging/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
			};
		}
	);
}

$(function(){
    $( ".projectSelector" ).change(function() {
        alert( "Handler for .change() called." );
        projectChanging();
        
    });
    
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "dashboard"){
            $(".text_area").hide();
			$(".insert_jira_button").empty();
			$(".setup_buttons").empty();
			document.getElementById("col-md-9").style.width = '100%'
            dashboardLoad();
            chartFilterBar("pie",".chartFilter#pie");
            addChart("pie","pieChart");
            chartFilterBar("line",".chartFilter#line");
            addChart("line","lineChart");
            jenkinsRadiator(".jenkinsRadiator#jenkins");
            dashboardButtonPanel();
            $('body').on('slid.bs.carousel','#carousel-example-generic', function (){
                lineChart.render();
            });
        }
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "reportBlog"){
			document.getElementById("col-md-9").style.width = '70%';
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
			document.getElementById("col-md-9").style.width = '70%';
            $(".col-md-9").empty();
			$(".setup_buttons").empty();
			$(".setup").show();
			requestCase();
			requestSet();
			requestObject();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "sets"){
			document.getElementById("col-md-9").style.width = '70%';
            SetSetup("true");
			requestCase();
			$(".setup").show();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "executions"){
			document.getElementById("col-md-9").style.width = '70%';
            var boo="true";
            exeSetup(boo);
			requestSet();
			requestCase();
			$(".setup").show();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "cases"){
			document.getElementById("col-md-9").style.width = '70%';
            caseSetUp();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "objects"){
			document.getElementById("col-md-9").style.width = '70%';
            requestObject();
            objectSetup();
			$(".col-md-12-set").empty();
			$(".col-md-12-case").empty();
			$(".col-md-12-execution").empty();
			$(".setup").show();
		}
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "test"){
			document.getElementById("col-md-9").style.width = '70%';
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