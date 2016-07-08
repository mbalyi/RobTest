function dashboardLoad(){
	$.get("/dashboardLoad",
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
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
    document.getElementById("col-md-9").style.width = '100%'
	dashboardLoad();
	chartFilterBar("pie",".chartFilter#pie");
	addChart("pie","pieChart","pie",100);
	chartFilterBar("line",".chartFilter#line");
	addChart("line","lineChart","line",1000);
	jenkinsRadiator(".jenkinsRad",200);
    addChart("pie","allPie","allPie",500);
    addChart("line","allLine","allLine",200);
    jenkinsRadiator(".allJenkinsRad",50);
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
        if($("#idPieChart").attr('class')=="item active")
            pieChart.render();
        if($("#idLineChart").attr('class')=="item active")
            lineChart.render();
        if($("#idAllChart").attr('class')=="item active"){
            allPieChart.render();
            allLineChart.render();
        }
        //addChart("line","lineChart");
    });
});