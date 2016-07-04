iterator = 1;

function requestCase(){
    $.get("/case_page",
		function(data,status){
			if(status){
				$(".col-md-12-case").empty().append(data);
			};
		}
	);
}

function caseForm(checker){
    $.get("/caseForm/"+$(".projectSelector").find(":selected").attr('data-dbid'),
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data);
                if(checker){
                    enableForm();
                }
			};
		}
	);
}

function add_step(){
	var html="<tr><th><input id=action_'"+iterator+"' class='action form-control' type='text' name='action[]' value='Event'></th><th>"
	html+="<input id=result_'"+iterator+"' class='result form-control' type='text' name='result[]' value='Result'></th></tr>"
	iterator++;
	return html;
}

function saveCase(){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=number]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&");
	$.post("/save_case", sendData,
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
     var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=number]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&");
	$.post("/updateCase/"+caseId, sendData,
		function(data,status){
			if(status){
				loadCase(caseId,"loadCase");
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
				}
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
				caseForm();
			};
		}
	);
}

function enableForm(){  
    $("input[type=checkBox]").removeAttr("disabled");
    $("input[type=text][name=title]").removeAttr('readonly');
    $("input[type=number][name=priority]").removeAttr('readonly');
    $("input[type=text][name=data]").removeAttr('readonly');
    $("input[type=text][name='action[]']").removeAttr('readonly');
    $("input[type=text][name='result[]']").removeAttr('readonly');
    document.getElementById('add_step').disabled=false;
    document.getElementById('delete_step').disabled=false;
    document.getElementById('up_step').disabled=false;
    document.getElementById('down_step').disabled=false;
    $("#newCase").attr('disabled', true);
    $(".saveCase").empty().append(saveCaseEn1+"newCase"+saveCaseEn2);
}

function caseHideShow(){
    if($(".caseHideShow").attr("data-mode")=="show"){
        $(".caseList").hide();
        $(".caseHideShow").attr("data-mode",'hide');
        $(".caseHideShow").empty().append("<span class='glyphicon glyphicon-collapse-down'></span>");
    }
    else{
        $(".caseList").show();
        $(".caseHideShow").attr("data-mode",'show');
        $(".caseHideShow").empty().append("<span class='glyphicon glyphicon-collapse-up'></span>");
    }
}

function caseSearch(){
    for (i=0; i < $(".case").length;i++){
        var search=$("input[name=caseSearch]").val();
        if($(".case")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $(".case")[i].id;
            $("[data-dbid=case"+classFilt.toString()+"]").show();
        }
        else{
           var classFilt= $(".case")[i].id;
            $("[data-dbid=case"+classFilt.toString()+"]").hide();
        }
        if (search == ""){
            for (i=0; i < $(".case").length;i++){
                var classFilt= $(".case")[i].id;
                $("[data-dbid=case"+classFilt.toString()+"]").show();
            }
        }
    }
}

$(function(){
	$("body").on("click","#add_step",function(){
				$(".case_table_no").append(add_step());
	});
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "case"){
			loadCase($(event.target).attr('data-dbid'),"loadCase");
		}
		if( event.target.id == "newCase"){
            if($("button[name=edit_case]") !=[]){
                caseForm("true");
            }
            else{
                enableForm();
            }
		}
		if( event.target.id == "cancelCase"){
			$(".setup_buttons").empty().append(caseBtn);
			caseForm();
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
			loadCase($(event.target).attr('id'),"editCase");
			getStep($(event.target).attr('id'),"editStep");
			$(".newCase").empty().append(newCaseDis);
			$(".saveCase").empty().append(saveCaseEn1+$(event.target).attr('id')+saveCaseEn2);
		}
	});
});