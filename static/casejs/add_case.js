var iterator = 1;
var selectedStepEvent;

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
    var html=`
    <div class='stepDragg' draggable='true' ondragstart='drag(event)' ondragover='dragHover(event)'>
        <div id='fullWidth'>
            <table id='fullWidth'>
                <tr id='fullWidth'>
                    <td>
                        <a href='#' data-dbid='{{k[0]}}' id='{{k[0]}}' class='step' onclick='selectStep(event)'>#</a>
                    </td>
                    <td id='halfWidth-1'>
                        <textarea name='action[]' class='action form-control' rows='1' overflow='auto' onkeypress='reSizeTextarea(event)' style='resize:none;'>Action description</textarea>
                    </td>
                    <td id='halfWidth-1'>
                        <textarea name='result[]' class='result form-control' rows='1' overflow='hidden' onkeypress='reSizeTextarea(event)' style='resize:none;'>Result description</textarea>
                    </td>
                    <td>
                        <a href='#' data-dbid='' id='' class='step' onclick='removeStep(event)'><span class='glyphicon glyphicon-remove' style='color:red;'></span></a>
                    </td>
                </tr>
            </table>
        </div>
        <div class='uploadContainer'>
            <form class='form-group' data-formid='newStepActionFile'  method='post' enctype='multipart/form-data' id='fullSize'>
                <input type='file' name='fileToUploadStep' id='fileUploadStepAction' multiple></form></div><div class='uploadContainer'>
                <form class='form-group' data-formid='newStepResultFile'  method='post' enctype='multipart/form-data' id='fullSize'>
                <input type='file' name='fileToUploadStep' id='fileUploadStepResult' multiple>
            </form>
        </div>
    </div>`;
	return html;
}

