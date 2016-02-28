var USER_ROLES = [
    "user",
    "guest",
    "author",
    "admin"
];

Template.adminUsers.helpers({  
  users: () => Meteor.users.find({}, {sort: {date: -1}})
});

Template.adminUser.helpers({
	userRoles: () => USER_ROLES,
	isSelected: function(profileRole, role) {
		return profileRole == role ? "selected" : "nope";
	}
});