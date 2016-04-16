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

function requestChart(){
	$.get("/requestChart",
		function(data,status){
			if(status){
				$(".canvasHeader").empty().append(data);
				load();
			};
		}
	);
}

var submenu = {
	"dashboard": [{
		"title": "Dashboard",
		"click": function(){
			$(this).one("click",function(){
				$(".col-md-9").empty();
				requestChart();
				$(".text_area").hide();
				$(".setup").hide();
			})
		}
	},{
		"title": "Report",
		"click": function(){
			$(this).one("click",function(){
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
			})
		}
	}],
	"setup": [{
		"title": "design",
		"click": function(){
			$(this).one("click",function(){
				$.post("/design",{}, function(){	
				});
			})
			$(".setup").show();
		}
	}],
	"test": [{
		"title": "Test",
		"click": function(){
			$(this).one("click",function(){
				testSetup();
				
			})
		}
	}],
	"design": [{
		"title": "Cases",
		"click": function(){
			$(this).one("click",function(){
				caseSetUp();
			})
		}
	},{
		"title": "Sets",
		"click": function(){
			$(this).one("click",function(){
				SetSetup();
				requestCase();
				$(".setup").show();
			})
		}
	},{
		"title": "Executions",
		"click": function(){
			$(this).one("click",function(){
				exeSetup();
				requestSet();
				requestCase();
				$(".setup").show();
			})
		}
	},{
		"title": "Objects",
		"click": function(){
			$(this).one("click",function(){
				objectSetup();
				$(".col-md-12-set").empty();
				$(".col-md-12-case").empty();
				$(".col-md-12-execution").empty();
				$(".setup").show();
			})
		}
	}],
	"admin": [{
		"title": "Kick user",
		"click": function(){
			$(this).one("click",function(){
				window.location.href = "/";
			})
			$(".setup").hide();
		}
	}]
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
	
	$("#submenu").empty().append("<li><a href='#' id='report'>Report</a></li>")
    requestHeader(
        { active:true, filter:"" },

        function(res){
            $(".header-script").append(GenerateHeader(res));
        }
    );
	$("#dashboard, #design, #test, #setup, #admin").on("mouseover",function(evt){
		var container = $("#submenu").empty();
		for(var el in submenu[evt.currentTarget.id]){
			var menu = submenu[evt.currentTarget.id][el];
			var a = $("<li><a href='#' id='"+menu.title+"'>"+ menu.title +"</a></li>");
			
			a.click(menu.click);
			container.append(a);
		}
		$("#collapse_submenu").show();
	});
	$("#design").on("click",function(){
		$(".col-md-9").empty();
		$(".setup_buttons").empty();
		$(".setup").show();
		requestCase();
		requestSet();
		requestObject();
	})
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
	$("#dashboard").on("click",function(){
		requestDashboard(
			{ active:true, filter:"" },
			function(res){
				//window.location.reload();
				$(".col-md-9").empty().append(newform)
				$(".col-md-9").append(res);
				$(".text_area").hide()
				$(".insert_jira_button").empty()
				addButtons();
			}
		);
		$(".setup").hide();
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