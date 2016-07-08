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

function addChart(type,direction,chart,limit){
	$.get("/requestChart/"+type+"/"+$(".projectSelector").find(":selected").attr('data-dbid')+"/"+limit,
		function(data,status){
			if(status){
				if(type == "line")
					createLineChart(data,direction,chart)
				if(type == "pie")
					createPieChart(data,direction,chart)
			};
		},
		"json"
	);
}

function jenkinsRadiator(direction,limit){
	$.get("/jenkinsRadiator/"+limit,
		function(data,status){
			if(status){
				$(direction).prepend(data);
			};
		}
	);
}

var lineChart;
var pieChart;
var allPieChart;
var allLineChart;

function createLineChart(template,direction,chart){
	Chart = new CanvasJS.Chart(direction,
		{
			theme: "theme3",
                        animationEnabled: true,
			title:{
				text: "All Results",
				fontSize: 30
			},
			toolTip: {
				shared: true,
                content: "{name}:{y}"
			},			
			axisY: {
				title: "Count"
			},
			data: [ ],
          legend:{
            cursor:"pointer",
            itemWrap: false,
            itemclick: function(e){
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              	e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
            	Chart.render();
            }
          },
        });
		Chart.options.data=template;
		Chart.render();
        if(chart=="line")
            lineChart=Chart;
        else
            allLineChart=Chart;
}

function createPieChart(template,direction,chart){
	Chart = new CanvasJS.Chart(direction,
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
		Chart.options.data=template;
		Chart.render();
        if(chart=="pie"){
            pieChart=Chart;
        }
        else
            allPieChart=Chart;
}

function pieReload(type){
 $.get("/chartReload/"+type+"/"+$('[data-selectorid="pieInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="pieVersion"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="pieArea"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="pieStatus"]').find(":selected").attr('data-status'),
		function(data,status){
			if(status){
                if(type=="pie"){
                    pieChart.options.data=data;
                    pieChart.options.animationEnabled=true;
                    pieChart.options.title.text = $("select[data-selectorid=pieVersion]").find(":selected").val().toString();
                    pieChart.render();
                }
			};
		},
		"json"
	);
}
function lineReload(type){
 $.get("/chartReload/"+type+"/"+$('[data-selectorid="lineInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="lineVersion"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="lineArea"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="lineStatus"]').find(":selected").attr('data-status'),
		function(data,status){
			if(status){
                if(type=="line"){
                    lineChart.options.data=data;
                    lineChart.options.animationEnabled=true;
                    lineChart.options.title.text = $("select[data-selectorid=lineVersion]").find(":selected").val().toString();
                    lineChart.render();
                }
			};
		},
		"json"
	);
}