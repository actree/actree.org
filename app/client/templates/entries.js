Template.entries.helpers({
	entries: () => Entry.find({}, {sort: {createdAt: -1}})
})
