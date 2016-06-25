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

$(function(){
	dashboardLoad();
	chartFilterBar(".filterBar");
	addChart("pie","pieChart");
	addChart("line","lineChart");
});