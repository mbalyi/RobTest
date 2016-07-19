function databaseManagementSetup(){
    document.getElementById("col-md-9").style.width = '70%';
    $(".setup_buttons").hide();
    $(".col-md-12-set").empty();
    $(".col-md-12-case").empty();
    $(".col-md-12-execution").empty();
    $(".col-md-12-object").empty();
    $(".setup").show();
    $(".col-md-9").empty().append(DivForm);
    requestDatabaseManaging();
}

function requestDatabaseManaging(){
    $("#mainHeader").css('margin-bottom','0px');
    $(".setup").css('padding-left','0px');
    $.get("/getDatabaseManagement",function(data,status){
        if(status){
            $(".divContainer").empty().append(data);
        }
    });
    $.get("/getAdminNav",
         function(data,status){
            $(".col-md-12-set").empty().append(data);
    });
}

function requestDatManWNav(){
    $("#mainHeader").css('margin-bottom','0px');
    $(".setup").css('padding-left','0px');
    $.get("/getDatabaseManagement",function(data,status){
        if(status){
            $(".col-md-9").empty().append(data);
        }
    });
}

function confirmObjectDeletion(){
    id=event.target.id;
	$("#"+id+".objectDeletion").popover({content: "<p style='color:black;'>Are you sure to delete this Object?</p><button type='button' class='btn btn-danger btn-xs' data-dbid='"+id+"' onclick='deleteObjectMan()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelObjectMan("+id+")' style='width:50%;'>Cancel</button>",html:true});
    $("#"+id+".objectDeletion").popover('show');
}
function cancelObjectMan(id){
    $("#"+id+".objectDeletion").popover('hide');
}
function deleteObjectMan(){
    $.get("/deleteObjectPhysical/"+$(event.target).attr('data-dbid'),function(data,status){
        if(status){
            $(".objectManage").empty().append(data);
        }
    });
}

function confirmExeDeletion(){
    id=event.target.id;
	$("#"+id+".exeDeletion").popover({content: "<p style='color:black;'>Execution deletion works only from Execution menu.</p><button type='button' class='btn btn-default btn-xs' onclick='cancelExeMan("+id+")' style='width:100%;'>Ok</button>",html:true});
    $("#"+id+".exeDeletion").popover('show');
}
function cancelExeMan(id){
    $("#"+id+".exeDeletion").popover('hide');
}

function confirmSetDeletion(){
    id=event.target.id;
	$("#"+id+".setDeletion").popover({content: "<p style='color:black;'>Are you sure to delete this set?</p><button type='button' class='btn btn-danger btn-xs' data-dbid='"+id+"' onclick='deleteSetMan()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelSetMan("+id+")' style='width:50%;'>Cancel</button>",html:true});
    $("#"+id+".setDeletion").popover('show');
}
function cancelSetMan(id){
    $("#"+id+".setDeletion").popover('hide');
}
function deleteSetMan(){
    $.get("/deleteSetPhysical/"+$(event.target).attr('data-dbid'),function(data,status){
        if(status){
            $(".setManage").empty().append(data);
        }
    });
}

function confirmExeDeletion(){
    id=event.target.id;
	$("#"+id+".exeDeletion").popover({content: "<p style='color:black;'>Execution deletion works only from Execution menu.</p><button type='button' class='btn btn-default btn-xs' onclick='cancelExeMan("+id+")' style='width:100%;'>Ok</button>",html:true});
    $("#"+id+".exeDeletion").popover('show');
}
function cancelExeMan(id){
    $("#"+id+".exeDeletion").popover('hide');
}

function confirmCaseDeletion(){
    id=event.target.id;
	$("#"+id+".caseDeletion").popover({content: "<p style='color:black;'>Are you sure to delete this case?</p><button type='button' class='btn btn-danger btn-xs' data-dbid='"+id+"' onclick='deleteCaseMan()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelCaseMan("+id+")' style='width:50%;'>Cancel</button>",html:true});
    $("#"+id+".caseDeletion").popover('show');
}
function cancelCaseMan(id){
    $("#"+id+".caseDeletion").popover('hide');
}
function deleteCaseMan(){
    $.get("/deleteCasePhysical/"+$(event.target).attr('data-dbid'),function(data,status){
        if(status){
            $(".caseManage").empty().append(data);
        }
    });
}

function confirmObjectAllDel(event){
    $(event.target).popover({content: "<p style='color:black;'>Are you sure to delete all objects?</p><button type='button' class='btn btn-danger btn-xs' onclick='deleteAllOb()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelObjectAll("+event.target+")' style='width:50%;'>Cancel</button>",html:true});
    $(event.target).popover('show');
}
function cancelObjectAll(event){
    $(event).popover('destroy');
}
function deleteAllOb(){
    $.get("/deleteAllObject",function(data,status){
        if(status){
            $(".objectManage").append(data);
        }
    });
}
function confirmSetAllDel(event){
    $(event.target).popover({content: "<p style='color:black;'>Are you sure to delete all sets?</p><button type='button' class='btn btn-danger btn-xs' onclick='deleteAllSet()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelSetAll("+event.target+")' style='width:50%;'>Cancel</button>",html:true});
    $(event.target).popover('show');
}
function cancelSetAll(event){
    $(event).popover('destroy');
}
function deleteAllSet(){
    $.get("/deleteAllSet",function(data,status){
        if(status){
            $(".setManage").append(data);
        }
    });
}
function confirmCaseAllDel(event){
    $(event.target).popover({content: "<p style='color:black;'>Are you sure to delete all casess?</p><button type='button' class='btn btn-danger btn-xs' onclick='deleteAllCase()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelCaseAll("+event.target+")' style='width:50%;'>Cancel</button>",html:true});
    $(event.target).popover('show');
}
function cancelCaseAll(event){
    $(event).popover('destroy');
}
function deleteAllCase(){
    $.get("/deleteAllCase",function(data,status){
        if(status){
            $(".caseManage").append(data);
        }
    });
}