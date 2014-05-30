$(document).ready(function() {
//    var appVariables = 1;
//    $.ajax({
//        url: "test.html",
//        context: document.body
//    }).done(function() {
//        $( this ).addClass( "done" );
//    });

    $('#shopping-input').typeahead({
        source: ['baby', 'baybush', 'soso']
    });
});