function saveCase(){
    var sendData = $("input[type=text]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&") + "&"+$("input[type=number]").map(function(i,o){return o.name+"="+o.value}).toArray().join("&");
    sendData = sendData+"&"+$("input:checkbox:checked").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&");
    sendData = sendData+"&"+$("textarea").map(function(i,o){return o.name+"="+encodeURIComponent(o.value.replace(/"/g, "\'"))}).toArray().join("&");
    //console.log($("textarea").map(function(i,o){return o.name+"="+o.value.replace(/"/g, "\'")}).toArray().join("&"))
    /*var fd = new FormData();
    for(i=0; i<$("textarea").length;i++){
        fd.append($($("textarea")[0]).attr('name'), $($("textarea")[0]).val());
    }
    fd.append('title', $("input[name=title]").val());
    fd.append('data', $("input[name=data]").val());
    fd.append('priority', $("input[name=priority]").val());*/
	$.post("/save_case", sendData,
	//$.post("/save_case", $("input").serialize()+"&"+$("textarea").serialize(),
		function(data,status){
			if(status){
                /*if(document.getElementById("fileUploadCase").files.length > 0){
                    updateFilesToCase(data);
                }*/
                uploadStep(data);
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
                fileUpdateOnCase(caseId);
                uploadStep(data);
                requestCase();
                loadCase(data,"loadCase");
			};
		}
	);
}

function uploadStep(caseId){
    $.get("/getStep/"+caseId,function(data,status){
        if(status){
            updateFilesToStep(data);
        }
    },"json");
}

function loadCase(caseId,mode){
	$.get("/load_case/"+caseId+"/"+mode,
		function(data,status){
			if(status){
				$(".divContainer").empty().append(data);
                if(mode == "loadCase"){
                    getStep(caseId,"get_step");
                } else {
                    getStep(caseId,"editStep");
                }
			};
		}
	);
}

function getStep(caseId,mode){
	$.get("/get_step/"+caseId+"/"+mode,
		function(data,status){
			if(status){
				$("#stepContainer").empty().append(data);
                //testareaDesign();
                textEditorEnabler();
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

function textEditorEnabler(){
    $(".action").trumbowyg({
    btnsAdd: ['base64'],
    btnsAdd: ['upload'],
    btnsDef: {
        align: {
            dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ico: 'justifyLeft'
        },
        image: {
            dropdown: ['base64'],
            ico: 'insertImage'
        },
        format: {
            dropdown: ['bold', 'italic', 'underline', 'strikethrough'],
            ico: 'bold'
        },
        list: {
            dropdown: ['unorderedList', 'orderedList'],
            ico: 'unorderedList'
        },
        script: {
            dropdown: ['superscript', 'subscript'],
            ico: 'superscript'
        }
    },
    btns: [
        ['viewHTML'],
        ['formatting'],
        ['format'],
        ['script'],
        ['link'],
        ['image'],
        ['align'],
        ['list'],
        ['horizontalRule'],
        ['removeformat'],
        ['fullscreen']
    ],
    plugins: {
        // Add imagur parameters to upload plugin
        upload: {
            serverPath: '/upload_file_area',
            fileFieldName: 'image',
            headers: {
                'Authorization': 'Client-ID 9e57cb1c4791cea'
            },
            urlPropertyName: 'href',
            error: function (data){
                console.log(data);
                console.log(data.type);
                console.log(data.name);
            },
            success: function (data){
                console.log(data);
                console.log(data.type);
                console.log(data.name);
            }
        }
    }
});
    $(".result").trumbowyg({
    btnsAdd: ['base64'],
    btnsAdd: ['upload'],
    btnsDef: {
        align: {
            dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ico: 'justifyLeft'
        },
        image: {
            dropdown: ['base64'],
            ico: 'insertImage'
        },
        format: {
            dropdown: ['bold', 'italic', 'underline', 'strikethrough'],
            ico: 'bold'
        },
        list: {
            dropdown: ['unorderedList', 'orderedList'],
            ico: 'unorderedList'
        },
        script: {
            dropdown: ['superscript', 'subscript'],
            ico: 'superscript'
        }
    },
    btns: [
        ['viewHTML'],
        ['formatting'],
        ['format'],
        ['script'],
        ['link'],
        ['image'],
        ['align'],
        ['list'],
        ['horizontalRule'],
        ['removeformat'],
        ['fullscreen']
    ],
    plugins: {
        // Add imagur parameters to upload plugin
        upload: {
            serverPath: '/upload_file_area',
            fileFieldName: 'image',
            headers: {
                'Authorization': 'Client-ID 9e57cb1c4791cea'
            },
            urlPropertyName: 'data.link'
        }
    }
});
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
    //document.getElementById('up_step').disabled=false;
    //document.getElementById('down_step').disabled=false;
    $("#newCase").attr('disabled', true);
    $(".saveCase").empty().append(saveCaseEn1+"newCase"+saveCaseEn2);
    $("#stepContainer").css('height','65%');
    $("input[name=dynamicArea]").removeAttr('disabled');
    //testareaDesign();
    $(".uploadContainer > form").css('display','block');
    $('[data-formid="newCaseFile"]').css('display','block');
    textEditorEnabler();
}

function caseHideShow(){
    if($(".caseHideShow").attr("data-mode")=="show" && $(".setHideShow")[0] == undefined){
        $($(".panel-case")[0]).hide();
        $(".col-md-12-case")[0].style.height="62px";
        $(".caseHideShow").attr("data-mode",'hide');
        $(".caseHideShow").empty().append("<i class='fa fa-chevron-down'></i>");
    }
    else{
        $($(".panel-case")[0]).show();
        if($(".setHideShow").attr("data-mode")=="hide")
            $(".col-md-12-case")[0].style.height="calc(100% - 62px)";
        if($(".setHideShow")[0] == undefined)
            $(".col-md-12-case")[0].style.height="100%";
        if($(".setHideShow").attr("data-mode")=="show")
            $(".col-md-12-case")[0].style.height="50%";
        $(".caseHideShow").attr("data-mode",'show');
        $(".caseHideShow").empty().append("<i class='fa fa-chevron-up'></i>");
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
    if ($(ev.target)[0].offsetHeight < $(ev.target)[0].scrollHeight+2){
        var number=parseInt($(ev.target).attr('rows'))
        number=number+1;
        return $(ev.target).attr('rows',number);
    }
}

function toggleCaseFileCont(){
    if($("#newCase").attr('disabled')=="disabled" || $("[name='edit_case']") != [])
        $(".uploadContent").slideToggle();
}

function removeStep(event){
    $(event.target).closest('.stepDragg').remove();
}

function selectStep(event){
    if(event.target!=selectedStepEvent){
        if(selectedStepEvent){
            $(selectedStepEvent).closest('.stepDragg').css("background-color","#333");
            $(selectedStepEvent).closest('.stepDragg').css("color","white");
            $(selectedStepEvent).closest('.stepDragg').css("padding","0px");
        }
        selectedStepEvent=event.target;
        $(event.target).closest('.stepDragg').css("background-color","#eee");
        $(event.target).closest('.stepDragg').css("color","black");
        $(event.target).closest('.stepDragg').css("padding","2px");
    }
    else{
        if(selectedStepEvent){
            $(selectedStepEvent).closest('.stepDragg').css("background-color","#333");
            $(selectedStepEvent).closest('.stepDragg').css("color","white");
            $(selectedStepEvent).closest('.stepDragg').css("padding","0px");
            selectedStepEvent=false;
        }
    }
}

function deleteStep(){
    if(selectedStepEvent){
        $(selectedStepEvent).closest('.stepDragg').remove();
        selectedStepEvent=false;
    }
}

function copyCase(caseId) {
    loadCase(caseId,'copy');
    $(".newCase").empty().append(newCaseDis);
    $("#newCase").attr('disabled', true);
    $(".saveCase").empty().append(saveCaseEn1+"newCase"+saveCaseEn2);
}

$(function(){
	$("body").on("click","#add_step",function(){
        $(".newStepPlace").append(add_step());
        textEditorEnabler();
        return;
	});
	$("body").on("click","a",function(event) {
		if( $(event.target).attr('class') == "case"  && actualModul == "case"){
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
        if($(event.target).attr('name')=="edit_case"){
			loadCase($(event.target).attr('id'),"editCase");
			getStep($(event.target).attr('id'),"editStep");
			$(".newCase").empty().append(newCaseDis);
			$(".saveCase").empty().append(saveCaseEn1+$(event.target).attr('id')+saveCaseEn2);
		}
	});
});