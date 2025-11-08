// @ts-nocheck 

    document.addEventListener('click', (e) => {
        const selectedVariantBtn = e.target.closest('[data-id]');
        const selectedProductCard = e.target.closest('[data-popular-product-card]');

        if (!selectedVariantBtn || !selectedProductCard) return;
        
        const featuredImage = selectedProductCard.querySelector('[data-featured-image]');
        const priceEl = selectedProductCard.querySelector('[data-price-el]');
        const onSaleEl = selectedProductCard.querySelector('[data-on-sale]');

        // update image to selected variant img
        featuredImage.src = selectedVariantBtn.dataset.image;
        featuredImage.srcset = ''; 

        // update price to selected variant price
        priceEl.textContent = selectedVariantBtn.dataset.priceMoney;

        // toggle sale badge
        const variantPrice = parseInt(selectedVariantBtn.dataset.priceCents || '0', 10);
        const variantComparePrice = parseInt(selectedVariantBtn.dataset.comparePriceCents || '0', 10);
        const variantIsOnSale = variantComparePrice && variantComparePrice > variantPrice;

        if (onSaleEl) onSaleEl.classList.toggle('hidden', !variantIsOnSale);


    })