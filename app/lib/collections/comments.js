/*
 * Collection
 */
Comments = new orion.collection('comments', {
    singularName: 'Kommentar',
    pluralName: 'Kommentare',
    title: 'Kommentare', // The title in the index of the collection
    link: { // Sidebar
        title: 'Kommentare'
    },
    /**
    * Tabular settings for this collection
    */
    tabular: {
        columns: [
            { data: "content", title: "Inhalt" },
            orion.attributeColumn('hasOne', 'postId', 'Post'),
            orion.attributeColumn('createdBy', 'createdBy', 'Autor'),
            { data: "published", title: "Freigegeben", tmpl: Meteor.isClient && Template.checkbox, tmplContext: function (rowData) {
                return {
                    published: rowData.published
                };
            }},
            { data: "createdAt", title: "Datum" },
        ]
    }
});

/*
 * Schema
 */
CommentsSchema = new SimpleSchema({
    content: {
        type: String,
        autoform: {
            rows: 5
        }
    },
    createdAt: orion.attribute('createdAt'),
    published: {
        type: Boolean,
        label: "Freigegeben",
        optional: true
    },
    publishedAt: {
        type: Date,
        optional: true
    },
    postId: orion.attribute('hasOne', {
        label: 'Post'
    }, {
        collection: Posts,
        titleField: 'title',
        publicationName: 'youCanPutAnyStringYouWantHere',
    }),
    createdBy: orion.attribute('createdBy')
    // createdBy: {
    //     type: String,
    //     label: 'Author',
    //     denyUpdate: true,
    //     defaultValue: function(doc) {
    //         console.log(doc);
    //         if(this.isInsert) {
    //             return "test"//this.userId;
    //         }
    //     }
    // }
});

Comments.attachSchema(CommentsSchema);

/*
 * Helper functions
 */
Comments.mine = function() {
  return Comments.find({createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
}

Comments.for = function(postId) {
  console.log(postId)
  return Comments.find({postId: postId, published: true}, {sort: {createdAt: -1}});
}


// TODO: Should unpublish comment if it gets updated
