if(Meteor.isClient) {
  Meteor.startup(() => {
    Session.set('showLogin', false);
  });
}


// Bootstrap some posts
if (Meteor.isServer && Posts.find().count() < 100) {
  faker.locale = "de";
//console.log(Meteor.users.findOne({username:"tim"}));
    Meteor.startup(function() {
        if(!Meteor.users.findOne({username: "tim"})) {
            var userId = Accounts.createUser({
                username: 'tim',
                email: "tim@tvooo.de",
                password: "password",
                profile: {
                    name: "Tim von O"
                }
            });
            // Roles.addUsersToRoles(userId, ['admin']);

            //Accounts.setPassword(userId, "password");
        }

        if(!Meteor.users.findOne({username: "bernd"})) {
            var userId = Accounts.createUser({
                username: 'bernd',
                email: "bernd@tvooo.de",
                password: "password",
                profile: {
                    name: "Bernd"
                }

            });
            // Roles.addUsersToRoles(userId, ['user']);
            //Accounts.setPassword(userId, "password");
        }
        if(!Meteor.users.findOne({username: "kaethe"})) {
            var userId = Accounts.createUser({
                username: 'kaethe',
                email: "k@tvooo.de",
                password: "password",
                profile: {
                    name: "Käthe"
                }
            });
            // Roles.addUsersToRoles(userId, ['guest']);
            //Accounts.setPassword(userId, "password");
        }
        if(!Meteor.users.findOne({username: "sergej"})) {
            var userId = Accounts.createUser({
                username: 'sergej',
                email: "ser@tvooo.de",
                password: "password",
                profile: {
                    name: "Sergej"
                }


            });
            // Roles.addUsersToRoles(userId, ['author']);
            //Accounts.setPassword(userId, "password");
        }

    var user = Meteor.users.findOne({username: "tim"});
    if(!user) return;

    // var postId = Posts.insert({
    //   title: 'To our International Friends',
    //   category: 'Essay',
    //   summary: 'Why we are focussing on the German-speaking market for now',
    //   headerImage: '/blog/header-images/hamburg.jpg',
    //   content: faker.lorem.paragraphs(),
    //   createdBy: user._id,
    //   createdAt: new Date(),
    //   published: false
    // });
    //
    // var postId = Posts.insert({
    //   title: 'actree ist ausgezeichnet!',
    //   category: 'Essay',
    //   summary: 'Wir haben einen Preis gewonnen',
    //   headerImage: '/blog/header-images/aurora.jpg',
    //   content: faker.lorem.paragraphs(),
    //   createdBy: user._id,
    //   createdAt: new Date(),
    //   published: false
    // });
    //
    // var postId = Posts.insert({
    //   title: 'Ein Workshop zur Zukunft von actree',
    //   category: 'In eigener Sache',
    //   headerImage: '/blog/header-images/zukunft.jpg',
    //   summary: 'In einem Co-Design Workshop haben wir zusammen erarbeitet, was actree in Zukunft vertreten soll: Transparenz und Nachhaltigkeit.',
    //   content: faker.lorem.paragraphs(),
    //   createdBy: user._id,
    //   createdAt: new Date(),
    //   published: false
    // });

    // Comments.insert({
    //     postId: postId,
    //     createdBy: user._id,
    //     createdAt: new Date(),
    //     content: "Danke, hab viel gelernt",
    //     published: false
    // });
  });
}
