var FilterNavbar="";

function chartFilterBar(type,direction){
	$.get("/chartFilter/"+type+"/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				$(direction).prepend(data);
			};
		}
	);
}

function getTooltipInfo(){
    $.get("/requestChart/tooltipinfo/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				return data;
			};
		},
		"json"
	);
}

function addChart(type,direction){
	$.get("/requestChart/"+type+"/"+$(".projectSelector").find(":selected").attr('data-dbid'),
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
var pieChart;
function createLineChart(template,direction){
	lineChart = new CanvasJS.Chart(direction,
		{
			theme: "theme3",
                        animationEnabled: true,
			title:{
				text: "All Results",
				fontSize: 30
			},
			toolTip: {
				shared: true,
                content: "{name} <br> {y}"
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
	pieChart = new CanvasJS.Chart(direction,
		{
			title:{
				text: "All Results"
			},	
            animationEnabled: true,
			legend:{
				verticalAlign: "bottom",
				horizontalAlign: "center"
			},
			data: [ ], 
        });
		pieChart.options.data=template;
		pieChart.render();
}

function pieReload(type){
 $.get("/chartReload/"+type+"/"+$('[data-selectorid="pieInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="pieVersion"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="pieArea"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="pieStatus"]').find(":selected").attr('data-status'),
		function(data,status){
			if(status){
				pieChart.options.data=data;
                pieChart.options.animationEnabled=true;
                //pieChart.options.title=$('[data-selectorid="pieVersion"]').find(":selected").html();
                pieChart.render();
			};
		},
		"json"
	);
}

$(function(){
	//chartFilterBar();
	//addChart("pie","chartID");
});