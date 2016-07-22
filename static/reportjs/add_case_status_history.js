function caseStatusHistory(){
    $("#nav-col-md-9").empty().append(testNavbar);
    caseHistForm("first");
}

function caseHistForm(loadingStatus){
    $.get("/CaseHistForm",function(data,status){
        if(status){
            $("#nav-test-col-md-9").empty().append(data);
            if(loadingStatus == "first")
                caseHistLoad(loadingStatus);
        }
    });
}

function caseHistLoad(loadingStatus,setId){
    if(loadingStatus == "first")
        id=$("select[data-selectorid='setnames']").find(":selected").attr("data-dbid");
    else
        id=setId;
    $.get("/historyCase/"+id,function(data,status){
        if(status){
            $(".diagramField").empty().append(data);
        }
    });
}

var active=0;
function toggleHistLegends(){
    $(".basiclegends").slideToggle();
    $(".speciallegends").slideToggle();
    if(active==1){
        document.getElementById("historyMainHeader").style.height='71px';
        active=0;
    }
    else{
        document.getElementById("historyMainHeader").style.height='160px';
        active++;
    }
}

function setHistReload(){
    id=$("select[data-selectorid='setnames']").find(":selected").attr("data-dbid");
    caseHistLoad("else",id);
}

var htmlHistory;
function openResult(caseId){
    htmlHistory=document.getElementById("diagramField").innerHTML;
    loadCaseHistory(caseId);
}

function loadCaseHistory(caseId){
    $.get("/loadCaseHistory/"+caseId, function(data,status){
       if(status){
           $(".diagramField").empty().append(data);
       } 
    });
}

function onMouseTooltip(event){
    $(event.target).tooltip('show');
}