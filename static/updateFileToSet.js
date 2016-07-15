var docType=['doc','docx', 'csv', 'xlsx', 'xlt', 'xls'];
function updateFilesToSet(setId){
    for(i=0;i<document.getElementById("fileUploadSet").files.length;i++){
        var fileName = document.getElementById("fileUploadSet").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadSet").files[i];
        var reader = new FileReader();
        if(isSuccess || isDoc)
            reader.readAsDataURL(file);
        if(!isDoc && !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[setId,document.getElementById("fileUploadSet").files[i].name]
        reader.onload = shipOffSet.bind(null,data);
    }
}

function shipOffSet(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_test/"+data[0]+"/set",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".setFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}

function deleteFileSet(id){
    $.get("/deleteFiles/"+id+"/set",function(data,status){
        if(status){
            $("[data-fileid="+id+"]").remove();
        }
    });
}

function fileUpdateOnSet(setId){
    for(i=0;i<document.getElementById("fileUploadObject").files.length;i++){
        var fileName = document.getElementById("fileUploadObject").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        var isDoc = docType.indexOf(extension) > -1;
        var file = document.getElementById("fileUploadObject").files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsDataURL(file);
        if(isDoc || !isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[setId,document.getElementById("fileUploadObject").files[i].name]
        reader.onload = shipOffSetUpdate.bind(null,data);
    }
}

function shipOffSetUpdate(data,event){
    var result=event.target.result;
    var fileName = data[1];
    $.post("/upload_file_update/"+data[0]+"/set",{ name: fileName, context: result },function(datas,status){
        if(fileTypes.indexOf(data[1].split('.').pop().toLowerCase()) >-1 ||  docType.indexOf(data[1].split('.').pop().toLowerCase()) > -1){
            $(".imgFiles").append(datas);
        }
        else{
            $(".setFiles").append(datas);
        }
    }).fail(function() {
    alert( "error" );
  });
}