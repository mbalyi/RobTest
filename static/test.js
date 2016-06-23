var divId;
var caseIdInExe;
var caseIterator;

function testSetup(){
	$(".col-md-9").empty().append();
	$(".col-md-12-case").empty();
	$(".col-md-12-set").empty();
	$(".col-md-12-object").empty();
	$(".col-md-12-execution").empty();
	$(".setup_buttons").empty();
	requestTest();
	$(".setup").show();
}
function requestTest(){
	$.get("/testSetup",
		function(data,status){
			if(status){
				$(".setup_buttons").empty().append(data);
			};
		}
	)
}

function testPage(pageID){
	$.get("/testPage/"+pageID+"/"+$("option:selected").attr("data-dbid"),
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
				divId=$($('.col-md-9').children()[1]).attr('class');
				$("#"+divId+".stepMarker").empty().append(cursor);
				caseIdInExe=pageID;
			};
		}
	)
}

/*function getFirstCaseID(exeId){
	$.get("/getFirstCaseID/"+exeId,
		function(data,status){
			if(status){
				return data;
			};
		},
		"json"
	)
}*/

function loadTest(exeId){
	$.get("/loadTest/"+exeId,
		function(data,status){
			if(status){
				$(".col-md-12-set").empty().append(data);
			};
		}
	)
	$.get("/getFirstCaseID/"+exeId,
		function(data,status){
			if(status){
				testPage(data);
				caseIterator=0;
				$($(".caseMarker")[0]).empty().append(cursor);
			};
		},
		"json"
	)
}

function saveStatus(status,stepId){
	$.get("/saveStatus/"+stepId+"/"+$("option:selected").attr("data-dbid")+"/"+status,
		function(data,status){
			
		}
	)
}

function saveCaseStatus(){
	$.get("/saveCaseStatus/"+$("option:selected").attr("data-dbid")+"/"+caseIdInExe,
		function(data,status){
			$("#"+caseIdInExe+".Res").empty().append(data);
		},
		"json"
	)
}

function checkDivId(direction){
	if( direction == "NEXT" && $($('.'+divId).next()).attr('class') != "testButtons"){
		divId=$($('.'+divId).next()).attr('class');
	}
	if( direction == "PREV" && $($('.'+divId).prev()).attr('class') != "testHeader"){
		divId=$($('.'+divId).prev()).attr('class');
	}
}

$(function(){
	$("body").on("click","a",function(event) {
		if( event.target.id == "selectExe"){
			loadTest($("option:selected").attr("data-dbid"));
		}
		if( event.target.id == "RUN"){
			saveStatus("RUN",divId);
			$("#"+divId+".Result").empty().append(statusRun);
			$("#"+divId+".stepMarker").empty();
			checkDivId("NEXT");
			$("#"+divId+".stepMarker").empty().append(cursor);
			saveCaseStatus();
			
		}
		if( event.target.id == "NOTRUN"){
			saveStatus("NOTRUN",divId);
			$("#"+divId+".Result").empty().append(statusNotRun);
			saveCaseStatus();
		}
		if( event.target.id == "FAILED"){
			saveStatus("FAILED",divId);
			$("#"+divId+".Result").empty().append(statusFailed);
			$("#"+divId+".stepMarker").empty();
			checkDivId("NEXT");
			$("#"+divId+".stepMarker").empty().append(cursor);
			saveCaseStatus();
		}
		if( event.target.id == "NEXT"){
			$("#"+divId+".stepMarker").empty();
			checkDivId("NEXT");
			$("#"+divId+".stepMarker").empty().append(cursor);
		}
		if( event.target.id == "BACK"){
			$("#"+divId+".stepMarker").empty();
			checkDivId("PREV");
			$("#"+divId+".stepMarker").empty().append(cursor);
		}
		if( $(event.target).attr('class') == "Step" || $(event.target).attr('class') == "Result"){
			$("#"+divId+".stepMarker").empty();
			divId=$(event.target).attr('data-dbid');
			$("#"+divId+".stepMarker").empty().append(cursor);
		}
		if( $(event.target).attr('class') == "caseInExe"){
			$($(".caseMarker")[caseIterator]).empty();
			caseIterator=$(event.target).attr('data-index')-1;
			testPage($(event.target).attr('data-dbid'));
			caseIdInExe=$(event.target).attr('data-dbid');
			$($(".caseMarker")[caseIterator]).empty().append(cursor);
			divId=$($('.col-md-9').children()[1]).attr('class');
		}
		if( event.target.id == "NEXTCASE"){
			$($(".caseMarker")[caseIterator]).empty();
			caseIterator++;
			caseIdInExe=$($('.caseMain'+'#'+caseIdInExe).next()).attr('id');
			testPage(caseIdInExe);
			$($(".caseMarker")[caseIterator]).empty().append(cursor);
			divId=$($('.col-md-9').children()[1]).attr('class');
		}
		if( event.target.id == "BACKCASE"){
			$($(".caseMarker")[caseIterator]).empty();
			caseIterator--;
			caseIdInExe=$($('.caseMain'+'#'+caseIdInExe).prev()).attr('id');
			testPage(caseIdInExe);
			$($(".caseMarker")[caseIterator]).empty().append(cursor);
			divId=$($('.col-md-9').children()[1]).attr('class');
		}
	});
});