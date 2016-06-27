objectForm="<h1>Object</h1><div style='width:100%'><table style='width:100%'>";
objectForm+="<tr><td class='object_static_name'>Name:</td><td class='object_static_input'><input type='text' name='name' value='Name' class='object_input form-control' readonly></td></tr>";
objectForm+="<tr><td class='object_static_date'>Date</td><td class='object_static_input'><input type='date' name='date' class='object_input form-control' readonly></td></tr>";
objectForm+="<tr><td class='object_static_hardware'>Hardware:</td><td class='object_static_input'><input type='text' name='hardware' value='Hardware Description' class='object_input form-control' readonly></td></tr>";
objectForm+="<tr><td class='object_static_desc'>Description:</td><td class='object_static_input'><input type='text' name='desc' value='Long Description' class='object_input form-control' readonly></td></tr>";
objectForm+="<tr><td class='object_static_desc'>Version:</td><td class='object_static_input'><input type='text' name='version' value='Version Number' class='object_input form-control' readonly></td></tr>";
objectForm+="</table></div>";

objectEditableForm="<h1>Object</h1><div style='width:100%'><table style='width:100%'>";
objectEditableForm+="<tr><td class='object_static_name'>Name:</td><td class='object_static_input'><input type='text' name='name' value='Name' class='object_input form-control'></td></tr>";
objectEditableForm+="<tr><td class='object_static_date'>Date</td><td class='object_static_input'><input type='date' name='date' class='object_input form-control' readonly></td></tr>";
objectEditableForm+="<tr><td class='object_static_hardware'>Hardware:</td><td class='object_static_input'><input type='text' name='hardware' value='Hardware Description' class='object_input form-control'></td></tr>";
objectEditableForm+="<tr><td class='object_static_desc'>Description:</td><td class='object_static_input'><input type='text' name='desc' value='Long Description' class='object_input form-control'></td></tr>";
objectEditableForm+="<tr><td class='object_static_desc'>Version:</td><td class='object_static_input'><input type='text' name='version' value='Version Number' class='object_input form-control'></td></tr>";
objectEditableForm+="</table></div>";

objectBtn="<table><tr><td class='newObject' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='newObject'>New</a></td>";
objectBtn+="<td class='saveObject' style='width:53px'><a class='btn btn-default btn-sm disabled' href='#' role='button' id='saveObject'>Save</a></td>";
objectBtn+="<td class='cancelObject' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='cancelObject'>Cancel</a></td><td style='width:50px'></td>"
objectBtn+="<td style='width: 20px'></td><td class='deleteObject'><td></tr></table><hr>"

newObjectDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='newObject'>New</a>"
saveObjectEn="<a class='btn btn-default btn-sm' href='#' role='button' id='saveObject'>Save</a>"