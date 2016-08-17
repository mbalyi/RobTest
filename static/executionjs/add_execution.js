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
    $("#mainHeader").css('margin-bottom','5px');
    $(".setup_buttons").hide();
    $(".buttonSetup").empty().append(exeBtn);
    if(request=="true"){
        $(".col-md-12-object").empty();
        requestExe();
        $(".setup").show();
    }
    $.get("/newExe",
		function(data,status){
			if(status){
				$(".divContainer").empty().append(data);
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
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&ID="+$(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=")+"&TO="+$(".objectSeletor").find(":selected").attr('data-dbid')+"&userId="+$(".userSelector").find(":selected").attr("data-dbid");
    if($(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=") != ""){
        $.post("/saveExe", sendData,
            function(data,status){
                if(status){
                    $(".buttonSetup").empty().append(exeBtn);
                    if(document.getElementById("fileUploadExe").files.length > 0){
                        updateFilesToExe(data);
                    }
                    requestExe();
                    loadExecution(data,"loadExe")
                }
            },"json"
        );
    }
    else{
         $("#insertcircle").empty();
        alert("Add a set to the execution!");
    }
}

function updateExecution(exeId){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=date]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&ID="+$(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=")+"&TO="+$(".objectSeletor").find(":selected").attr('data-dbid')+"&userId="+$(".userSelector").find(":selected").attr("data-dbid");
    sendData += "&exeId=";
    sendData+=exeId;
    sendData+="&projectId=";
    sendData+=$(".projectSelector").find(":selected").attr('data-dbid');
    if($(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=") != ""){
        $.post("/updateExe", sendData,
            function(data,status){
                if(status){
                    $(".buttonSetup").empty().append(exeBtn);
                    fileUpdateOnExe(exeId);
                    requestExe();
                    loadExecution(data,"loadExe");
                }
            },"json"
        );
    }
     else{
         $("#insertcircle").empty();
        alert("Add a set to the execution!");
    }
}

function newExe(){
	$(".incExeCases").attr('ondrop','drop(event)');
    $(".incExeCases").attr('ondragover','allowDrop(event)');
     //ondrop='drop(event)' ondragover='allowDrop(event)'
    $("input[type=text][name=title]").removeAttr('readonly');
    $("input[type=text][name=title]").removeAttr('readonly');
    $(".objectSeletor").removeAttr('disabled');
    $(".userSelector").removeAttr('disabled');
    $("input[type=checkBox]").removeAttr("disabled");
    $(".newExe").empty().append(newExeDis);
    $(".saveExe").empty().append(saveExeEn);
    $(".elementOfCaseList").removeAttr("ondragover");
    $(".elementOfCaseList").removeAttr("ondragstart");
    $(".elementOfCaseList").removeAttr("draggable");
    $("input[name=dynamicArea]").removeAttr('disabled');
    $("body").on('drop',dropRemoveExe);
    $("body").on('dragover',allowDrop);
}

function loadExecution(exeID,mode){
	$.get("/loadExecution/"+exeID+"/"+mode,
		function(data,status){
			if(status){
				$(".divContainer").empty().append(data);
			};
		}
	)
}

function deleteExe(exeId){
	$.get("/deleteExe/"+exeId+"/"+$("input.object").attr('data-dbid'),
		function(data,status){
			if(status){
				exeSetup('true');
				$(".buttonSetup").empty().append(exeBtn);
			};
		}
	);
}

function exeHideShow(){
    if($(".exeHideShow").attr("data-mode")=="show"){
        $(".exeList").hide();
        $(".col-md-12-execution")[0].style.height="62px";
        $(".exeHideShow").attr("data-mode",'hide');
        $(".exeHideShow").empty().append("<i class='fa fa-chevron-down'></i>");
        if($(".setHideShow").attr("data-mode")=="show"){
            $(".col-md-12-set")[0].style.height="calc(100% - 62px)";
        }
    }
    else{
        if($(".setHideShow").attr("data-mode")=="show"){
            $(".col-md-12-execution")[0].style.height="50%";
            $(".col-md-12-set")[0].style.height="50%";
        }
        else{
            $(".col-md-12-execution")[0].style.height="calc(100% - 62px)";
        }
        $($(".panel-execution")[0]).show();
        $(".exeList").show();
        $(".exeHideShow").attr("data-mode",'show');
        $(".exeHideShow").empty().append("<i class='fa fa-chevron-up'></i>");
    }
}

function exeSearch(){
    for (i=0; i < $(".execution").length;i++){
        var search=$("input[name=exeSearch]").val();
        if($(".execution")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $(".execution")[i].id;
            $("[data-dbid=exe"+classFilt.toString()+"]").show();
        }
        else{
           var classFilt= $(".execution")[i].id;
            $("[data-dbid=exe"+classFilt.toString()+"]").hide();
        }
        if (search == ""){
            for (i=0; i < $(".execution").length;i++){
                var classFilt= $(".execution")[i].id;
                $("[data-dbid=exe"+classFilt.toString()+"]").show();
            }
        }
    }
}

function toggleExeFileCont(){
    if($("#newExe").attr('class')=="btn btn-default btn-sm disabled" || $($(".exeHeader")[0]).attr("data-dbid") != "newExecution")
        $(".uploadContent").slideToggle();
}

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "execution" && actualModul == "exe"){
			loadExecution($(event.target).attr('data-dbid'), "loadExe");
		}
		if( event.target.id == "saveExe"){
            $("#insertcircle").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
            if($(".exeHeader").attr('data-dbid')=="newExecution"){
                saveExe();
            }
            else{
                updateExecution($(".exeHeader").attr('data-dbid'));
            }
		}
		if( event.target.id == "newExe"){
			if($(".exeHeader").attr("data-dbid")=="newExecution"){
                newExe();    
            }
            else{
                exeSetup("false","true");
            }
		}
		if( event.target.id == "cancelExe"){
			exeSetup('false');
			$(".buttonSetup").empty().append(exeBtn);
		}
		if( $(event.target).attr('name')=="deleteExe" ){
			deleteExe($(event.target).attr('data-dbid'));
		}
		if( $(event.target).attr('name')=="editExe" ){
			loadExecution($(event.target).attr('data-dbid'),"editExe");
            $("#newExe").attr('disabled', true);
            $(".saveExe").empty().append(saveExeEn);
            $("body").on('drop',dropRemoveExe);
            $("body").on('dragover',allowDrop);
		}
	});
});