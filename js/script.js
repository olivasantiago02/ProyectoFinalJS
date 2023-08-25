$(document).ready(function() {
    let cartCount = 0;
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    $(".add-to-cart").click(function() {
        const product = $(this).closest(".product");
        const productName = product.find("h2").text();
        const productPrice = parseFloat(product.find(".price").text().replace("$", ""));

        addToCart(productName, productPrice);
        updateCartCount();
        updateCartProducts();
    });

    $("#cart").mouseenter(function() {
        showCartTooltip();
    });

    $("#cart").mouseleave(function() {
        hideCartTooltip();
    });

    function updateCartCount() {
        $("#cart-count").text(cartCount);
        $("#clear-cart").click(function() {
            cartItems.length = 0; // Vacía el arreglo de productos del carrito
            updateCartCount(); // Actualiza el contador
            updateCartTooltip(); // Actualiza el tooltip
            saveCartToLocalStorage(); // Guarda el carrito vacío en el almacenamiento local
        $("#clear-cart").click(function() {
                cartItems.length = 0; // Vacía el arreglo de productos del carrito
                updateCartCount(); // Actualiza el contador
                updateCartTooltip(); // Actualiza el tooltip
                saveCartToLocalStorage(); // Guarda el carrito vacío en el almacenamiento local
            });
        });
    }


    function addToCart(productName, productPrice) {
        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }
        saveCartToLocalStorage();
    }

    function saveCartToLocalStorage() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function showCartTooltip() {
        const tooltip = $("<div id='cart-tooltip'></div>");

        cartItems.forEach(product => {
            const tooltipItem = $("<div class='tooltip-item'></div>");
            tooltipItem.text(`${product.quantity}x ${product.name} - $${product.price.toFixed(2)}`);
            tooltip.append(tooltipItem);
        });

        const tooltipContainer = $("#cart-tooltip-container");
        tooltipContainer.empty().append(tooltip);
        tooltipContainer.css("display", "block");
    }

    function hideCartTooltip() {
        $("#cart-tooltip-container").css("display", "none");
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
});