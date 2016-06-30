function requestSet(){
    $.get("/set_page",
		function(data,status){
			if(status){
				$(".col-md-12-set").empty().append(data);
			};
		}
	);
}

function SetSetup(mode){
	$.get("/setForm",
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
			};
		}
	);
    if(mode != "false"){
        $(".col-md-12-object").empty();
        $(".setup_buttons").empty().append(setBtn);
        $(".col-md-12-execution").empty();
        requestSet();
    }
}

function saveSet(){
	$.post("/save_set", $("input").serialize()+"&ID="+$(".incCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID="),
		function(data,status){
			if(status){
				requestSet()
			};
		}
	);
}

function loadSet(setId,mode){
	$.get("/load_set/"+setId+"/"+mode,
		function(data,status){
			if(status){
				if(mode == "exeCasesBySet"){return data;}
				else{
					$(".col-md-9").empty().append(data);
				}
			};
		}
	);
}

function deleteSet(setId){
	$.get("/deleteSet/"+setId,
		function(data,status){
			if(status){
				SetSetup("false");
				$(".setup_buttons").empty().append(setBtn);
				$(".col-md-9").empty().append(SetForm);
			};
		}
	);
}

function newSet(){
    $(".incCases").attr('ondrop','drop(event)');
    $(".incCases").attr('ondragover','allowDrop(event)');
	$("input[type=checkBox]").removeAttr("disabled");
    $("input[type=text][name=name]").removeAttr('readonly');
    $("input[type=text][name=priority]").removeAttr('readonly');
	$(".newSet").empty().append(newSetDis);
	$(".saveSet").empty().append(saveSetEn);
}

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "set"){
			loadSet($(event.target).attr('data-dbid'), "loadSet");
			//alert(event.target.id + $(event.target).attr('class'));
		}
		if( event.target.id == "saveSet"){
			saveSet();
		}
		if( event.target.id == "newSet"){
			newSet();
		}
		if( event.target.id == "cancelSet"){
			SetSetup("false");
			$(".setup_buttons").empty().append(setBtn);
		}
		if( $(event.target).attr('name')=="deleteset" ){
			deleteSet(event.target.id);
		}
		if( $(event.target).attr('name')=="editSet" ){
			loadSet($(event.target).attr('id'),"editSet");
		}
	});
});