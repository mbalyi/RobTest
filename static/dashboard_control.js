function dashboardLoad(){
	$.get("/dashboardLoad",
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
				$(".setup").hide();
				chartFilterBar(".filterBar");
				addChart("pie","pieChartT");
				addChart("line","lineChartT");
			};
		}
	);
}

$(function(){
	dashboardLoad();
});