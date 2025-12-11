// @ts-nocheck 

document.addEventListener('change', (e) => {
    const variantBtn = e.target.closest('[data-pdp-variant-radio]');
    if(!variantBtn) return;

    const variantPriceCents = parseInt(variantBtn.dataset.priceCents || '0', 10);
    const variantComparePriceCents = parseInt(variantBtn.dataset.compareCents || '0', 10);
    const variantIsOnSale = variantComparePriceCents > 0 && variantComparePriceCents > variantPriceCents;

    updateImages(variantBtn);
    updateVariantInfoFlag(variantBtn, variantPriceCents, variantComparePriceCents, variantIsOnSale);
    updateVariantPrice(variantBtn, variantIsOnSale);
    addVariantToCartForm(variantBtn);
});


document.querySelectorAll('[data-quantity-btn]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const quantityBtn = e.target;
        const quantityInputEl = document.querySelector('[data-quantity-input-pdp]');
        let quantity = parseInt(quantityInputEl.value, 10);

        if(quantityBtn.hasAttribute('data-decrement')) {
            if(quantity <= 1) {
                quantity = 1;
            }
            else {
                quantity -= 1;
            }
        }

        if(quantityBtn.hasAttribute('data-increment')) quantity += 1;

        quantityInputEl.value = quantity.toString();
    })
})




function addVariantToCartForm(btn) {
    const selectedVariantId = btn.dataset.variantId;
    const variantIdInput = document.querySelector('[data-variant-id-on-cart]');
    if ( !selectedVariantId || !variantIdInput ) return;
    
    variantIdInput.value = selectedVariantId;
}



function updateVariantPrice(btn, variantIsOnSale) {
    const priceEl = document.querySelector('[data-price]');
    const priceMoney = btn.dataset.priceMoney;
    if(!priceEl || !priceMoney) return;
    priceEl.innerText = priceMoney;


    const capEl = document.querySelector('[data-cap]');
    if(!capEl) return;

    const compareMoney = btn.dataset.compareMoney;

    if(variantIsOnSale && compareMoney) {
        capEl.innerText = compareMoney;
        capEl.classList.remove('hidden');
    } else {
        capEl.classList.add('hidden');
    }
}




function updateVariantInfoFlag(btn, variantPrice, variantComparePrice, variantIsOnSale) {
    const variantInventory = parseInt(btn.dataset.variantInventory || '0', 10);
    const variantInfoFlagEl = document.querySelector('[data-variant-info-flag]'); // could be hidden
    const onSaleContainEl = document.querySelector('[data-on-sale-contain]'); // could be hidden
    const percentOffEl = document.querySelector('[data-percent-off-el]');
    const inventoryEl = document.querySelector('[data-inventory-el]'); // could be hidden

    const showLowInventory = variantInventory <= 5;
    const shouldShowFlag = variantIsOnSale || showLowInventory;

    if (!variantInfoFlagEl || !onSaleContainEl || !percentOffEl || !inventoryEl) return;

    variantInfoFlagEl.classList.toggle('hidden', !shouldShowFlag);

    if(variantIsOnSale) {
        const percentageOff = 100 - Math.round((variantPrice / variantComparePrice) * 100);
        percentOffEl.textContent = percentageOff + '% OFF';
        onSaleContainEl.classList.remove('hidden');
    } else {
        onSaleContainEl.classList.add('hidden');
    }

    if(showLowInventory) {
        inventoryEl.textContent = "Only " + variantInventory + " left!";
        inventoryEl.classList.remove('hidden');
    } else {
        inventoryEl.classList.add('hidden');
    }
}



// thumbnail photo clicks
document.querySelectorAll('[data-thumbnail-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const newImgUrl = btn.dataset.thumbLink;
        const featuredImgEl = document.querySelector('[data-pdp-featured-image]');

        if (!featuredImgEl || !newImgUrl) return;

        const container = btn.closest('[data-thumbnail-contain]');
        if (!container) return;

        // remove all selected class for all buttons
        container.querySelectorAll('[data-thumbnail-btn]').forEach((button) => {
            button.classList.remove('thumbnailSelected');
            button.classList.add('thumbnailNotSelected');
        });

        // add the selectedClass for the newly selected button
        btn.classList.remove('thumbnailNotSelected');
        btn.classList.add('thumbnailSelected');

        // update featured image to selected variant img
        featuredImgEl.src = newImgUrl;
        featuredImgEl.srcset = '';
    });
});



function updateImages(btn) {
    const featuredImgEl = document.querySelector('[data-pdp-featured-image]');
    const primaryImg = btn.dataset.primaryImage;
    const secondaryImg = btn.dataset.secondaryImage;
    const primaryImgThumbEl = document.querySelector('[data-featured-image-thumb]');
    const secondaryImgThumbEl = document.querySelector('[data-secondary-image-thumb]');
    const primaryThumbBtn = document.querySelector('[data-primary-thumb-btn]');
    const secondaryThumbBtn = document.querySelector('[data-secondary-thumb-btn]');

    // update featured image to selected variant img
    if(featuredImgEl) {
        featuredImgEl.src = primaryImg;
        featuredImgEl.srcset = '';
    }

    // update thumbnail images and links
    if(primaryImgThumbEl) {
        primaryImgThumbEl.src = primaryImg;
        primaryImgThumbEl.srcset = '';
    }

    if(primaryThumbBtn) {
        primaryThumbBtn.dataset.thumbLink = primaryImg;
    }

    if (secondaryImg && secondaryImgThumbEl && secondaryThumbBtn) {
        secondaryImgThumbEl.src = secondaryImg;
        secondaryImgThumbEl.srcset = '';
        secondaryThumbBtn.dataset.thumbLink = secondaryImg;
        secondaryThumbBtn.classList.remove('hidden');
    } else {
        // hide secondary thumb when no secondary image exists on that variant
        if (secondaryThumbBtn) {
            secondaryThumbBtn.classList.add('hidden');
        }
    }

    if(primaryThumbBtn) {
        const container = primaryThumbBtn.closest('[data-thumbnail-contain]');
        
        if(container) {
            // remove all selected class for all buttons
            container.querySelectorAll('[data-thumbnail-btn]').forEach((button) => {
                button.classList.remove('thumbnailSelected');
                button.classList.add('thumbnailNotSelected');
            });
    
            // add the selectedClass for the primary selected button
            primaryThumbBtn.classList.remove('thumbnailNotSelected');
            primaryThumbBtn.classList.add('thumbnailSelected');
        }
    }

}





