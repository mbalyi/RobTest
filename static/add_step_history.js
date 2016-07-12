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
    loadLastResStep(3);
}

function loadResStepForm(){
    $.get("/loadResStepForm",function(data,status){
        if(status){
           $(".col-md-9").empty().append(data); 
        }
    });
}

function loadLastResStep(limit){
    $.get("/loadLastResStepHist/"+limit,function(data,status){
        if(status){
            $(".resultFormCont").empty().append(data); 
        }
    });
}