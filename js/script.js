$(document).ready(function() {
    let cartCount = 0;
    const cartItems = [];

    $(".add-to-cart").click(function() {
        const product = $(this).closest(".product");
        const productName = product.find("h2").text();
        const productPrice = parseFloat(product.find(".price").text().replace("$", ""));

        addToCart(productName, productPrice);
        updateCartCount();
        updateCartProducts();
        saveCartToLocalStorage();
    });

    $("#clear-cart").click(function() {
        cartItems.length = 0;
        updateCartCount();
        updateCartProducts();
        updateCartTotal();
        saveCartToLocalStorage();
        hidePurchaseMessage();
    });

    $("#checkout-button").click(function() {
        showPurchaseMessage();
        clearCart();
        updateCartCount();
        updateCartProducts();
        updateCartTotal();
        saveCartToLocalStorage();
    });

     // Evento para eliminar un producto del carrito
     $(".remove-one").click(function() {
        const productIndex = $(this).parent().index();
        cartItems[productIndex].quantity--;

        if (cartItems[productIndex].quantity <= 0) {
            cartItems.splice(productIndex, 1);
        }

        updateCartCount();
        updateCartProducts();
        updateCartTotal();
        saveCartToLocalStorage();
    });


    $(".add-one").click(function() {
        const productIndex = $(this).parent().index();
        cartItems[productIndex].quantity++;

        updateCartCount();
        updateCartProducts();
        updateCartTotal();
        saveCartToLocalStorage();
    });

    // Función para mostrar el mensaje de compra exitosa
    function showPurchaseMessage() {
        $("#purchased-products").empty();
    
        let purchaseTotal = 0;
    
        cartItems.forEach(product => {
            const productTotal = product.price * product.quantity;
            purchaseTotal += productTotal;
    
            const productInfo = `${product.quantity}x ${product.name} - $${productTotal.toFixed(2)}`;
            $("#purchased-products").append(`<div>${productInfo}</div>`);
        });

        
    
        $("#purchased-products").append(`<div>Total: $${purchaseTotal.toFixed(2)}</div>`);
    
        $("#purchase-message").removeClass("hidden3");
        setTimeout(() => {
            $("#purchase-message").addClass("hidden3");
        }, 3000);
    }
    // Evento para realizar la compra
    $("#checkout-button").click(function() {
        const cartTotal = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);

        if (cartItems.length === 0) {
            alert("No hay productos seleccionados para comprar.");
        } else {
            showPurchaseMessage(cartTotal);
        }
    });


    // Función para ocultar el mensaje de compra exitosa
function hidePurchaseMessage() {
    $("#purchase-message").addClass("hidden");
}

    function updateCartCount() {
        cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        $("#cart-count").text(cartCount);
    }

    function addToCart(productName, productPrice) {
        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }
    }

    function saveCartToLocalStorage() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function updateCartProducts() {
        const cartProductsContainer = $("#cart-items");
        cartProductsContainer.empty();

        cartItems.forEach(product => {
            const cartProduct = $("<div class='cart-product'></div>");
            cartProduct.text(`${product.quantity}x ${product.name} - $${product.price.toFixed(2)}`);
            cartProductsContainer.append(cartProduct);
        });

        updateCartTotal();
    }

    function updateCartTotal() {
        const cartTotal = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
        $("#cart-total").text(`Total: $${cartTotal.toFixed(2)}`);
    }

    // Llamada inicial para cargar el total
    updateCartTotal();
    updateCartProducts();

    // Cargar el carrito desde el almacenamiento local al cargar la página
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push(...savedCartItems);
    updateCartCount();
    updateCartProducts();
});