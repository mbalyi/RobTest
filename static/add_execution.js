function requestExe(){
	$.get("/execution_page",
		function(data,status){
			if(status){
				$(".col-md-12-execution").empty().append(data);
			};
		}
	)
}

function exeSetup(request,checker){
    $(".setup_buttons").empty().append(exeBtn);
    if(request=="true"){
        $(".col-md-12-object").empty();
        requestExe();
        $(".setup").show();
    }
    $.get("/newExe",
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
                if(checker){
                    newExe();
                }
			}
			else{
				alert("DB query was unsuccessfull")
			}
		}
	);
    $(".elementOfCaseList").removeAttr('draggable');
}

function saveExe(){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=date]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&ID="+$(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=")+"&TO="+$(".objectSeletor").find(":selected").attr('data-dbid');
	$.post("/saveExe", sendData,
		function(data,status){
			if(status){
				requestExe();
				loadExecution(data,"loadExe")
			}
		},"json"
	);
}

function updateExecution(exeId){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=date]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&ID="+$(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=")+"&TO="+$(".objectSeletor").find(":selected").attr('data-dbid');
    sendData += "&exeId=";
    sendData+=exeId;
    sendData+="&projectId=";
    sendData+=$(".projectSelector").find(":selected").attr('data-dbid');
	$.post("/updateExe", sendData,
		function(data,status){
			if(status){
				requestExe();
				loadExecution(data,"loadExe")
			}
		},"json"
	);
}

function newExe(){
	$(".incExeCases").attr('ondrop','drop(event)');
    $(".incExeCases").attr('ondragover','allowDrop(event)');
     //ondrop='drop(event)' ondragover='allowDrop(event)'
    $("input[type=text][name=title]").removeAttr('readonly');
    $("input[type=text][name=title]").removeAttr('readonly');
    $(".objectSeletor").removeAttr('disabled');
    $("input[type=checkBox]").removeAttr("disabled");
    $(".newExe").empty().append(newExeDis);
    $(".saveExe").empty().append(saveExeEn);
}

function loadExecution(exeID,mode){
	$.get("/loadExecution/"+exeID+"/"+mode,
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
			};
		}
	)
}

function deleteExe(exeId){
	$.get("/deleteExe/"+exeId+"/"+$("input.object").attr('data-dbid'),
		function(data,status){
			if(status){
				exeSetup('true');
				$(".setup_buttons").empty().append(exeBtn);
			};
		}
	);
}

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "execution"){
			loadExecution($(event.target).attr('data-dbid'), "loadExe");
		}
		if( event.target.id == "saveExe"){
            if($(".exeHeader").attr('data-dbid')=="newExecution"){
                saveExe();
                $(".setup_buttons").empty().append(exeBtn);
            }
            else{
                updateExecution($(".exeHeader").attr('data-dbid'));
                 $(".setup_buttons").empty().append(exeBtn);
            }
		}
		if( event.target.id == "newExe"){
			if($("a[name=editExe]")==[]){
                newExe();    
            }
            else{
                exeSetup("false","true");
            }
		}
		if( event.target.id == "cancelExe"){
			exeSetup('false');
			$(".setup_buttons").empty().append(exeBtn);
		}
		if( $(event.target).attr('name')=="deleteExe" ){
			deleteExe($(event.target).attr('data-dbid'));
		}
		if( $(event.target).attr('name')=="editExe" ){
			loadExecution($(event.target).attr('data-dbid'),"editExe");
            $("#newExe").attr('disabled', true);
            $(".saveExe").empty().append(saveExeEn);
		}
	});
});