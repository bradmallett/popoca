// listening for a click
document.addEventListener('click', async (e) => {
    clickedCartButton(e);
    closeCartDrawer(e);
    await updateQuantity(e);
    await deleteItemFromCart(e);
});

function clickedCartButton(e) {
    const cartButtonEl = e.target.closest('[data-popoca-cart-toggle]');
    if(!cartButtonEl) return;
    openCartDrawer();
}


function closeCartDrawer(e) {
    const clickedInsideCart = e.target.closest('[data-popoca-cart-drawer]');
    const clickedCloseCartBtn = e.target.closest('[data-close-cart-drawer]');
    const cartButtonEl = e.target.closest('[data-popoca-cart-toggle]');

    if(cartButtonEl || clickedInsideCart && !clickedCloseCartBtn) return;

    const drawer = getDrawer();
    if (!drawer) return;

    if(drawer.classList.contains('popoca-cart-closed')) return;

    // close if clicked the close button
    if(clickedCloseCartBtn) {
        drawer.classList.remove('popoca-cart-open');
        drawer.classList.add('popoca-cart-closed');
    }

    // close if clicked outside the cart
    if(!clickedInsideCart && drawer?.classList.contains('popoca-cart-open')) {
        drawer.classList.remove('popoca-cart-open');
        drawer.classList.add('popoca-cart-closed');
    }
}



// add item to cart and update dom with new item
document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let formData = new FormData(form);

        // submit form with ajax
        const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            body: formData
        })

        if (!res.ok) {
            console.error("Add to cart failed", await res.text());
            return;
        }

        await fetchNewCart();
        openCartDrawer();
      
    })
});



async function deleteItemFromCart(e) {
    const cartItem = e.target.closest('[data-cart-item]');
    const deleteItem = e.target.closest('[data-delete-cart-item]');

    if(!cartItem || !deleteItem) return;

    const quantityEl = cartItem.querySelector('input');
    let quantity = 0;

    const formData = new FormData();
    formData.append('id', quantityEl.dataset.itemKey);
    formData.append('quantity', quantity);

    // submit quantity form with ajax
    const res = await fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        body: formData
    })

    if (!res.ok) {
        console.error("Unable to delete cart item...", await res.text());
        return;
    }

    await fetchNewCart();
    openCartDrawer();
}



async function updateQuantity(e) {
    const cartItem = e.target.closest('[data-cart-item]');
    const cartItemBtn = e.target.closest('[data-quantity-btn]');

    if(!cartItem || !cartItemBtn) return;

    const quantityEl = cartItem.querySelector('input');
    let quantity = parseInt(quantityEl.value, 10);

    if(cartItemBtn.dataset.cartItemDecrement) {
        // clamp the quantity to no negative values
        quantity = Math.max(0, quantity - 1);
    }

    if(cartItemBtn.dataset.cartItemIncrement) {
        quantity += 1;
    }

    const formData = new FormData();
    formData.append('id', quantityEl.dataset.itemKey);
    formData.append('quantity', quantity);

    // submit quantity form with ajax
    const res = await fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        body: formData
    })

    if (!res.ok) {
        console.error("Add to cart failed", await res.text());
        return;
    }

    await fetchNewCart();
    openCartDrawer();
}


function openCartDrawer() {
    const cartDrawer = getDrawer();
    if(!cartDrawer) return;

    // telling the dom to read/notice the new element so it's able to transition in css
    void cartDrawer.offsetWidth;

    cartDrawer.classList.remove('popoca-cart-closed');
    cartDrawer.classList.add('popoca-cart-open');
}



function getDrawer() {
    return document.querySelector('[data-popoca-cart-drawer]');
}



async function fetchNewCart() {
    try {
        const res = await fetch(
        window.Shopify.routes.root +
            "?section_id=popoca-cart-drawer&sections_url=/cart"
        );

        if(!res.ok) {
            throw new Error(`Cart fetch failed with status ${res.status}`);
        }

        const newSectionHTML = await res.text();
        const html = document.createElement("div");
        html.innerHTML = newSectionHTML;

        // Replace existing drawer DOM
        const newDrawer = html.querySelector("#shopify-section-popoca-cart-drawer");
        const currentDrawer = document.querySelector("#shopify-section-popoca-cart-drawer");

        if (newDrawer && currentDrawer) {
            currentDrawer.replaceWith(newDrawer);
            
            // AFTER the replace, update the cart button badge
            const cartCountEl = document.querySelector('[data-popoca-cart-count]');
            const drawerSection = newDrawer.querySelector("[data-popoca-cart-drawer]");
            if (cartCountEl && drawerSection) {
                const count = Number(drawerSection.dataset.cartCount || 0);
                cartCountEl.textContent = count.toString();
            }
        }
    }
    catch(error) {
        console.error("Error updating cart:", error);
        showCartErrorMessage();
    }
}


function showCartErrorMessage() {
    alert("Something went wrong updating your cart. Please try again.");
}