caseBtn=`
    <div style='float:left;margin-top:5px;width:80%;'>
        <h3 style='margin-bottom:0px;margin-top:0px;'>Cases: </h3>
    </div>
    <div style='float:right;margin-top:5px;width:20%;'>
        <table>
            <tr>
                <td class='newCase' style='width:50px'>
                    <a class='btn btn-default btn-sm' href='#' role='button' id='newCase'>New</a>
                </td>
                <td class='saveCase' id='saveCase' style='width:53px'>
                    <a class='btn btn-default btn-sm disabled' id='saveCase' href='#' role='button'>Save</a>
                </td>
                <td class='cancelCase' style='width:50px'>
                    <a class='btn btn-default btn-sm' href='#' role='button' id='cancelCase'>Cancel</a>
                </td>
                <td style='width:50px'>
                </td>
                <td style='width: 20px'></td><td class='deleteCase'>
                <td>
            </tr>
        </table>
        <hr style='margin-bottom:5px;margin-top:5px;'>
    </div>`

newCaseDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='newCase'>New</a>"
saveCaseEn1="<a class='editablecase btn btn-default btn-sm' id='saveCase' data-dbid='";
saveCaseEn2="' href='#' role='button'>Save</a>";
