var FilterNavbar="";

function chartFilterBar(direction){
	$.get("/chartFilter",
		function(data,status){
			if(status){
				$(direction).prepend(data);
			};
		}
	);
}


function addChart(type,direction){
	$.get("/requestChart/"+type,
		function(data,status){
			if(status){
				if(type == "line")
					createLineChart(data,direction)
				if(type == "pie")
					createPieChart(data,direction)
			};
		},
		"json"
	);
}

function jenkinsRadiator(direction){
	$.get("/jenkinsRadiator",
		function(data,status){
			if(status){
				$(direction).prepend(data);
			};
		}
	);
}

var lineChart;

function createLineChart(template,direction){
	lineChart = new CanvasJS.Chart(direction,
		{
			theme: "theme3",
                        animationEnabled: true,
			title:{
				text: "Template Line Chart",
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
            	lineChart.render();
            }
          },
        });
		lineChart.options.data=template;
		lineChart.render();
}

function createPieChart(template,direction){
	var chart = new CanvasJS.Chart(direction,
		{
			title:{
				text: "Template Pie Chart"
			},
            animationEnabled: true,
			legend:{
				verticalAlign: "bottom",
				horizontalAlign: "center"
			},
			data: [ ], 
        });
		chart.options.data=template;
		chart.render();
}

$(function(){
	//chartFilterBar();
	//addChart("pie","chartID");
});