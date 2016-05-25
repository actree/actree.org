Template.categories.helpers({
  tags: function() {
    return _.uniq(
      _.flatten(
        Entry.find({}, {sort: {tags: 1}, fields: {tags: true}})
        .fetch()
        .map(function(x) {
          return x.tags;
        })
      )).sort();
    },
    currentTag: () => Session.get("currentTag")
})

Template.categories.events({
  'change input[name="tag"]': function (event, instance) {
    Session.set('currentTag', event.target.value);
  },
})
