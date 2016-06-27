function requestExe(){
	$.get("/execution_page",
		function(data,status){
			if(status){
				$(".col-md-12-execution").empty().append(data);
			};
		}
	)
}

function exeSetup(){
	$(".setup_buttons").empty().append(exeBtn);
	$(".col-md-9").empty().append(exeForm);
	$(".col-md-12-object").empty();
	requestExe();
	$(".setup").show();
}

function saveExe(){
	$.post("/saveExe", $("input").serialize()+"&ID="+$(".incExeCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=")+"&TO="+$(".objectSeletor").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				requestExe();
				loadExecution(data,"loadExe")
			}
		},"json"
	);
}

function newExe(){
	$.get("/newExe",
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
				$(".newExe").empty().append(newExeDis);
				$(".saveExe").empty().append(saveExeEn);
			}
			else{
				alert("DB query was unsuccessfull")
			}
		}
	)
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
	$.get("/deleteExe/"+exeId,
		function(data,status){
			if(status){
				exeSetup()
				$(".setup_buttons").empty().append(exeBtn);
				$(".col-md-9").empty().append(exeForm);
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
			saveExe();
			$(".setup_buttons").empty().append(exeBtn);
		}
		if( event.target.id == "newExe"){
			newExe();
		}
		if( event.target.id == "cancelExe"){
			$(".col-md-9").empty().append(exeForm);
			$(".setup_buttons").empty().append(exeBtn);
		}
		if( $(event.target).attr('name')=="deleteExe" ){
			deleteExe($(event.target).attr('data-dbid'));
		}
		if( $(event.target).attr('name')=="editExe" ){
			loadExecution($(event.target).attr('data-dbid'),"editExe");
		}
	});
});