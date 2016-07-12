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

function updateObject(objectId){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&")+"&";
    sendData += $("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&")+"&objectId=";
    sendData+=objectId;
    sendData+="&projectId=";
    sendData+=$(".projectSelector").find(":selected").attr('data-dbid');
	$.post("/updateObject", sendData,
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
				$(".divContainer").empty().append(data);
			};
		}
	);
}

function objectSetup(checker){
    $("#mainHeader").css('margin-bottom','5px');
    $(".setup_buttons").hide();
    $.get("/objectForm/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				$(".divContainer").empty().append(data);
                if(checker){
                    enableObjectForm();
                }
			};
		}
	)
	$(".buttonSetup").empty().append(objectBtn);
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

function objectHideShow(){
    if($(".objectHideShow").attr("data-mode")=="show"){
        $(".objectList").hide();
        $(".objectHideShow").attr("data-mode",'hide');
        $(".objectHideShow").empty().append("<span class='glyphicon glyphicon-collapse-down'></span>");
    }
    else{
        $(".objectList").show();
        $(".objectHideShow").attr("data-mode",'show');
        $(".objectHideShow").empty().append("<span class='glyphicon glyphicon-collapse-up'></span>");
    }
}

function objectSearch(){
    for (i=0; i < $(".object").length;i++){
        var search=$("input[name=objectSearch]").val();
        if($(".object")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $(".object")[i].id;
            $("[data-dbid=object"+classFilt.toString()+"]").show();
        }
        else{
           var classFilt= $(".object")[i].id;
            $("[data-dbid=object"+classFilt.toString()+"]").hide();
        }
        if (search == ""){
            for (i=0; i < $(".object").length;i++){
                var classFilt= $(".object")[i].id;
                $("[data-dbid=object"+classFilt.toString()+"]").show();
            }
        }
    }
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
            if($(".editableObject").attr('data-dbid')=="newObject"){
                save_object();
                $(".buttonSetup").empty().append(objectBtn);
                requestObject();
            }
            else{
                updateObject($(".editableObject").attr('data-dbid'));
                 $(".buttonSetup").empty().append(objectBtn);
            }
			
		}
		if( $(event.target).attr('name') == "editObject"){
			loadObject(event.target.id,"editObject");
			$("#newObject").attr('disabled', true);
            $("#saveObject").attr('disabled', false);
		}
		if( $(event.target).attr('name') == "deleteObject"){
			deleteObject(event.target.id);
            requestObject();
		}
	});
});