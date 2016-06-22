orion.pages.addTemplate({
    // layout: 'layout',
    template: 'pagesSimple',
    name: 'Simple',
    description: 'Simple template'
}, {
    title: {
        type: String
    },
    content: {
        type: String,
        autoform: {
            rows: 5
        }
    }
})
