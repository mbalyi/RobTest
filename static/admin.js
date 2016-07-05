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
    $.post("/savePassword",sendData,
          function(data,status){
            if(data=="false"){
                alert("error");
            }
            else{
                alert("success");
            }
    });
}