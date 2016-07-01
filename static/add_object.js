function requestObject(){
    $.get("/object_page",
		function(data,status){
			if(status){
				$(".col-md-12-object").empty().append(data);
			};
		}
	)
}

function save_object(){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&")+"&";
    sendData += $("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&");
	$.post("/save_object", sendData,
		function(data,status){
			if(status){
				loadObject(data,"loadObject");
			}
		},
		"json"
	);
}

function loadObject(ObjectId,mode){
	$.get("/load_object/"+ObjectId+"/"+mode,
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
			};
		}
	);
}

function objectSetup(checker){
    $.get("/objectForm/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
                if(checker){
                    enableObjectForm();
                }
			};
		}
	)
	$(".setup_buttons").empty().append(objectBtn);
}

function deleteObject(objectId){
	$.get("/deleteObject/"+objectId,
		function(data,status){
			if(status){
				objectSetup();
			};
		}
	);
}

function enableObjectForm(){  
    $("input[type=checkBox]").removeAttr("disabled");
    $("input[type=text][name=name]").removeAttr('readonly');
    $("input[type=text][name=hardware]").removeAttr('readonly');
    $("input[type=text][name=desc").removeAttr('readonly');
    $("input[type=text][name=version]").removeAttr('readonly');
    $("#newObject").attr('disabled', true);
    $("#saveObject").attr('disabled', false);
}

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "object"){
			loadObject(event.target.id,"loadObject");
			requestObject();
		}
		if( event.target.id == "newObject"){
            if($("a[name=editObject]")==[]){
                enableObjectForm();
            }
            else{
                objectSetup("true");
            }
		}
		if( event.target.id == "cancelObject"){
			objectSetup();
		}
		if( event.target.id == "saveObject"){
			save_object();
			$(".setup_buttons").empty().append(objectBtn);
		}
		if( $(event.target).attr('name') == "editObject"){
			loadObject(event.target.id,"editObject");
			$("#newObject").attr('disabled', true);
            $("#saveObject").attr('disabled', false);
		}
		if( $(event.target).attr('name') == "deleteObject"){
			deleteObject(event.target.id);
		}
	});
});