iterator = 1;

function requestCase(){
    $.get("/case_page",
		function(data,status){
			if(status){
				$(".col-md-12-case").empty().append(data);
			};
		}
	)
}

function add_step(){
	var html="<tr><th><input id=action_'"+iterator+"' class='action form-control' type='text' name='action[]' value='Event'></th><th>"
	html+="<input id=result_'"+iterator+"' class='result form-control' type='text' name='result[]' value='Result'></th></tr>"
	iterator++;
	return html;
}

function saveCase(){
	$.post("/save_case", $("input").map(function(i,o){return o.name+"="+o.value}).toArray().join("&"),
	//$.post("/save_case", $("input").serialize()+"&"+$("textarea").serialize(),
		function(data,status){
			if(status){
				requestCase();
				loadCase(data,"loadCase");
			};
		},
		"json"
	);
}

function updateCase(caseId){
	$.post("/updateCase/"+caseId, $("input").map(function(i,o){return o.name+"="+o.value}).toArray().join("&"),
		function(data,status){
			if(status){
				loadCase(data,"loadCase");
			};
		}
	);
}

function loadCase(caseId,mode){
	$.get("/load_case/"+caseId+"/"+mode,
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
			};
		}
	);
	if(mode == "loadCase"){
		getStep(caseId,"getStep");
	}
}

function getStep(caseId,mode){
	$.get("/get_step/"+caseId+"/"+mode,
		function(data,status){
			if(status){
				$(".case_table_no").empty().append(data);
				if( mode == "editStep" ){
					$(".stepBtn").empty().append(stepBtn);
				}
			};
		}
	);
}

function loadStep(data){
	var html="<tr><th>Action</th><th>Result</th></tr>"
	data.forEach(function(data){
		html+="<tr><th>"+data[1]+"</th><th>"+ data[2] +"</th></tr>";
    });
	return html;
}

function deleteCase(caseId){
	$.get("/deleteCase/"+caseId,
		function(data,status){
			if(status){
				caseSetUp()
				$(".setup_buttons").empty().append(caseBtn);
				$(".col-md-9").empty().append(caseForm);
				$(".stepBtn").empty().append(stepBtn);
			};
		}
	);
}

$(function(){
	$("body").on("click","#add_step",function(){
				$(".case_table_no").append(add_step());
	});
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "case"){
			loadCase($(event.target).attr('data-dbid'),"loadCase");
			//alert(event.target.id + $(event.target).attr('class'));
		}
		if( event.target.id == "newCase"){
			$(".col-md-9").empty().append(EditableStepHeader);
			$(".case_header").empty().append(editableCaseForm);
			$(".stepBtn").empty().append(stepBtn);
			$(".newCase").empty().append(newCaseDis);
			$(".saveCase").empty().append(saveCaseEn1+"newCase"+saveCaseEn2);
		}
		if( event.target.id == "cancelCase"){
			$(".setup_buttons").empty().append(caseBtn);
			$(".col-md-9").empty().append(caseForm);
			$(".stepBtn").empty().append(stepBtn);
		}
		if( event.target.id == "saveCase"){
			if($(".editablecase").attr('data-dbid')=="newCase"){
				saveCase();
			}
			else{
				updateCase($(".editablecase").attr('data-dbid'));
			}
			$(".setup_buttons").empty().append(caseBtn);
		}
		if( $(event.target).attr('name') == "deleteCase"){
			deleteCase(event.target.id);
		}
	});
	$("body").on("click",".btn",function(){
		if($(event.target).attr('name')=="edit_case"){
			$(".col-md-9").empty().append(EditableStepHeader);
			loadCase($(event.target).attr('id'),"editCase");
			getStep($(event.target).attr('id'),"editStep");
			$(".newCase").empty().append(newCaseDis);
			$(".saveCase").empty().append(saveCaseEn1+$(event.target).attr('id')+saveCaseEn2);
		}
	});
});