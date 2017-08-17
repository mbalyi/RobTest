var DivForm="<div class='divContainer' style='width:100%;height:100%'></div>";
var buttonSetup="<div class='buttonSetup' style='width:100%;'></div>";
var actualModul="default";
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
    actualModul="case";
    $("#nav-col-md-9").empty().append(designNavbar);
    $("#nav-design-col-md-9").empty().append(DivForm);
    $("#nav-design-col-md-9").prepend(buttonSetup);
    $(".col-md-12-case").empty().show();
    $(".col-md-12-set").empty().hide();
    $(".col-md-12-object").empty().hide();
    $(".col-md-12-execution").empty().hide();
    caseSetUp();
}

function navExecution(){
    actualModul="exe";
    $("#nav-col-md-9").empty().append(designNavbar50);
    $("#nav-design-col-md-9").empty().append(DivForm);
    $("#nav-design-col-md-9").prepend(buttonSetup);
    $(".col-md-12-set").empty().show();
    $(".col-md-12-case").empty().hide();
    $(".col-md-12-object").empty().hide();
    $(".col-md-12-execution").empty().show();
    var boo="true";
    exeSetup(boo);
    requestSet();
    $(".setup").show();
}

function navSet(){
    actualModul="set";
    $("#nav-col-md-9").empty().append(designNavbar50);
    $("#nav-design-col-md-9").empty().append(DivForm);
    $("#nav-design-col-md-9").prepend(buttonSetup);
    $(".col-md-12-set").empty().show();
    $(".col-md-12-case").empty().show();
    $(".col-md-12-object").empty().hide();
    $(".col-md-12-execution").empty().hide();
    SetSetup("true");
    requestCase();
    $(".setup").show();
}

function navObject(){
    actualModul="object";
    $("#nav-col-md-9").empty().append(designNavbar);
    $("#nav-design-col-md-9").empty().append(DivForm);
    $("#nav-design-col-md-9").prepend(buttonSetup);
    $(".col-md-12-object").empty().show();
    requestObject();
    objectSetup();
    $(".col-md-12-set").empty().hide();
    $(".col-md-12-case").empty().hide();
    $(".col-md-12-execution").empty().hide();
    $(".setup").show();
}

function navTest(){
    $("#nav-col-md-9").empty().append(testNavbar);
    $(".setup_buttons").empty().show();
	$(".col-md-12-case").empty().hide();
	$(".col-md-12-set").empty().show();
	$(".col-md-12-object").empty().hide();
	$(".col-md-12-execution").empty().hide();
	requestTest();
	$(".setup").show();
}

function navDashboard(){
    $("#nav-col-md-9").empty().append(testNavbar);
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
        if (lineChart != undefined)
            lineChart.render();
    });
}

function navReportBlog(){
    $("#nav-col-md-9").empty().append(reportNavbar);
    $(".setup_buttons").show();
    requestDashboard(
            { active:true, filter:"" },
            function(res){
                //window.location.reload();
                $("#nav-report-col-md-9").empty().append(newform);
                $("#nav-report-col-md-9").append(res);
                $(".text_area").hide();
                $(".insert_jira_button").empty();
                addButtons();
            }
        );
        $(".setup").hide();
}

$(function(){
    $( ".projectSelector" ).change(function() {
        alert( "Handler for .change() called." );
        projectChanging();
        
    });
	$("#submenu").empty().append("<li><a href='#' id='report'>Report</a></li>")
    /*requestHeader(
        { active:true, filter:"" },

        function(res){
            $(".header-script").append(GenerateHeader(res));
        }
    );*/
	
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