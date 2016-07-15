var docType=['doc','docx', 'csv', 'xlsx', 'xlt', 'xls'];
function updateFilesToCase(caseId){
    for(i=0;i<document.getElementById("fileUploadCase").files.length;i++){
        var fileName = document.getElementById("fileUploadCase").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadCase").files[i];
        var reader = new FileReader();
        if(isSuccess || isDoc)
            reader.readAsDataURL(file);
        if(!isDoc && !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[caseId,document.getElementById("fileUploadCase").files[i].name]
        reader.onload = shipOffCase.bind(null,data);
    }
}

function shipOffCase(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_test/"+data[0]+"/case",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".caseFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}

function deleteFileCase(id){
    $.get("/deleteFiles/"+id+"/case",function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}

function fileUpdateOnCase(caseId){
    for(i=0;i<document.getElementById("fileUploadCase").files.length;i++){
        var fileName = document.getElementById("fileUploadCase").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadCase").files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsDataURL(file);
        if(isDoc || !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[caseId,document.getElementById("fileUploadCase").files[i].name]
        reader.onload = shipOffCaseUpdate.bind(null,data);
    }
}

function shipOffCaseUpdate(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_update/"+data[0]+"/case",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1 ||  docType.indexOf(data[1].split('.').pop().toLowerCase()) > -1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".caseFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}