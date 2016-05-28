
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

var slugify = function (string) {
//  var accents = "àáäâèéëêìíïîòóöôùúüûñç";
  var accents = "\u00e0\u00e1\u00e4\u00e2\u00e8"
    + "\u00e9\u00eb\u00ea\u00ec\u00ed\u00ef"
    + "\u00ee\u00f2\u00f3\u00f6\u00f4\u00f9"
    + "\u00fa\u00fc\u00fb\u00f1\u00e7";

  var without = "aaaaeeeeiiiioooouuuunc";

  var map = {'@': ' at ', '\u20ac': ' euro ',
    '$': ' dollar ', '\u00a5': ' yen ',
    '\u0026': ' and ', '\u00e6': 'ae', '\u0153': 'oe'};

  return string
    // Handle uppercase characters
    .toLowerCase()

    // Handle accentuated characters
    .replace(
      new RegExp('[' + accents + ']', 'g'),
      function (c) { return without.charAt(accents.indexOf(c)); })

    // Handle special characters
    .replace(
      new RegExp('[' + keys(map).join('') + ']', 'g'),
      function (c) { return map[c]; })

    // Dash special characters
    .replace(/[^a-z0-9]/g, '-')

    // Compress multiple dash
    .replace(/-+/g, '-')

    // Trim dashes
    .replace(/^-|-$/g, '');
};
