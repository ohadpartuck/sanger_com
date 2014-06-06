/**
 *
 *  Shopping Cart
 *
 */

(function($) {
    var ShoppingCart = {

        models: {
            cartInfo: {},
            products: {}
        },

        init: function() {
            log('initing cart. todo get cart items from local storage/server');
            this.bindRemoveItem();
        },

        add: function(product){
            log('adding to cart');
            log(product);
            addItemToCart(product);
        },

        bindRemoveItem: function(){
            $('#shopping-list li').on('click', function() {
                alert($(this).text());
            });
        }
    };

    window.ShoppingCart = ShoppingCart;

    $(document).ready(function() {

        ShoppingCart.init();

    });

})(jQuery);


function addItemToCart(dataJson){
    var layout =
        '<li class="shopping-cart-item"><%= product.name %></li>';

    $('#shopping-items').append(_.template(layout,{product : dataJson}));

    ShoppingCart.bindRemoveItem();
}