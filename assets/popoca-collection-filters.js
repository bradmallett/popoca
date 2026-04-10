// @ts-nocheck 

class CollectionFilters extends HTMLElement {
    get sectionId() {
        return this.dataset.sectionId;
    }

    connectedCallback() {
        this.filterInputs = this.querySelectorAll('input[data-filter-input]');
        this.sortInputs = this.querySelectorAll('select[data-sort-select], input[data-sort-radio]');
        this.openMobileFilterBtn = this.querySelector('[data-open-mobile-filters]');
        this.closeMobileFilterBtn = this.querySelector('[data-popoca-mobile-filter-close]');
        this.mobileFiltersEl = this.querySelector('[data-mobile-filters-sorting]');
        
        this.filterInputs.forEach((input) => {
            input.addEventListener('change', this.handleFilter)
        });

        this.sortInputs.forEach((input) => {
            input.addEventListener('change', this.handleSort)
        });
        
        if (this.closeMobileFilterBtn) {
            this.closeMobileFilterBtn.addEventListener('click', this.closeMobileFilters);
        }

        if (this.openMobileFilterBtn) {
            this.openMobileFilterBtn.addEventListener('click', this.openMobileFilters);
        }
    }


    openMobileFilters = (event) => {
        this.mobileFiltersEl.classList.add('show-mobile');
    }

    closeMobileFilters = (event) => {
        this.mobileFiltersEl.classList.remove('show-mobile');
    }

    // use arrow so don't need to bind
    handleFilter = async (event) => {
        const input = event.currentTarget;
        let url;

        // build url
        if (input.dataset.addUrl || input.dataset.removeUrl) {
            // checkbox / boolean / list filters
            url = new URL(input.checked ? input.dataset.addUrl : input.dataset.removeUrl, window.location.origin);
        } else {
            // price range filter
            url = new URL(location.href);

            const rangeGroup = input.closest('[data-price-range-group]');
            const minRange = rangeGroup.querySelector('input[type="range"][data-min-value]');
            const maxRange = rangeGroup.querySelector('input[type="range"][data-max-value]');

            url.searchParams.delete(minRange.dataset.param);
            url.searchParams.delete(maxRange.dataset.param);
            url.searchParams.set(minRange.dataset.param, minRange.value);
            url.searchParams.set(maxRange.dataset.param, maxRange.value);
        }

        // only fetch html for the section - not the whole page
        url.searchParams.set("section_id", this.sectionId);
        const res = await fetch(url);
        const html = await res.text();

        // put in a tempDiv so i can query it to grab the part i need
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // replace the old dom with new
        document.querySelector('[data-collection-inner]').innerHTML = tempDiv.querySelector('[data-collection-inner]').innerHTML;
        document.querySelector('[data-mobile-filters-sorting]').classList.add('show-mobile');
        
        url.searchParams.delete("section_id");
        window.history.pushState({}, "", url)
    }   

    handleSort = async (event) => {
        const sortValue = event.currentTarget.value;
        const url = new URL(location.href);
        
        url.searchParams.set("sort_by", sortValue);
        url.searchParams.set("section_id", this.sectionId);

        const res = await fetch(url);
        const html = await res.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        document.querySelector('[data-collection-inner]').innerHTML = tempDiv.querySelector('[data-collection-inner]').innerHTML;
        document.querySelector('[data-mobile-filters-sorting]').classList.add('show-mobile');

        url.searchParams.delete("section_id");
        window.history.pushState({}, "", url)
    }
}

customElements.define("collection-filters", CollectionFilters)