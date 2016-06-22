Template.entries.helpers({
	entries: (tag) => {
    if(tag) {
      return Entry.find({tags: tag}, {sort: {createdAt: -1}})
    } else {
      return Entry.find({}, {sort: {createdAt: -1}})
    }
  },
  // activeTag: () => Session.get("currentTag")
})
