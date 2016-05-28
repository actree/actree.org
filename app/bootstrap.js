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

    var postId = Posts.insert({
      title: 'To our International Friends',
      slug: 'theo-framework',
      category: 'Essay',
      summary: 'Why we are focussing on the German-speaking market for now',
      headerImage: 'https://source.unsplash.com/category/nature/800x450',
      content: faker.lorem.paragraphs(),
      createdBy: user._id,
      createdAt: new Date(),
      published: false
    });

    var postId = Posts.insert({
      title: 'actree ist ausgezeichnet!',
      slug: 'ausgezeichnet',
      category: 'Essay',
      summary: 'Wir haben einen Preis gewonnen',
      headerImage: 'https://source.unsplash.com/category/nature/800x450',
      content: faker.lorem.paragraphs(),
      createdBy: user._id,
      createdAt: new Date(),
      published: false
    });

    var postId = Posts.insert({
      title: 'Ein Workshop zur Zukunft von actree',
      slug: 'co-design-workshop',
      category: 'In eigener Sache',
      headerImage: 'https://source.unsplash.com/category/nature/800x450',
      summary: 'In einem Co-Design Workshop haben wir zusammen erarbeitet, was actree in Zukunft vertreten soll: Transparenz und Nachhaltigkeit.',
      content: faker.lorem.paragraphs(),
      createdBy: user._id,
      createdAt: new Date(),
      published: false
    });

    Comments.insert({
        postId: postId,
        createdBy: user._id,
        createdAt: new Date(),
        title: "Guter Beitrag",
        text: "Danke, hab viel gelernt",
        published: false
    });

    // Seed( 'Entry', {
    //     min: 5,
    //     model( index ) {
    //       return {
    //         name: faker.commerce.product(),
    //         price: faker.commerce.price(),
    //         imageUrl: "https://actree.org/content/01-resources/04-technik/fairphone/chiligum-article-fairphone.jpg",
    //         description: faker.lorem.paragraph(),
    //         url: faker.internet.url(),
    //         topics: ["Technologie", "Smartphone"],
    //         sustainability: ["sustainable", "fairtrade", "coflict-free"],
    //         likeCount: 123
    //       };
    //     }
    //   });
  });
}
