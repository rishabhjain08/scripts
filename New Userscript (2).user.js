// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://taxprep.sprintax.com/ots/1099b-forms-2021.html?f=1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sprintax.com
// @grant        none
// @require
// ==/UserScript==

(function() {
    'use strict';

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }

    function format_curr(val) {
       return val.replaceAll('"', '').replaceAll(',', '');
   }

    var num = parseInt(getUrlVars()['f']) - 1;
    var csv = `1 ISHARES INC     CORE MSCI EMKT,09/13/2011,07/23/2012,5.98,6.14,W,0.22,-0.16,Short-term
8 VANGUARD WORLD FDS    ENERGY E TF,01/12/2010,04/11/2011,94.46,51.58,,0.00,42.88,Long-term`;

    $('#__employer_details_employer_name').val('Wealthfront Brokerage LLC');
    $('#__employer_details_employer_address').val('261 Hamilton Ave');
    $('#__employer_details_employer_city').val('Palo Alto');
    $('#__employer_details_employer_state').val('CA');
    $('#__employer_details_employer_zip_code').val('94301');
    $('#payers_federal_id').val('27-1967207');
    $('#statecode').val('NY');
    $('#state_income_tax').val('0');
    $('#sim_reported_irs1').find('a[name=\'sim_reported_irs\']').attr('id', 'no');
    $('#sim_reported_irs2').find('a[name=\'sim_reported_irs\']').attr('id', 'yes');
    $('#r_995_1_gain_or_lost').attr('class', 'form-fields form-fields-1');
    $('#federal_income_tax').val('0');
    $('#local_name2').val('new_york_city');

    var lines = CSVToArray(csv);
    for (let i = num; i < lines.length; i++) {
        var bits = lines[i];
        $('#description').val(bits[0]);
        $('#date_of_acquistion').val(bits[1]);
        $('#date_of_sale').val(bits[2]);
        $('#stocks_bonds').val(format_curr(bits[3]));
        $('#costs_other_basic').val(format_curr(bits[4]));
        if(bits[5] == 'W') {
            $('#wash_sale_loss').val(format_curr(bits[6]));
        } else {
            $('#wash_sale_loss').val('0');
        }
        if(bits[8]=='Short-term') {
            $('#sim_gain_or_lost1').find('a[name=\'sim_gain_or_lost\']').attr('id', 'yes');
            $('#gain_or_lost1').attr('checked', 'checked');
            $('#sim_gain_or_lost2').find('a[name=\'sim_gain_or_lost\']').attr('id', 'no');
            $('#sim_gain_or_lost3').find('a[name=\'sim_gain_or_lost\']').attr('id', 'no');
        } else {
            $('#sim_gain_or_lost1').find('a[name=\'sim_gain_or_lost\']').attr('id', 'no');
            $('#sim_gain_or_lost2').find('a[name=\'sim_gain_or_lost\']').attr('id', 'yes');
            $('#gain_or_lost2').attr('checked', 'checked');
            $('#sim_gain_or_lost3').find('a[name=\'sim_gain_or_lost\']').attr('id', 'no');
        }
        break;
    }


















    // Your code here...
})();