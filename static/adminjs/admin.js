var rowId;

function requestAdmin(){
    $.get("/getAdminNav",
         function(data,status){
            $("#nav-col-md-9").empty().append(data);
    });
    $.get("/getUsers",
         function(data,status){
            if(status){
                $("#nav-test-col-md-9").empty().append(data);
                $(".slideMoving").hide();
            } 
    });
}
function requestAdminWNav(){
    $("#mainHeader").css('margin-bottom','0px');
    $(".setup").css('padding-left','0px');
    $.get("/getUsers",
         function(data,status){
            if(status){
                $("#nav-design-col-md-9").empty().append(data);
            } 
    });
}

function selectRow(){
    if(rowId == ""){
        rowId=$(event.target).attr('id');
        $("[data-row='editRow']#"+$(event.target).attr('id')).attr('class','info');
    }
    else{
        if(rowId != $(event.target).attr('id')){
            $("[data-row='editRow']#"+rowId).removeAttr('class');
            $("[data-row='editRow']#"+$(event.target).attr('id')).attr('class','info');
            rowId=$(event.target).attr('id');
        }
        else{
            $("[data-row='editRow']#"+rowId).removeAttr('class');
            rowId="";
        }
    }
}

function activateUser(){
    if(rowId != ""){
        var sendData="userId="+rowId+"&status=active";
        $.post("/userActive",sendData,function(data,status){
            if(status){
                $(".userStatus[data-dbid="+rowId+"]").empty().append(data);
                $(".userStatus[data-dbid="+rowId+"]").css("color","#5cb85c");
            }
        });
    }
}

function deactivateUser(){
    if(rowId != ""){
        var sendData="userId="+rowId+"&status=inactive";
        $.post("/userActive",sendData,function(data,status){
            if(status){
                $(".userStatus[data-dbid="+rowId+"]").empty().append(data);
                $(".userStatus[data-dbid="+rowId+"]").css("color","#d9534f");
            }
        });
    }
}

function saveNewPw(){
    var id = $(event.target).attr('id');
    var sendData="oldPw="+$("input[name=oldPw][id="+id+"]").val()+"&newPw="+$("input[name=newPw][id="+id+"]").val();
    sendData+="&id="+id;
    $.post("/savePassword",sendData,
          function(data,status){
            if(data=="false"){
                alert("error");
            }
            else{
                alert("success");
                $("input[name=oldPw][id="+id+"]").val('');
                $("input[name=newPw][id="+id+"]").val('');
                $("#"+id+".slideMoving").slideUp();
            }
    });
}

function saveUser(){
	if($("input[type='text'][data-newuser='userName']").val()=="" || $("input[type='password'][data-newuser='userPassword']").val()==""){
        if($("input[type='text'][data-newuser='userName']").val()=="" && $("input[type='password'][data-newuser='userPassword']").val()=="")
            $(".userErrorMessage").tooltip({title: "Username and password are missing!"});
        if($("input[type='text'][data-newuser='userName']").val()=="")
            $(".userErrorMessage").tooltip({title: "Username is missing!"});
        if($("input[type='password'][data-newuser='userPassword']").val()=="")
            $(".userErrorMessage").tooltip({title: "Password is missing!"});
        $(".userErrorMessage").tooltip('show');
    }
    else{
        $(".userErrorMessage").tooltip('hide');
        var sendData="userName="+$("input[type='text'][data-newuser='userName']").val()+"&password="+$("input[type='password'][data-newuser='userPassword']").val()+"&roleId=";
        sendData=sendData+$(".newRoleSelector").find(':selected').attr('data-roleid')+"&projectId="+$(".projectSelector").find(':selected').attr('data-dbid');
        $.post("/saveUser",sendData,function(data,status){
            if(status){
                if(data == "success"){
                    requestAdminWNav();
                }
                else{
                    $(".userErrorMessage").tooltip({title: "Username still exists!"});
                    $(".userErrorMessage").tooltip('show');
                }
            }
        });
    }
}

function addUser(){
    $(".newUserForm").slideToggle();
}

function confirmUserDeletion(){
    id=event.target.id;
	$("#"+id+".userDeletion").popover({content: "<p style='color:black;'>Are you sure to delete this user?</p><button type='button' class='btn btn-danger btn-xs' data-dbid='"+id+"' onclick='deleteUser()' style='width:50%;'>Delete</button><button type='button' class='btn btn-default btn-xs' onclick='cancelUser("+id+")' style='width:50%;'>Cancel</button>",html:true});
    $("#"+id+".userDeletion").popover('show');
}
function cancelUser(id){
    $("#"+id+".userDeletion").popover('hide');
}
function deleteUser(){
    var sendData="userId="+$(event.target).attr('data-dbid');
    $.post("/deleteUser",sendData,function(data,status){
       if(status){
           $("#"+id+".userDeletion").popover('hide');
           requestAdminWNav();
       } 
    });
}

function roleChange(){
    var userId=$(event.target).attr("data-selectorid");
    var sendData="userId="+userId+"&roleId="+$(".roleSelector[data-selectorid="+userId+"]").find(":selected").attr('data-roleid');
    $.post("/updateUserRole", sendData,
		function(data,status){
			     if(data=="error"){
                     alert("error");
                 }
			}
	);
}


$(function(){
        if($(event.target).attr('name')=="edit"){
			ID=event.target.id;
			$("#"+ID+".slideMoving").slideToggle();
		}
})