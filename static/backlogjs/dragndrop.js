//$(".incCases a").map(function(index,node){return node.dataset.dbid;})
var afterInsertNode;
var cases;
function dragHover(ev){
	if(ev.currentTarget.parentNode.ondrop != undefined){
		afterInsertNode = ev.currentTarget;
	}
}

function allowDrop(ev) {
    ev.preventDefault();
}

var draggedElement;

function drag(ev) {
	draggedElement=ev.currentTarget;
}

function drop(ev) {
    ev.preventDefault();
	//var tmp=document.createElement("div");
	//tmp.appendChild(draggedElement.cloneNode(true))
	if( draggedElement.parentNode.ondrop == undefined ){
		if(draggedElement.childNodes[1].className == "set"){
			$.get("/load_set/"+draggedElement.childNodes[1].dataset.dbid+"/"+"exeCasesBySet",
				function(data,status){
					if(status){
						draggedElement=draggedElement.cloneNode(true);
						//draggedElement.innerHTML=data;
						//ev.target.appendChild(draggedElement)
                        ev.target.innerHTML+=data;
					};
				}
			);
			//cases = loadSet(draggedElement.childNodes[1].dataset.dbid,"exeCasesBySet");
		}
		else{
			//draggedElement=draggedElement.cloneNode(true);
			//draggedElement.innerHTML="<div><h1>JEEEEEEEEEEEEEEEE</h1></div>"
			ev.target.appendChild(draggedElement.cloneNode(true));
		}
	}
	else{
		ev.currentTarget.insertBefore(draggedElement, afterInsertNode.nextSibling);
	}
	$(".incCases a").map(function(index,node){
		var array=[]
		array=array+node.className
		array=array+node.dataset.dbid
		return array;
		}
		).toArray()
}

function dropRemove(ev){
    if ($(ev.target).parents('.incCases').andSelf('.incCases').length == 0){
        var child;
        var iterator;
        for (i =0; i< 
 $(".incCases").children().length;i++){
            if("case"+draggedElement.childNodes[1].dataset.dbid.toString() == $(".incCases").children()[i].dataset.dbid.toString()){
                child=$(".incCases").children()[i].children[0];
                iterator=i;
            }
        }
        $(".incCases").children()[iterator].removeChild(child);
        console.log('Remove IT');
        return;
    } /*else {
        //console.log('Skip it');
    }*/
}