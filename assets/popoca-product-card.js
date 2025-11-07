    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-variant-id]');
        
        console.log(btn)

    })