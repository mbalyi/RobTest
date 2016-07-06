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
				$(".divContainer").empty().append(data);
                if(checker){
                    enableForm();
                }
			};
		}
	);
}

function add_step(){
    var html="<div draggable='true' ondragstart='drag(event)' ondragover='dragHover(event)'><table style='width:100%'><tr><th><a href='#' class='step'>#</a></th>";
    html+="<th'><textarea name='action[]' class='action form-control' rows='1' overflow='auto' resize='none' onkeypress='reSizeTextarea(event)'>Action description</textarea></th><th >";
    html+="<textarea name='result[]' class='result form-control' rows='1' overflow='hidden' resize='none' onkeypress='reSizeTextarea(event)'>Result description</textarea></th></tr></table></div>";
	return html;
}

function saveCase(){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=number]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&");
    sendData = sendData+"&"+$("textarea").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
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
    sendData = sendData+"&"+$("textarea").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
	$.post("/updateCase/"+caseId, sendData,
		function(data,status){
			if(status){
				loadCase(caseId,"loadCase");
                requestCase();
			};
		}
	);
}

function loadCase(caseId,mode){
	$.get("/load_case/"+caseId+"/"+mode,
		function(data,status){
			if(status){
				$(".divContainer").empty().append(data);
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
				$(".buttonSetup").empty().append(caseBtn);
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
    //$("input[type=text][name='action[]']").removeAttr('readonly');
    //$("input[type=text][name='result[]']").removeAttr('readonly');
    $('textarea').removeAttr('disabled');
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

function reSizeTextarea(ev){
    if ($(ev.target)[0].offsetHeight <= $(ev.target)[0].scrollHeight+2){
        var number=parseInt($(ev.target).attr('rows'))
        number=number+1;
        return $(ev.target).attr('rows',number);
    }
}

$(function(){
	$("body").on("click","#add_step",function(){
				$(".newStepPlace").append(add_step());
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
			$(".buttonSetup").empty().append(caseBtn);
			caseForm();
		}
		if( event.target.id == "saveCase"){
			if($(".editablecase").attr('data-dbid')=="newCase"){
				saveCase();
			}
			else{
				updateCase($(".editablecase").attr('data-dbid'));
			}
			$(".buttonSetup").empty().append(caseBtn);
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