Entry = new Mongo.Collection('entry');

EntrySchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Name"
  },
  "url": {
    type: String,
    label: "Webseite",
    optional: false
  },
  "description": {
    type: String,
    label: "Beschreibung"
  },
  "imageUrl": {
    type: String,
    label: "Bild"
  },
  "topics": {
    type: [ String ],
    label: "Themen"
  },
  "sustainability": {
    type: [ String ],
    label: "Nachhaltigkeits-Kriterien"
  },
  "likeCount": {
    type: Number,
    label: "Likes"
  },
  "createdAt": {
    type: Date,
    label: "Date Entry added to System",
    denyUpdate: true,
    autoValue: function() {
      if( this.isInsert ) {
        return new Date;
      } else if (this.isUpdate) {
        return new Date;
      }
    }

  },
  "modifiedAt": {
    type: Date,
    label: "Last modified",
    autoValue: function() {
      if( this.isUpdate ) {
        return new Date;
      }
    },
    optional: true

  }
});

Entry.attachSchema( EntrySchema );

Meteor.methods({
  addEntry: function(entry) {
    check(entry, Entry.simpleSchema() );
    // Handle our insert.
    Entry.insert(entry);
  }
});
