
Posts = new orion.collection('posts', {
    singularName: 'post',
    pluralName: 'posts',
    title: 'posts', // The title in the index of the collection
    link: { // Sidebar
        title: 'Posts'
    },
    /**
    * Tabular settings for this collection
    */
    tabular: {
        columns: [
            { data: "title", title: "Titel" },
            { data: "createdAt", title: "Datum" },
            // orion.attributeColumn(attributeType, key, label, options)
            // orion.attributeColumn('file', 'image', 'Image'),
            // orion.attributeColumn('summernote', 'body', 'Content', { orderable: true }), // makes it searchable
            orion.attributeColumn('createdBy', 'createdBy', 'Autor'),
            { data: "published", title: "Öffentlich", tmpl: Meteor.isClient && Template.checkbox, tmplContext: function (rowData) {
                return {
                    published: rowData.published
                };
            }}
        ]
    }
});

PostsSchema = new SimpleSchema({
    title: {
        type: String,
        max: 60
    },
    slug: {
        type: String,
        label: 'Slug',
        autoValue: function(doc) {
            if (this.isInsert) {
                return slugify(doc.title);
            }
        }
    },
    category: {
        type: String,
        max: 60
    },
    content: {
        type: String,
        autoform: {
            rows: 5
        }
    },
    summary: {
        type: String,
        label: "Summary",
        autoform: {
            rows: 2
        }
    },
    headerImage: {
        type: String,
        optional: true
    },
    createdAt: orion.attribute('createdAt'),
    published: {
        type: Boolean,
        label: "Published",
        optional: true
    },
    publishedAt: {
        type: Date,
        optional: true
    },
    // createdBy: orion.attribute('createdBy')
    createdBy: {
        type: String,
        label: 'Author',
        denyUpdate: true,
        defaultValue: function(doc) {
            console.log(doc);
            if(this.isInsert) {
                return "test"//this.userId;
            }
        }
    }
});

Posts.attachSchema( PostsSchema );

Posts.helpers({
  comments() {
    return Comments.find({postId: postId, published: true}, {sort: {date: -1}});
  },
  commentCount() {
    return Comments.find({postId: this._id, published: true}).count();
  }
});

Posts.latest = function() {
  return Posts.find({published: true}, {sort: {createdAt: -1}, limit: 5});
}

Posts.last = function() {
  return Posts.findOne({published: true}, {sort: {createdAt: -1}});
}
