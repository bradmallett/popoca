// @ts-nocheck 

document.addEventListener('change', (e) => {
    const variantBtn = e.target.closest('[data-pdp-variant-radio]');
    if(!variantBtn) return;
    updateImages(variantBtn);

    
});


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
})



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





