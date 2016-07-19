function caseHistPage(){
    document.getElementById("col-md-9").style.width = '100%';
    $(".col-md-9").empty();
    $("#mainHeader").css('margin-bottom','5px');
    $(".setup_buttons").hide();
    $(".col-md-12-set").empty();
    $(".col-md-12-case").empty();
    $(".col-md-12-execution").empty();
    $(".col-md-12-object").empty();
    $(".setup").hide();
    loadResultForm();
}

function loadResultForm(){
    $.get("/loadResultForm",function(data,status){
        if(status){
           $(".col-md-9").empty().append(data); 
            loadLastResult(3);
        }
    });
}

function loadLastResult(limit){
    $.get("/loadLastResultHist/"+limit+"/"+$(".resultSet").find(":selected").attr("data-setid"),function(data,status){
        if(status){
            $(".resultFormCont").empty().append(data); 
        }
    });
}

function resultReload(){
    $.get("/loadLastResultHist/"+$(".resultFilter").find(":selected").attr("data-interval")+"/"+$(".resultSet").find(":selected").attr("data-setid"),function(data,status){
        if(status){
            $(".resultFormCont").empty().append(data); 
        }
    });
}