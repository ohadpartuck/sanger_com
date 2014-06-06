$(document).ready(function() {

    initPage = function(){
        initShoppingListAutoComplete(document.pageScope.services.api);
    };

    initShoppingListAutoComplete = function(api_service){
        var apiServiceAllProductsUrl = api_service.url + "sanger/v1/products?type=all&callbackMethod=initShoppingList";
        $.ajax({
            type: 'GET',
            dataType: "jsonp",
            url: apiServiceAllProductsUrl,
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
                ShoppingCart.add(map[product]);
            }

        });
    };

    initPageScope();
});

function initPageScope(){
    $.ajax({
        url: "/app_vars"
    }).done(function(data) {
        document.pageScope = data;
        initPage();
    });
}