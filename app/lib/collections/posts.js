
Posts = new orion.collection('posts', {
    singularName: 'post', // The name of one of these items
  pluralName: 'posts', // The name of more than one of these items
  title: 'posts', // The title in the index of the collection
  link: {
    /**
     * The text that you want to show in the sidebar.
     * The default value is the name of the collection, so
     * in this case it is not necessary.
     */
    title: 'Posts'
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      { data: "createdAt", title: "Date" },
      /**
       * If you want to show a custom orion attribute in
       * the index table you must call this function
       * orion.attributeColumn(attributeType, key, label, options)
       */
    //   orion.attributeColumn('file', 'image', 'Image'),
    //   orion.attributeColumn('summernote', 'body', 'Content', { orderable: true }), // makes it searchable
      orion.attributeColumn('createdBy', 'createdBy', 'Created By')
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
    headerImage: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        label: 'Date',
        denyUpdate: true,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    published: {
        type: Boolean,
        label: "Published",
        optional: true
    },
    publishedAt: {
        type: Date,
        optional: true
    },
    createdBy: orion.attribute('createdBy')
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
  return Posts.find({published: true}, {sort: {createdAt: -1}, limit: 15});
}

Posts.last = function() {
  return Posts.findOne({published: true}, {sort: {createdAt: -1}});
}
