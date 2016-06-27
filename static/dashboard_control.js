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
	chartFilterBar(".chartFilter#pie");
	addChart("pie","pieChart");
	chartFilterBar(".chartFilter#line");
	addChart("line","lineChart");
	jenkinsRadiator(".jenkinsRadiator#jenkins");
	dashboardButtonPanel();
	$("body").on("click","a",function(event) {
		if($(event.target).attr('class') == "dashboardPrev"){
			$('#carousel-example-generic').carousel('prev');
		}
		if($(event.target).attr('class') == "dashboardNext"){
			$('#carousel-example-generic').carousel('next');
		}
	});
    $('body').one('slid.bs.carousel','#carousel-example-generic', function (){
        lineChart.render();
    });
});