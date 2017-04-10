"use strict";

function replaceCitation(msg, error) {
    var $citationOutput, $citationMsg;

    $citationOutput = $('#citationOutput');
    $citationMsg = $citationOutput.children(".panel-body");

    if (error) {
        $citationMsg.addClass("error");
    }
    else {
        $citationMsg.removeClass("error");
    }

    if (!$citationOutput.is(':visible')) {
        $citationMsg.html(msg);
        $citationOutput.slideDown();
    }
    else {
        $citationMsg.fadeOut(200);
        $citationMsg.html(msg);
        $citationMsg.fadeIn(200);
    }
}

function getCitation(window) {
    var data, url;

    url = 'https://boiling-lake-36327.herokuapp.com/v01/citation/';
    console.log(url);

    data = {
        style: $('#citationFormat').val(),
        url: $('#citationUrl').val()
    }

    $.post(url, data)
        .done(function (returnData) {
            console.log(returnData);
            replaceCitation(returnData.citation);
        })
        .fail(function (jqxhr, status, err) {
            console.error("Error (HTTP status code )" + status + "): " + err);
            replaceCitation("Unable to generate citation. Please check your citation URL and try again.", true);
        });
}

$('#citeBtn').click(function (evt) {
    getCitation();
});
