var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Entry = new keystone.List('Entry', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Entry.add({
    title: { type: String, required: true },
    url: { type: Types.Url },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    oldImage: { type: Types.Url },
    description: { type: Types.Markdown, height: 600 },
    tags: { type: Types.Relationship, ref: 'Tag', many: true }
});

Entry.schema.virtual('content.full').get(function () {
    return this.content.extended.html || this.content.brief;
});

Entry.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Entry.register();
