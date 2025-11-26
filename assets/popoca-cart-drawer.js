
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
    })
})


//update quantity for cart item
document.addEventListener('click', async (e) => {
    const cartItem = e.target.closest('[data-cart-item]');
    const cartItemBtn = e.target.closest('[data-quantity-btn]');

    if(!cartItem || !cartItemBtn) return;

    const quantityEl = cartItem.querySelector('input');
    let quantity = parseInt(quantityEl.value, 10);

    if(cartItemBtn.dataset.cartItemDecrement) {
        quantity -= 1;
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
});










//delete item from cart
document.addEventListener('click', async (e) => {
    const cartItem = e.target.closest('[data-cart-item]');
    const deleteItem = e.target.closest('[data-delete-cart-item]');

    if(!cartItem || !cartItemBtn) return;

    const quantityEl = cartItem.querySelector('input');
    let quantity = parseInt(quantityEl.value, 10);

    if(cartItemBtn.dataset.cartItemDecrement) {
        quantity -= 1;
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
});








async function fetchNewCart() {
    // fetch new cart section with added item and create the html
    const newCartSection = await fetch(
    window.Shopify.routes.root +
        "?section_id=popoca-cart-drawer&sections_url=/cart"
    );

    const newSectionHTML = await newCartSection.text();
    const html = document.createElement("div");
    html.innerHTML = newSectionHTML;


    // Replace existing drawer DOM
    const newDrawer = html.querySelector("#shopify-section-popoca-cart-drawer");
    const currentDrawer = document.querySelector("#shopify-section-popoca-cart-drawer");

    if (newDrawer && currentDrawer) {
    currentDrawer.replaceWith(newDrawer);
    }
}