const keystone = require('keystone');

const Types = keystone.Field.Types;

/**
 * Comment Model
 * ==========
 */

const Comment = new keystone.List('Comment', {
  // map: { name: 'title' },
  // autokey: { from: 'publishedDatetime, content.markdown', path: 'key', unique: true },
  // nocreate: true,
  // noedit: true,
});

Comment.add({
  state: { type: Types.Select, options: 'submitted, published, spam', default: 'submitted' },
  author: { type: Types.Relationship, ref: 'User' },
  anonymousAuthor: {
    name: { type: String },
    email: { type: Types.Email },
  },
  publishedDatetime: { type: Types.Datetime, default: Date.now, index: true, initial: true, required: true, unique: true },
  content: { type: Types.Markdown, height: 300, required: true, initial: true },
  post: { type: Types.Relationship, ref: 'Post' },
});

Comment.defaultColumns = 'post, content, state|20%, author|20%, anonymousAuthor.name, publishedDatetime|20%';
Comment.register();
