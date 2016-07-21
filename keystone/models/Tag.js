var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var Tag = new keystone.List('Tag', {
    map: { name: 'name' },
    autokey: { path: 'slug', from: 'name', unique: true },
});

Tag.add({
	name: { type: String, required: true },
});

Tag.relationship({ ref: 'Entry', path: 'tags' });

Tag.register();
