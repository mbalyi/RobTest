var rowId;
function userSetup(){
    document.getElementById("col-md-9").style.width = '70%';
    $(".setup_buttons").hide();
    $(".col-md-12-set").empty();
    $(".col-md-12-case").empty();
    $(".col-md-12-execution").empty();
    $(".setup").show();
    requestAdmin();
}

function requestAdmin(){
    $("#mainHeader").css('margin-bottom','0px');
    $(".setup").css('padding-left','0px');
    $.get("/getUsers",
         function(data,status){
            if(status){
                $(".col-md-9").empty().append(data);
            } 
    });
    $.get("/getAdminNav",
         function(data,status){
            $(".col-md-12-set").empty().append(data);
    });
}

function selectRow(){
    $("[data-row='editRow']#"+rowId).removeAttr('class');
    $("#"+rowId+".rowLink").css("color","#eee");
    $("[data-row='editRow']#"+$(event.target).attr('id')).attr('class','info');
    $(event.target).css("color","black");
    rowId=$(event.target).attr('id');
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
	$.post("/saveUser",$("input").serialize(),
		function(data,status){
			if(status){
				requestAdmin(
					{ active:true, filter:"" },
					function(res){
						//window.location.reload();
						$(".col-md-9").empty().append(res);
						$(".col-md-9").append(insertUser)
						addAdminButtons();
					}
				);
			}
		}
	)
}

function deleteUser(){
	$.post("/deleteUser", $("input").serialize(),
		function(data,status){
			if(status){
				requestAdmin(
					{ active:true, filter:"" },
					function(res){
						//window.location.reload();
						$(".col-md-9").empty().append(res);
						$(".col-md-9").append(insertUser)
						addAdminButtons();
					}
				);
			}
		}
	)
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
    if( event.target.id == "new_user"){
			$(".newUserInsert").append(newUser+iterator+newUser2+iterator+newUser3);
			$(".insert_save_button").empty().append(SaveUserEn);
			$(".insert_delete_button").empty().append(delUserbtnDis);
			iterator=iterator+1;
		}
		if( event.target.id == "save_user"){
			saveUser();
			iterator=0;
		}
		if( event.target.id == "cancel_user"){
			$(".newUserInsert").empty();
			$(".insert_save_button").empty().append(SaveDis);
			$(".insert_delete_button").empty().append(delUserbtnEn);
			$(".slideMoving").slideUp();
			iterator=0;
		}
		if( event.target.id == "delete_user"){
			deleteUser();
		}
        if($(event.target).attr('name')=="edit"){
			ID=event.target.id;
			$("#"+ID+".slideMoving").slideToggle();
		}
})