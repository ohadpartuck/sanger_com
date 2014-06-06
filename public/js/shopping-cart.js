/**
 *
 *  Shopping Cart
 *
 */

(function($) {
    var ShoppingCart = {

        name: 'shoppingCart',

        models: {
            cartInfo: {},
            products: {}
        },

        init: function() {
            log('initializing cart');
            var localStorageCart = JSON.parse(localStorage.getItem(ShoppingCart.name));
            RenderCartDom(localStorageCart);
            this.bindRemoveItem();
        },

        add: function(product){
            log('adding to cart');
            log(product);
            addItemToCart(product);
        },

        remove: function(product_id){
            RemoveItemFromCart(product_id);
        },

        bindRemoveItem: function(){
            var ShoppingCart = this;
            $('#shopping-list').on('click', 'li', function(){
                ShoppingCart.remove($(this).attr('id'));
                $(this).remove();
            });
        }
    };

    window.ShoppingCart = ShoppingCart;

    $(document).ready(function() {

        ShoppingCart.init();

    });

})(jQuery);


function addItemToCart(product){
    var localStorageCart = addElementToLocalStorage(product);
    log(localStorage.getItem(ShoppingCart.name));

    RenderCartDom(localStorageCart);
}

function RenderCartDom(localStorageCart){
    if (localStorageCart == undefined){
        return true
    }
    var shoppingCartLayout = '<% _.each(products, function(product) { %>' +
                                '<li class="shopping-cart-item" id= <%= product.id %> >' +
                                    '<%= product.name %> x <%= product.quantity%></li>' +
                             '<% });%>';

    $('#shopping-items').html(_.template(shoppingCartLayout,{products : localStorageCart[ShoppingCart.models.products]}));
    //TODO - find a better way to bind events
//    ShoppingCart.bindRemoveItem();
}

function addElementToLocalStorage(product){
    var localStorageCart    = getCartFromLocalStorage();

    localStorageCart        = smartAddToProducts(localStorageCart, product);
    setCartInLocalStorage(localStorageCart);
    return localStorageCart;
}

function smartAddToProducts(cartObject, productToAdd){
    var products            = cartObject[ShoppingCart.models.products] || {};

    cartObject[ShoppingCart.models.products] = addOrSetItemToCart(products, productToAdd);

    return cartObject;
}

function getCartFromLocalStorage(){
    return JSON.parse(localStorage.getItem(ShoppingCart.name)) || {};
}

function addOrSetItemToCart(products, productToAdd){
    if (doesNotHaveKey(products, productToAdd.id)){
        products[productToAdd.id] = {id: productToAdd.id, name: productToAdd.name, quantity: 1};
    }else{
        products[productToAdd.id]['quantity'] += 1;
    }
    return products;
}

function setCartInLocalStorage(cart){
    localStorage.setItem(ShoppingCart.name, JSON.stringify(cart));
}

function RemoveItemFromCart(productId){
    var localStorageCart    = getCartFromLocalStorage();

    delete localStorageCart[ShoppingCart.models.products][productId];

    setCartInLocalStorage(localStorageCart);
}