
Posts = new Mongo.Collection('posts');

Posts.latest = function() {
  return Posts.find({published: true}, {sort: {createdAt: -1}, limit: 15});
}

Posts.last = function() {
  return Posts.findOne({published: true}, {sort: {createdAt: -1}});
}

Posts.create = function() {
  return Posts.insert({
    createdBy: Meteor.userId()
  });
}

Posts.comments = function(postId) {
  return Comments.find({postId: postId, published: true}, {sort: {date: -1}});
}

Posts.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.published = false;
});

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
