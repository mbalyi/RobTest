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
				$(direction).empty().prepend(data);
			};
		}
	);
}
function jenkinsFilter(){
    $.get("/jenkinsFilter",
		function(data,status){
			if(status){
				$(".jenkinsFilter").empty().prepend(data);
			};
		}
	);
}
function jenkinsReload(){
    jenkinsRadiator(".jenkinsRad",$(".jenkinsFilter").find(":selected").attr('data-interval'));
}

function jenkinsHide(status){
    if($("[name=passed]").is(':checked'))
        $(".passed").hide();
    else
        $(".passed").show();
    if($("[name=failed]").is(':checked'))
        $(".danger").hide();
    else
        $(".danger").show();
    if($("[name=skipped]").is(':checked'))
        $(".warning").hide();
    else
        $(".warning").show();
}

var lineChart;
var pieChart;
var allPieChart;
var allLineChart;

function createLineChart(template,direction,chartt){
    if (template != undefined &&
        template[1] != undefined &&
        template[1].series != undefined) {
        var chart = {renderTo: direction,type: 'column'};
        var title = {text: 'All Results'};
        var xAxis = template[0].xAxis;
        var yAxis = {
                min: 0,
                title: {
                    text: 'No. Cases'
                }
            };
        var tooltip = {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            };
        var plotOptions = {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            };
        var series = template[1].series;
        var Chart={};
        Chart.chart=chart;
        Chart.title=title;
        Chart.xAxis=xAxis;
        Chart.yAxis=yAxis;
        Chart.tooltip=tooltip;
        Chart.plotOptions=plotOptions;
        Chart.series=series;
        line= new Highcharts.Chart(Chart);
        line.renderTo;
        if(chartt=="line")
            lineChart=line;
        else
            allLineChart=line;
    }
}

function createPieChart(template,direction,chartt){
    if (template != undefined) {
        var chart = {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            renderTo: direction,
            type: 'pie'
        };
        var title = {text: 'All Results'};
        var tooltip = {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                };
        var plotOptions = {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        size:'100%',
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: true
                    }
                };
        var series = template;
        var Chart={};
        Chart.chart=chart;
        Chart.title=title;
        Chart.tooltip=tooltip;
        Chart.plotOptions=plotOptions;
        Chart.series=series;
        pie = new Highcharts.Chart(Chart);
        pie.renderTo;
        if(chartt=="pie"){
            pieChart=pie;
        }
        else
            allPieChart=pie;
    }
}

function pieExeReload(type){
    $.get("/chartExeReload/"+$('[data-selectorid="pieVersion"]').find(":selected").attr('data-dbid'),function(data,status){
       if(status){
           $('[data-selectorid="pieExecution"]').empty().append(data);
           pieReload(type);
       } 
    });
}

function lineExeReload(type){
    $.get("/chartExeReload/"+$('[data-selectorid="lineVersion"]').find(":selected").attr('data-dbid'),function(data,status){
       if(status){
           $('[data-selectorid="lineExecution"]').empty().append(data);
           lineReload(type);
       } 
    });
}

function pieReload(type){
 $.get("/chartReload/"+type+"/"+$('[data-selectorid="pieInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="pieVersion"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="pieArea"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="pieStatus"]').find(":selected").attr('data-status')+"/"+$('[data-selectorid="pieInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="pieExecution"]').find(":selected").attr('data-dbid')+"/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
                if(type=="pie"){
                    var chart = {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        renderTo: 'pieChart',
                        type: 'pie'
                    };
                    var title = {text: $("select[data-selectorid=pieVersion]").find(":selected").val().toString()};
                    var tooltip = {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            };
                    var plotOptions = {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    size:'100%',
                                    dataLabels: {
                                        enabled: true
                                    },
                                    showInLegend: true
                                }
                            };
                    var series = data;
                    var Chart={};
                    Chart.chart=chart;
                    Chart.title=title;
                    Chart.tooltip=tooltip;
                    Chart.plotOptions=plotOptions;
                    Chart.series=series;
                    if (pieChart != undefined)
                        pieChart.destroy();
                    pieChart = new Highcharts.Chart(Chart);
                    pieChart.renderTo;
                }
			};
		},
		"json"
	);
}
function lineReload(type){
 $.get("/chartReload/"+type+"/"+$('[data-selectorid="lineInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="lineVersion"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="lineArea"]').find(":selected").attr('data-dbid')+"/"+$('[data-selectorid="lineStatus"]').find(":selected").attr('data-status')+"/"+$('[data-selectorid="lineInterval"]').find(":selected").attr('data-interval')+"/"+$('[data-selectorid="lineExecution"]').find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
                if(type=="line"){
                    var chart = {renderTo: 'lineChart',type: 'column'};
                    var title = {text: $("select[data-selectorid=lineVersion]").find(":selected").val().toString()};
                    var xAxis = data[0].xAxis;
                    var yAxis = {
                            min: 0,
                            title: {
                                text: 'No. Cases'
                            }
                        };
                    var tooltip = {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        };
                    var plotOptions = {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        };
                    var series = data[1].series;
                    var Chart={};
                    Chart.chart=chart;
                    Chart.title=title;
                    Chart.xAxis=xAxis;
                    Chart.yAxis=yAxis;
                    Chart.tooltip=tooltip;
                    Chart.plotOptions=plotOptions;
                    Chart.series=series;
                    if (lineChart != undefined)
                        lineChart.destroy();
                    lineChart= new Highcharts.Chart(Chart);
                    lineChart.renderTo;
                }
			};
		},
		"json"
	);
}