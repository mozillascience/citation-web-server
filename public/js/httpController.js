"use strict";

function replaceCitation(msg, error) {
    var $citationOutput, $citationMsg;

    $citationOutput = $('#citationOutput');
    $citationMsg = $citationOutput.child(".panel-body");

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

function getCitation() {
    var data, url;

    url = "localhost:3000" + '/v01/citation/';

    data = {
        style: $('#citationFormat').val();
        url:$('#citationUrl').val();
    }

    $.post(url, data, 'json')
        .done(function (returnData) {
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
