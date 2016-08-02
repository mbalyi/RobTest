var rowProjectId;

function requestProjectManaging(){
    $.get("/getAdminNav",
         function(data,status){
            $("#nav-col-md-9").empty().append(data);
    });
    $.get("/getProjectManagement",function(data,status){
        if(status){
            $("#nav-test-col-md-9").empty().append(data);
        }
    });
}

function requestProManWNav(){
    $.get("/getProjectManagement",function(data,status){
        if(status){
            $("#nav-test-col-md-9").empty().append(data);
        }
    });
}

function selectRowProject(){
    if(rowProjectId == ""){
        rowProjectId=$(event.target).attr('id');
        $("[data-row='editRow']#"+$(event.target).attr('id')).attr('class','info');
    }
    else{
        if(rowProjectId != $(event.target).attr('id')){
            $("[data-row='editRow']#"+rowProjectId).removeAttr('class');
            $("[data-row='editRow']#"+$(event.target).attr('id')).attr('class','info');
            rowProjectId=$(event.target).attr('id');
        }
        else{
            $("[data-row='editRow']#"+rowProjectId).removeAttr('class');
            rowProjectId="";
        }
    }
}

function activateProject(){
    if(rowProjectId != ""){
        var sendData="projectId="+rowProjectId+"&status=active";
        $.post("/projectActive",sendData,function(data,status){
            if(status){
                $(".projectStatus[data-dbid="+rowProjectId+"]").empty().append(data);
                $(".projectStatus[data-dbid="+rowProjectId+"]").css("color","#5cb85c");
            }
        });
    }
}

function deactivateProject(){
    if(rowProjectId != ""){
        var sendData="projectId="+rowProjectId+"&status=inactive";
        $.post("/projectActive",sendData,function(data,status){
            if(status){
                $(".projectStatus[data-dbid="+rowProjectId+"]").empty().append(data);
                $(".projectStatus[data-dbid="+rowProjectId+"]").css("color","#d9534f");
            }
        });
    }
}

function addProject(){
    $(".newProjectForm").slideToggle();
}

function confirmProjectDeletion(){
    id=event.target.id;
	$("#"+id+".projectDeletion").popover({content: "<p style='color:black;'>Are you sure to delete this project?</p><button type='button' class='btn btn-danger btn-xs' data-dbid='"+id+"' onclick='deleteProject()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelProject("+id+")' style='width:50%;'>Cancel</button>",html:true});
    $("#"+id+".projectDeletion").popover('show');
}
function cancelProject(id){
    $("#"+id+".projectDeletion").popover('hide');
}
function deleteProject(){
    var sendData="projectId="+$(event.target).attr('data-dbid');
    $.post("/deleteProject",sendData,function(data,status){
       if(status){
           $("#"+id+".projectDeletion").popover('hide');
           requestProManWNav();
       } 
    });
}

function saveProject(){
	if($("input[type='text'][data-newproject='projectName']").val()==""){
        $(".projectErrorMessage").tooltip({title: "Name is missing!"});
        $(".projectErrorMessage").tooltip('show');
    }
    else{
        $(".projectErrorMessage").tooltip('hide');
        var sendData="projectName="+$("input[type='text'][data-newproject='projectName']").val();
        $.post("/saveProject",sendData,function(data,status){
            if(status){
                if(data != "failed"){
                    $(".projectSelector").append("<option data-dbid="+data+">"+$("input[type='text'][data-newproject='projectName']").val()+"</option>");
                    requestProManWNav();
                }
                else{
                    $(".projectErrorMessage").tooltip({title: "Projectname still exists!"});
                    $(".projectErrorMessage").tooltip('show');
                }
            }
        });
    }
}

function projectTagTab(){
    $(this).tab('show');
}

function confirmTagDeletion(){
    id=$(event.target).attr('data-tagid');
	$("[data-tagid='"+id+"'].tagDeletion").popover({content: "<p style='color:black;'>Are you sure to delete this tag?</p><button type='button' class='btn btn-danger btn-xs' data-dbid='"+id+"' onclick='deleteTag()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelTag("+id+")' style='width:50%;'>Cancel</button>",html:true});
    $("[data-tagid='"+id+"'].tagDeletion").popover('show');
}
function cancelTag(id){
    $("[data-tagid='"+id+"'].tagDeletion").popover('hide');
}
function deleteTag(){
    var sendData="tagId="+$(event.target).attr('data-dbid');
    $.post("/deleteTag",sendData,function(data,status){
       if(status){
           $("[data-tagid="+id+"].tagDeletion").popover('hide');
           $("[data-tagid="+id+"].rowLink").closest("tr").remove();
       } 
    });
}

function saveTag(){
	if($("input[type='text'][data-newtag='tagName']").val()==""){
        $(".tagErrorMessage").tooltip({title: "Name is missing!"});
        $(".tagErrorMessage").tooltip('show');
    }
    else{
        $(".tagErrorMessage").tooltip('hide');
        if($("input[name=dynamic]:checked")[0] == undefined){
            var dynamic=0;
        }
        else{
            var dynamic=1;
        }
        var sendData="tagName="+$("input[type='text'][data-newtag='tagName']").val()+"&projectId="+$(".projectSelector").find(":selected").attr("data-dbid")+"&dynamic="+dynamic;
        $.post("/saveTag",sendData,function(data,status){
            if(status){
                if(data != "failed"){
                    $("#tagTable").empty().append(data);
                }
                else{
                    $(".tagErrorMessage").tooltip({title: "Tag still exists!"});
                    $(".tagErrorMessage").tooltip('show');
                }
            }
        });
    }
}