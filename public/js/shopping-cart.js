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
    if (localStorageCart == undefined) return true;


    var productsHtml    = productsDom(localStorageCart);
    var priceHtml       = priceDom(localStorageCart);

    $('#shopping-items').html(productsHtml + priceHtml);

}
function productsDom(localStorageCart){
    var ProductsLayout = '<% _.each(products, function(product) { %>' +
                                '<li id= <%= product.id %> >' +
                                    '<div class="shopping-cart-item">' +
                                         '<%= product.quantity %> <%= product.name %>  - <%= product.price * product.quantity %>' +
                                    '</div>' +
                                '</li>' +
                           '<% });%>';


    return _.template(ProductsLayout,{products : localStorageCart[ShoppingCart.models.products]});
}

function priceDom(localStorageCart){
    var totalPriceHtml;

    //TODO better performance with adding to total price and not recalcing every time
    totalPriceHtml = calcTotalPrice(localStorageCart);
    return totalPriceHtml;
}

function calcTotalPrice(localStorageCart){
    var products    = localStorageCart[ShoppingCart.models.products];
    var totalPrice  = 0;
    _.each(products, function(product) {
        totalPrice += (product.price || 0) * product.quantity;
    });

    if (totalPrice == 0){
        return '';
    }else{
        return '<div id="shopping-cart-price"> Total Price '+ totalPrice +'$</div>'
    }
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
        var productToSave = $.extend(productToAdd, {quantity: 1});
        products[productToAdd.id] = productToSave;
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