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
    var sendData=$("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=date]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&")+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&ID="+$(".incCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=");
	$.post("/save_set", sendData,
		function(data,status){
			if(status){
				requestSet()
			};
		}
	);
}

function updateSet(setId){
    var sendData=$("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=date]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&")+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&ID="+$(".incCases a").map(function(index,node){return node.dataset.dbid;}).toArray().join("&ID=")+"&setId=";
    sendData+=setId;
	$.post("/updateSet", sendData,
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
    if($("a[name=editSet]")==[]){
        $(".incCases").attr('ondrop','drop(event)');
        $(".incCases").attr('ondragover','allowDrop(event)');
        $("input[type=checkBox]").removeAttr("disabled");
        $("input[type=text][name=name]").removeAttr('readonly');
        $("input[type=text][name=priority]").removeAttr('readonly');
    }
    else{
        SetSetup("false");
    }
	$(".newSet").empty().append(newSetDis);
	$(".saveSet").empty().append(saveSetEn);
}

function setHideShow(){
    if($(".setHideShow").attr("data-mode")=="show"){
        $(".setList").hide();
        $(".setHideShow").attr("data-mode",'hide');
        $(".setHideShow").empty().append("<span class='glyphicon glyphicon-collapse-down'></span>");
    }
    else{
        $(".setList").show();
        $(".setHideShow").attr("data-mode",'show');
        $(".setHideShow").empty().append("<span class='glyphicon glyphicon-collapse-up'></span>");
    }
}

function setSearch(){
    for (i=0; i < $(".set").length;i++){
        var search=$("input[name=setSearch]").val();
        if($(".set")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $(".case")[i].id;
            $("[data-dbid=set"+classFilt.toString()+"]").show();
        }
        else{
           var classFilt= $(".set")[i].id;
            $("[data-dbid=set"+classFilt.toString()+"]").hide();
        }
        if (search == ""){
            for (i=0; i < $(".set").length;i++){
                var classFilt= $(".set")[i].id;
                $("[data-dbid=set"+classFilt.toString()+"]").show();
            }
        }
    }
}

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "set"){
			loadSet($(event.target).attr('data-dbid'), "loadSet");
			//alert(event.target.id + $(event.target).attr('class'));
		}
		if( event.target.id == "saveSet"){
            if($(".setForm").attr('data-dbid')=="newSet"){
				saveSet();
			}
			else{
				updateSet($(".setForm").attr('data-dbid'));
			}
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