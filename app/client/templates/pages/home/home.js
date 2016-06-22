Template.home.helpers({
  latestPosts: () => Posts.latest(),
  latestEntries: () => Entry.find({}, {limit: 5})
})
