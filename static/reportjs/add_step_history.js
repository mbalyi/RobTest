function stepHistPage(){
    $("#nav-col-md-9").empty().append(testNavbar);
    loadResStepForm();
}

function loadResStepForm(){
    $.get("/loadResStepForm",function(data,status){
        if(status){
           $("#nav-test-col-md-9").empty().append(data); 
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