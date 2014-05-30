$(document).ready(function() {
    //GLOBAL METHODS
    log = function(string){
        console.log(string)
    };

    initPage = function(){
        initShoppingListAutoComplete(document.pageScope.services.api);
    };


    initShoppingListAutoComplete = function(api_service){
        $.ajax({
            type: 'GET',
            dataType: "jsonp",
            url: api_service.url + "sanger/v1/products?type=all&callbackMethod=initShoppingList",
            success: function (responseData, textStatus, jqXHR) {
            },
            error: function (responseData, textStatus, errorThrown) {
            }
        });

    };

    initShoppingList = function(data){
        var map = {};

        $('#shopping-input').typeahead({
            source: function (query, process) {
                var products = [];
                $.each(data, function (index, product) {
                    map[product.name] = product;
                    products.push(product.name);
                });

                process(products);
            },
            updater: function (product) {
                var selectedId = map[product].id;
                log('injecting id ' + selectedId + ' to DOM');
                return product;
            }

        });
        log('done auto with data ' + data);
    };

    $.ajax({
        url: "/app_vars"
    }).done(function(data) {
        document.pageScope = data
        initPage();
    });


});
