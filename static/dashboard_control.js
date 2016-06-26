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
	chartFilterBar(".chartFilter#pie");
	addChart("pie","pieChart");
	chartFilterBar(".chartFilter#line");
	addChart("line","lineChart");
	jenkinsRadiator(".jenkinsRadiator#jenkins");
});