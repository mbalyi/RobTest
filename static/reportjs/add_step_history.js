function stepHistPage(){
    document.getElementById("col-md-9").style.width = '100%';
    $(".col-md-9").empty();
    $("#mainHeader").css('margin-bottom','5px');
    $(".setup_buttons").hide();
    $(".col-md-12-set").empty();
    $(".col-md-12-case").empty();
    $(".col-md-12-execution").empty();
    $(".col-md-12-object").empty();
    $(".setup").hide();
    loadResStepForm();
}

function loadResStepForm(){
    $.get("/loadResStepForm",function(data,status){
        if(status){
           $(".col-md-9").empty().append(data);
            loadLastResStep(3);
        }
    });
}

function loadLastResStep(limit){
    $.get("/loadLastResStepHist/"+limit+"/"+$(".resultSet").find(":selected").attr("data-setid"),function(data,status){
        if(status){
            $(".resultFormCont").empty().append(data); 
        }
    });
}

function resultStepReload(){
    $.get("/loadLastResStepHist/"+$(".resultFilter").find(":selected").attr("data-interval")+"/"+$(".resultSet").find(":selected").attr("data-setid"),function(data,status){
        if(status){
            $(".resultFormCont").empty().append(data); 
        }
    });
}