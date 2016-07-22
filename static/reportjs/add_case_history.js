function caseHistPage(){
    $("#nav-col-md-9").empty().append(testNavbar);
    loadResultForm();
}

function loadResultForm(){
    $.get("/loadResultForm",function(data,status){
        if(status){
           $("#nav-test-col-md-9").empty().append(data); 
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