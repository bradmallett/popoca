// @ts-nocheck 

class PopocaSimpleProductCard extends HTMLElement {
 
    connectedCallback() {
        this.variantInputs = this.querySelectorAll('input[data-variant-radio]');
        
        this.variantInputs.forEach((input) => {
            input.addEventListener('change', this.handleVariantChange)
        })
    }

    // use arrow so don't need to bind
    handleVariantChange = (event) => {
        const selectedVariantBtn = event.currentTarget;
        const featuredImage = this.querySelector('[data-featured-image]');
        const secondaryImageEl = this.querySelector('[data-secondary-image-el]');
        const priceEl = this.querySelector('[data-price-el]');
        const capEl = this.querySelector('[data-cap-el]');
        const productLinkEls = this.querySelectorAll('[data-product-link]');
        const addToCartEl = this.querySelector('[data-add-variant-to-cart]');

        // update image to selected variant img
        featuredImage.src = selectedVariantBtn.dataset.image;
        featuredImage.srcset = '';

        // update secondary image to selected variant img
        secondaryImageEl.src = selectedVariantBtn.dataset.secondaryImage;
        secondaryImageEl.srcset = '';

        // on sale
        const variantPrice = parseInt(selectedVariantBtn.dataset.priceCents || '0', 10);
        const variantComparePrice = parseInt(selectedVariantBtn.dataset.compareCents || '0', 10);
        const variantIsOnSale = variantComparePrice && variantComparePrice > variantPrice;

        priceEl.textContent = selectedVariantBtn.dataset.priceMoney;
        if (variantIsOnSale) {
            capEl.classList.remove('hidden');
            capEl.textContent = selectedVariantBtn.dataset.compareMoney;
        
        } else {
            capEl.classList.add('hidden');        
        }

        // update variant urls
        productLinkEls.forEach(el => {
            el.href = selectedVariantBtn.dataset.variantUrl;
        })

        // update add to cart url
        addToCartEl.value = selectedVariantBtn.dataset.variantId;
    }
}



customElements.define("popoca-simple-product-card", PopocaSimpleProductCard)