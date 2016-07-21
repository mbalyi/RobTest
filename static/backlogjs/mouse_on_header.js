var DivForm="<div class='divContainer' style='width:100%;height:100%'></div>";
var buttonSetup="<div class='buttonSetup' style='width:100%;'></div>";

function requestHeader(options, callback){
    $.ajax({ url: "/home",
        data: options,
        dataType: "json",
        type: "get",
        success: callback
    });
}

function caseSetUp(){
    $("#mainHeader").css('margin-bottom','5px');
    $(".setup_buttons").hide();
	$(".buttonSetup").empty().append(caseBtn);
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

function testareaDesign(){
    tinymce.init({ 
        selector:'textarea',
        theme: 'modern',
        height: 50,
        plugins: [
          'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
          'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
          'save table contextmenu directionality emoticons template paste textcolor'
        ],
        toolbar: ' styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image print'
    });
}

function navCase(){
    $("#nav-col-md-9").empty().append(designNavbar);
    $("#nav-design-col-md-9").empty().append(DivForm);
    $("#nav-design-col-md-9").prepend(buttonSetup);
    caseSetUp();
}

function navExecution(){
    $(".col-md-9").empty().append(DivForm);
    $(".col-md-9").prepend(buttonSetup);
    var boo="true";
    exeSetup(boo);
    requestSet();
    requestCase();
    $(".setup").show();
}

function navSet(){
    $(".col-md-9").empty().append(DivForm);
    $(".col-md-9").prepend(buttonSetup);
    SetSetup("true");
    requestCase();
    $(".setup").show();
}

function navObject(){
    $(".col-md-9").empty().append(DivForm);
    $(".col-md-9").prepend(buttonSetup);
    requestObject();
    objectSetup();
    $(".col-md-12-set").empty();
    $(".col-md-12-case").empty();
    $(".col-md-12-execution").empty();
    $(".setup").show();
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
			$(".setup_buttons").empty().show();
			document.getElementsByClassName("col-md-9")[0].style.width = '100%';
            dashboardLoad();
            chartFilterBar("pie",".chartFilter#pie");
            addChart("pie","pieChart","pie",10);
            chartFilterBar("line",".chartFilter#line");
            addChart("line","lineChart","line",10);
            jenkinsFilter();
            jenkinsRadiator(".jenkinsRad",30);
            addChart("pie","allPie","allPie",10);
            addChart("line","allLine","allLine",10);
            jenkinsRadiator(".allJenkinsRad",10);
            dashboardButtonPanel();
            $('body').on('slid.bs.carousel','#carousel-example-generic', function (){
                lineChart.render();
            });
        }
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "reportBlog"){
			document.getElementsByClassName("col-md-9")[0].style.width = '100%';
            $(".setup_buttons").show();
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
		if( $(event.target).attr('class') == "header" && $(event.target).attr('id') == "test"){
            $(".setup_buttons").show();
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
	
	/*$("#admin").on("click",function(){
		requestAdmin(
			{ active:true, filter:"" },
			function(res){
				//window.location.reload();
				$(".col-md-9").empty().append(res);
				$(".col-md-9").append(insertUser)
				addAdminButtons();
			}
		);
	});*/
	
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