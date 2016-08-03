var divId;
var caseIdInExe;
var caseIterator;

function requestTest(){
	$.get("/testSetup",
		function(data,status){
			if(status){
				$("#nav-test-col-md-9").empty().append(data);
                loadTest($(".executionSelector").find(":selected").attr('data-dbid'));
			};
		}
	)
}

function testPage(pageID){
	$.get("/testPage/"+pageID+"/"+$(".executionSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				$("#test-col-md-9").empty().append(data);
				divId=$($('.stepHolder').children()[0]).attr('data-stepMarkerId');
				$("#"+divId+".stepMarker").empty().append(cursor);
				caseIdInExe=pageID;
                $("#modalContainer").empty();
                for(i=0;i<$(".stepMarker").length;i++){
                    loadModal($($(".stepMarker")[i]).attr("data-dbid"));
                }
			};
		}
	)
}

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
	$.get("/saveStatus/"+stepId+"/"+$(".executionSelector").find(":selected").attr('data-dbid')+"/"+status,
		function(data,status){
			
		}
	)
}

function saveCaseStatus(){
	$.get("/saveCaseStatus/"+$(".executionSelector").find(":selected").attr('data-dbid')+"/"+caseIdInExe,
		function(data,status){
			$("#"+caseIdInExe+".Res").empty().append(data);
		}
	);
}

function checkDivId(direction){
	if( direction == "NEXT" && $($("[data-stepMarkerId='"+divId+"']").next()).attr('data-stepMarkerId') != undefined){
		divId=$($("[data-stepMarkerId='"+divId+"'").next()).attr('data-stepMarkerId');
	}
	if( direction == "PREV" && ($($("[data-stepMarkerId='"+divId+"']").prev()).attr('data-stepMarkerId') != undefined )){
		divId=$($("[data-stepMarkerId='"+divId+"']").prev()).attr('data-stepMarkerId');
	}
}

function addComment(){
    eventId=$(event.target).attr('data-dbid');
    $("[data-dbid='"+eventId+"'][data-popname='stepPop']").popover({content: "<table style='color:black;'><tr><td colspan='2'><textarea rows='1' class='commentArea' data-dbid='"+eventId+"' overflow='auto' resize='none' onkeypress='reSizeTextarea(event)' placeholder='"+event.target.innerHTML+"'></textarea></td></tr><tr><td style='width:50%;><button type='button' class='btn btn-danger btn-xs' onclick='saveComment("+eventId+")'>Save</button></td><td style='width:50%;><button type='button' class='btn btn-default btn-xs' onclick='cancelCom("+eventId+")'>Cancel</button></td></tr></table>",html:true});
    $("[data-dbid='"+eventId+"'][data-popname='stepPop']").popover('show');
}
function cancelCom(eventId){
    $("[data-dbid='"+eventId+"'][data-popname='stepPop']").popover('hide');
}
function saveComment(eventId){
    var sendData="comment="+$("textarea[class='commentArea'][data-dbid='"+eventId+"']").val();
    $.post("/saveComment/"+eventId+"/"+$(".executionSelector").find(":selected").attr('data-dbid'),sendData,function(data,status){
        if(status){
            $("[data-comment='comment'][data-dbid='"+eventId+"']").empty().append(data);
            $("[data-dbid='"+eventId+"'][data-popname='stepPop']").popover('hide');
        }
    });
}

function updateIds(){
    $.get("/updateStepExeCorrectWay",function(data,status){
        if(status){
            alert("ok");
        }
    });
}

function selectOtherExe(){
    loadTest($(".executionSelector").find(":selected").attr('data-dbid'));
}

$(function(){
	$("body").on("click","a",function(event) {
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
        if( event.target.id == "SKIPPED"){
			saveStatus("SKIPPED",divId);
			$("#"+divId+".Result").empty().append(statusSkipped);
			saveCaseStatus();
		}
        if( event.target.id == "NOTIMP"){
			saveStatus("NOTIMP",divId);
			$("#"+divId+".Result").empty().append(statusNotImp);
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
			divId=$($('.stepHolder').children()[0]).attr('data-stepMarkerId');
		}
		if( event.target.id == "NEXTCASE"){
			if($($('.caseMain'+'#'+caseIdInExe).next()).attr('id') != undefined){
                $($(".caseMarker")[caseIterator]).empty();
                caseIterator++;
                caseIdInExe=$($('.caseMain'+'#'+caseIdInExe).next()).attr('id');
                testPage(caseIdInExe);
                $($(".caseMarker")[caseIterator]).empty().append(cursor);
                divId=$($('.stepHolder').children()[0]).attr('data-stepMarkerId');
            }
		}
		if( event.target.id == "BACKCASE"){
            if($($('.caseMain'+'#'+caseIdInExe).prev()).attr('id') != undefined){
                $($(".caseMarker")[caseIterator]).empty();
                caseIterator--;
                caseIdInExe=$($('.caseMain'+'#'+caseIdInExe).prev()).attr('id');
                testPage(caseIdInExe);
                $($(".caseMarker")[caseIterator]).empty().append(cursor);
                divId=$($('.stepHolder').children()[0]).attr('data-stepMarkerId');
            }
		}
	});
});

function loadModal(id){
    $.get("/loadModal/"+id+"/"+$(".executionSelector").find(":selected").attr("data-dbid"),
		function(data,status){
			if(status){
				$("#modalContainer").append(data);
			};
		}
	);
}

function sendValue(exeId,stepId,varId){
    $("#insertcirclemodal"+exeId+"-"+stepId).empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    if($("[name=variable][data-varid="+varId+"][data-exeid="+exeId+"][data-stepid="+stepId+"]").val() == undefined){
        var sendData="value="
    }
    else{
        var sendData="value="+$("[name=variable][data-varid="+varId+"][data-exeid="+exeId+"][data-stepid="+stepId+"]").val();
    }
    $.post("/sendVarTest/"+exeId+"/"+stepId+"/"+varId,sendData,function(data,status){
        if(status){
            $("#insertcirclemodal"+exeId+"-"+stepId).empty();
        }
    });
}
function clearValue(exeId,stepId,varId){
    $("#insertcirclemodal"+exeId+"-"+stepId).empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    $.get("/clearValue/"+exeId+"/"+stepId+"/"+varId,function(data,status){
        if(status){
            $("#insertcirclemodal"+exeId+"-"+stepId).empty();
            $(".valueInput[data-varid="+varId+"][data-exeid="+exeId+"][data-stepid="+stepId+"]").empty().append("<input type='text' name='variable' placeholder='Value..' class='form-control' data-varid='"+varId+"' data-exeid='"+exeId+"' data-stepid='"+stepId+"'>");
        }
    });
}
function sendAllValue(exeId,stepId){
    for(i=0;i<$("input[name=variable]").length/$(".stepMarker").length;i++)
        sendValue(exeId,stepId,$($("input[name=variable]")[i]).attr("data-varid"));
}
function clearAllValue(exeId,stepId){
    for(i=0;i<$("input[name=variable]").length/$(".stepMarker").length;i++)
        clearValue(exeId,stepId,$($("input[name=variable]")[i]).attr("data-varid"));
}