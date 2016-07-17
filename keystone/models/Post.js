var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    imageCredit: { type: Types.Markdown, height: 150 },
    content: {
        brief: { type: String },
        extended: { type: Types.Markdown, height: 600 },
    },
    category: { type: Types.Relationship, ref: 'PostCategory' },
    showComments: { type: Types.Boolean }
});

Post.schema.virtual('content.full').get(function () {
    return this.content.extended.html || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
