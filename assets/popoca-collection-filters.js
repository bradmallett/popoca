class CollectionFilters extends HTMLElement {
    get sectionId() {
        return this.dataset.sectionId
    }

    connectedCallback() {
        this.filterInputs = this.querySelectorAll("input");
        this.minRange = this.querySelector('input[type="range"][data-min-value]');
        this.maxRange = this.querySelector('input[type="range"][data-max-value]');
        
        this.filterInputs.forEach((input) => {
            input.addEventListener('change', this.handleClick)
        })
    }

    // use arrow so don't need to bind
    handleClick = async (event) => {
        const input = event.currentTarget;
        let url;

        // build url
        if (input.dataset.addUrl || input.dataset.removeUrl) {
            // checkbox / boolean / list filters
            url = new URL(input.checked ? input.dataset.addUrl : input.dataset.removeUrl, window.location.origin);
        } else {
            // price range filter
            url = new URL(location.href);

            url.searchParams.delete(this.minRange.dataset.param);
            url.searchParams.delete(this.maxRange.dataset.param);
            url.searchParams.set(this.minRange.dataset.param, this.minRange.value);
            url.searchParams.set(this.maxRange.dataset.param, this.maxRange.value);
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
        
        url.searchParams.delete("section_id");
        window.history.pushState({}, "", url)
    }   
}

customElements.define("collection-filters", CollectionFilters)