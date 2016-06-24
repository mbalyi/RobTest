
function addChart(){
	$.get("/requestChart",
		function(data,status){
			if(status){
				createChart(data)
			};
		}
	);
	/*var temp;
	$.ajax({
		url: "/requestChart",
		data: temp,
		dataType: "json"
	});
	createChart(temp);*/
}
function createChart(template){
	var chart = new CanvasJS.Chart("chartID",
		{
			theme: "theme3",
                        animationEnabled: true,
			title:{
				text: "Template chart",
				fontSize: 30
			},
			toolTip: {
				shared: true
			},			
			axisY: {
				title: "Count"
			},
			data: [ ],
          legend:{
            cursor:"pointer",
            itemclick: function(e){
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              	e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
            	chart.render();
            }
          },
        });
		chart.options.data.push(template);
		chart.render();
}

$(function(){
	
});