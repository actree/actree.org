if(Meteor.isClient) {
  Meteor.startup(() => {
    Session.set('showLogin', false);
  });
}


// Bootstrap some posts
if (Meteor.isServer && Posts.find().count() < 100) {
//console.log(Meteor.users.findOne({username:"tim"}));
    Meteor.startup(function() {
        if(!Meteor.users.findOne({username: "tim"})) {
            var userId = Accounts.createUser({
                username: 'tim',
                email: "tim@tvooo.de",
                password: "password",
                profile: {
                    name: "Tim von O",
                    role: "admin"
                }
            });

            //Accounts.setPassword(userId, "password");
        }
        
        if(!Meteor.users.findOne({username: "bernd"})) {
            var userId = Accounts.createUser({
                username: 'bernd',
                email: "bernd@tvooo.de",
                password: "password",
                profile: {
                    name: "Bernd",
                    role: "user"
                }
                
            });
            //Accounts.setPassword(userId, "password");
        }
        if(!Meteor.users.findOne({username: "kaethe"})) {
            var userId = Accounts.createUser({
                username: 'kaethe',
                email: "k@tvooo.de",
                password: "password",
                profile: {
                    name: "Käthe",
                    role: "guest"
                }
                
            });
            //Accounts.setPassword(userId, "password");
        }
        if(!Meteor.users.findOne({username: "sergej"})) {
            var userId = Accounts.createUser({
                username: 'sergej',
                email: "ser@tvooo.de",
                password: "password",
                profile: {
                    name: "Sergej",
                    role: "author"
                }
                
            });
            //Accounts.setPassword(userId, "password");
        }

    var user = Meteor.users.findOne({username: "tim"});
    if(!user) return;
    var postId = Posts.insert({
      title: 'Theoretical framework',
      slug: 'theo-framework',
      text: `This chapter introduces theoretical concepts that build the foundation of this thesis. As I focus on researching the social practice of bicycling, it seems mandatory to explore the theory of social relations, with special focus on mobility. Furthermore, I look into the social creation of meaning, which leads to place-making. Lastly, this chapter introduces *random vélomobile formations-in-action*, which are one situation where cycle-based interaction can take place. They are used as an example throughout this thesis report.

## Place-making and purpose

As bicycling is a form of transportation, the movement within space and the concept of *place* play an important role. @dourish note that "a place is a space which is invested with understandings of behavioural appropriateness, cultural expectations, and so forth" and that places are "spaces that are valued" [-@dourish, p. 3]. A place is made by associating meaning with a space, but what does this mean when you are mobile (and thus move within space constantly)?

Marc Augé coined the term 'non-place' and used it to describe spaces of transition and mobility, for example bus stops and motorways. They are places "where interactions are structured by rules not defined by the people in them" [@spinney2007, p. 25]. Augé argues that "we do not find these spaces meaningful" [@spinney2007, p. 28], due to their nature of fleetingness, temporality and ephemerality. Spinney opposes this assumption with respect to bicycling, as cyclists engage with their socio-urban environment in an embodied and sensory way [-@spinney]. He offers an account of meaningful embodied experiences of non-place by means of a narrative of an imaginary bicycle ride through London [-@spinney2007].

When designing for cycle-based interaction, one must keep in mind the purpose of a ride and, resulting from it, the nature of interactions. We ride the bike for reasons of exercise, as a recreational leisure activity with friends or family, or as a commute ('getting from A to B'). The term 'flâneur' has connotations of idleness, exploration, or conoisseur. While it is mainly used with respect to pedestrians, it can apply to other modes of transportation just as well. Flânerie is often the main purpose for motorcycle rides, and @flaneur applies this concept to bicycling. As @spinney2007 proves, even commuting cyclists do not see their ride as pure 'utility', and @aldred2012 come to the same conclusion.

## Chance encounters & vélomobile formations-in-action

Erving Goffman studied people's relations in the public [-@goffman]. He came to the conclusion that social interaction in the public takes either place alone or in a group, and dubbed these two modes 'single' and 'with', respectively. @jensen transfers Goffman's 'with' to the realm of mobility. He also acknowledges the ephemerality of such 'mobile withs':

> *[I]n the mundane and ordinary everyday life we make multiple ‘temporary congregations’ as we are slipping in and out of different ‘mobile withs’ ... ‘Mobile withs’ might be exemplified by groups of recreational runners or cyclists.* --- @jensen [p. 341]

During bicycle rides, especially in urban areas, we often have *chance encounters* --- encounters with strangers who just happen to be at the same place at the same time as we are. In bicycle traffic, most of these are probably other cyclists passing by, riding into the direction we were coming from. But other encounters happen as well: we overtake or are overtaken by other bicyclists, or we ride behind someone for some time, for example because they match our pace or there is no way around them. In these cases, we temporarily form *vélomobile formations-in-action*.^[It is important to note here that 'vélomobile' does not refer to the vehicle of the same name (see [https://en.wikipedia.org/wiki/Velomobile](https://en.wikipedia.org/wiki/Velomobile)), but rather to the concept of *being mobile using a bicycle* (rather than a different vehicle).]

Paul McIlvenny describes vélomobile formations-in-action as "specific arrangements of bodies on
bikes and configurations of a 'vélomobile with'" [-@mcilvenny, p. 137]. His work focuses on two or more people on bikes *intentionally* riding together and trying to maintain a conversation. In chance encounters, however, these vélomobile formations-in-action are random, as the intentionality is missing. Rather, these formations describe temporary arrangements of bikes and people who are most likely strangers, and just happen to ride together in the same direction, at the same time, at a similar pace, for part of their respective journeys. This phenomenon occurs frequently in urban bicycle traffic, yet we seldom make note of it. The following imaginary narrative describes a scenario containing the phenomenon:

> Johan's commute leads him from Rönneholm in Malmö to the city's university in the western harbour. Early in this journey, he passes in front of the city library on Kung Oscars väg and turns left onto Slottsgatan, which immediately overpasses Fersens bro, a slightly ascending canal bridge. While taking the left turn, Johan moves into traffic next to Marie, who was approaching from his right. At this spot, the bike lane is wide enough for the two to ride side-by-side. As they are ascending Fersens bro, they maintain more or less the same pace and stay next to each other. After the climax, the bike lane narrows down. Johan sprints forward in order to slip in the front of Marie, making space for oncoming cyclists riding into the opposite direction. They continue to ride in a formation (in line, "singled up") until Marie turns right towards Stortorget.

During their chance encounter on Fersens bro and after, Johan and Marie are in a 'vélomobile with' and form a vélomobile formation-in-action. They negotiate their formation with respect to each other's cycling abilities and the current environment, without having met each other before.

Random vélomobile formations-in-action are a relevant example for cycle-based interaction because they occur frequently. They both offer space for cyclist-to-cyclist interaction, due to their nature of proximity and matched pace, and they may serve as a trigger for other actions. In this thesis, vélomobile formations-in-action during chance encounters are used as an exemplary target of enquiry.`,
      createdBy: user._id,
      createdAt: new Date()
    });

    Comments.insert({
        postId: postId,
        createdBy: user._id,
        createdAt: new Date(),
        title: "Guter Beitrag",
        text: "Danke, hab viel gelernt",
        published: false
    })
  });
}