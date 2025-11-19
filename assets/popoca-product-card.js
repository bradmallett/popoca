// @ts-nocheck 

    document.addEventListener('change', (e) => {
        const selectedProductCard = e.target.closest('[data-popular-product-card]');
        const selectedVariantBtn = e.target.closest('[data-variant-radio]');

        if(!selectedProductCard || !selectedVariantBtn) return;

        const featuredImage = selectedProductCard.querySelector('[data-featured-image]');
        const secondaryImageEl = selectedProductCard.querySelector('[data-secondary-image-el]');
        const priceEl = selectedProductCard.querySelector('[data-price-el]');
        const onSaleEl = selectedProductCard.querySelector('[data-on-sale]');
        const productLinkEl = selectedProductCard.querySelectorAll('[data-product-link]');
        const addToCartEl = selectedProductCard.querySelector('[data-add-variant-to-cart]');
        const percentOffEl = selectedProductCard.querySelector('[data-percent-off]');
        const lowStockEl = selectedProductCard.querySelector('[data-low-stock]');

        // update image to selected variant img
        featuredImage.src = selectedVariantBtn.dataset.image;
        featuredImage.srcset = '';

        // update secondary image to selected variant img
        secondaryImageEl.src = selectedVariantBtn.dataset.secondaryImage;
        secondaryImageEl.srcset = '';

        // update price to selected variant price
        priceEl.textContent = selectedVariantBtn.dataset.priceMoney;

        // update variant urls
        productLinkEl.forEach(el => {
            el.href = selectedVariantBtn.dataset.variantUrl;
        })
        

        // toggle sale badge
        const variantPrice = parseInt(selectedVariantBtn.dataset.priceCents || '0', 10);
        const variantComparePrice = parseInt(selectedVariantBtn.dataset.compareCents || '0', 10);
        const variantIsOnSale = variantComparePrice && variantComparePrice > variantPrice;

        if (onSaleEl) {
            const percentageOff = 100 - Math.round((variantPrice / variantComparePrice) * 100);
            percentOffEl.textContent = percentageOff + '% OFF';
            onSaleEl.classList.toggle('hidden', !variantIsOnSale);
        }

        // toggle low stock badge
        const inventory = parseInt(selectedVariantBtn.dataset.variantInventory || '0', 10);
        const inventoryIsLow = inventory <= 5;
        lowStockEl.classList.toggle('hidden', !inventoryIsLow)

        addToCartEl.value = selectedVariantBtn.dataset.variantId;
    });


    document.addEventListener('click', (e) => {
        const selectedProductCard = e.target.closest('[data-popular-product-card]');

        if(!selectedProductCard) return;

        const quantityEl = selectedProductCard.querySelector('[data-quantity]');
        const incrementBtn = e.target.closest('[data-increment]');
        const decrementBtn = e.target.closest('[data-decrement]');

        if (!incrementBtn && !decrementBtn) return;

        let quantity = parseInt(quantityEl.value, 10);

        if(decrementBtn) {
            if(quantity <= 1) {
                quantity = 1;
            }
            else {
                quantity -= 1;
            }
        }

        if(incrementBtn) quantity += 1;

        quantityEl.value = quantity.toString();
    })



   