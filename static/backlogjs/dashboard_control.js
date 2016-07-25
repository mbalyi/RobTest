function dashboardLoad(){
	$.get("/dashboardLoad",
		function(data,status){
			if(status){
				$("#nav-test-col-md-9").empty().append(data);
				$(".setup").hide();
			};
		}
	);
}

function dashboardButtonPanel(){
	$(".setup_buttons").empty().append(dashboardButton);
}

function dashboardPrev(){
	$('#carousel-example-generic').carousel('prev');
}

function dashboardNext(){
	$('#carousel-example-generic').carousel('next');
}

function dashboardMode(){
	var MyDiv1 = document.getElementById('dashboardModeID');
	if(MyDiv1.innerHTML == "Manual"){
		$('#carousel-example-generic').carousel('pause');
		$('.dashboardModeID#dashboardModeID').empty().append("Auto");
	}
	else{
		$('#carousel-example-generic').carousel('cycle');
		$('.dashboardModeID#dashboardModeID').empty().append("Manual");
	}
}

$(function(){
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
	$("body").on("click","a",function(event) {
		if($(event.target).attr('class') == "dashboardPrev"){
			$('#carousel-example-generic').carousel('prev');
		}
		if($(event.target).attr('class') == "dashboardNext"){
			$('#carousel-example-generic').carousel('next');
		}
	});
    $('body').on('slid.bs.carousel','#carousel-example-generic', function (){
        if($("#idPieChart").attr('class')=="item chart active"){
            var height = $("#pieChart").height();
            var width = $("#pieChart").width();
            pieChart.setSize(width, height, doAnimation = true);
            pieChart.renderTo;
        }
        if($("#idLineChart").attr('class')=="item chart active"){
            var height = $("#lineChart").height();
            var width = $("#lineChart").width();
            lineChart.setSize(width, height, doAnimation = true);
            lineChart.renderTo;
        }
        if($("#idAllChart").attr('class')=="item active"){
            allPieChart.renderTo;
            allLineChart.renderTo;
        }
        //addChart("line","lineChart");
    });
});