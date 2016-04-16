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
	$.post("/save_object", $("input").serialize(),
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

function objectSetup(){
	$(".col-md-9").empty().append(objectForm);
	$(".setup_buttons").empty().append(objectBtn);
	requestObject();
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

$(function(){
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "object"){
			loadObject(event.target.id,"loadObject");
			requestObject();
		}
		if( event.target.id == "newObject"){
			$(".col-md-9").empty().append(objectEditableForm);
			$(".newObject").empty().append(newObjectDis);
			$(".saveObject").empty().append(saveObjectEn);
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
			$(".newObject").empty().append(newObjectDis);
			$(".saveObject").empty().append(saveObjectEn);
		}
		if( $(event.target).attr('name') == "deleteObject"){
			deleteObject(event.target.id);
		}
	});
});