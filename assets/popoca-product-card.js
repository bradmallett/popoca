// @ts-nocheck 

    document.addEventListener('change', (e) => {
        const selectedVariantBtn = e.target.closest('[data-variant-radio]');
        const selectedProductCard = e.target.closest('[data-popular-product-card]');

        if (!selectedVariantBtn || !selectedProductCard) return;
        
        const featuredImage = selectedProductCard.querySelector('[data-featured-image]');
        const secondaryImageEl = selectedProductCard.querySelector('[data-secondary-image-el]');
        const priceEl = selectedProductCard.querySelector('[data-price-el]');
        const onSaleEl = selectedProductCard.querySelector('[data-on-sale]');
        const productLinkEl = selectedProductCard.querySelectorAll('[data-product-link]');
        const addToCartEl = selectedProductCard.querySelector('[data-add-variant-to-cart]');

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

        if (onSaleEl) onSaleEl.classList.toggle('hidden', !variantIsOnSale);



        addToCartEl.value = selectedVariantBtn.dataset.variantId;
        
    })