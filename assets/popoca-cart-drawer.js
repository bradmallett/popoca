
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
    })
})

// update quanity for cart item
document.querySelectorAll('[data-cart-item-decrement], [data-cart-item-increment]').forEach((button) => {
    button.addEventListener('click', async()=> {

        let quantity = parseInt(button.dataset.itemCurrentQuantity, 10);

        if(!button.dataset.cartItemDecrement && !button.dataset.cartItemIncrement) return;

        if(button.dataset.cartItemDecrement) {
            quantity -= 1;
        }

        if(button.dataset.cartItemIncrement) {
            quantity += 1;
        }

        // submit form with ajax
        const res = await fetch(window.Shopify.routes.root + 'cart/change.js', {
            method: 'POST',
            body: {              
                'id': button.dataset.itemKey,
                'quantity': quantity
            }
            
        })

        if (!res.ok) {
            console.error("Add to cart failed", await res.text());
            return;
        }
        
    })
})