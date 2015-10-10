Template.login.helpers({
    showLogin: () => Session.get('showLogin')
})

Template.login.events({
    'submit .login-form': (event) => {
        event.preventDefault();
        Meteor.loginWithPassword(event.target.email.value, "password", function() {
            Session.set('showLogin', false);
        });

        console.log(event.target.email.value);
    }
});

Template.userMenu.events({
    'click .user-logout': (event) => {
        Meteor.logout();
        Session.set('showUserMenu', false);
    }
});

Template.userMenu.helpers({
    showUserMenu: () => Session.get('showUserMenu')
})

Template.nav.helpers({
    showLoginOrUserMenu: () => Session.get('showLogin') || Session.get('showUserMenu')
})

Template.nav.helpers({
    toggleLogin: () => Session.set('showLogin', !Session.get('showLogin')),
    toggleUserMenu: () => Session.set('showUserMenu', !Session.get('showUserMenu'))
})

Template.nav.events({
    'click .toggle-show-login': () => Session.set('showLogin', !Session.get('showLogin')),
    'click .toggle-user-menu': (event) => {
        event.preventDefault();

        //Meteor.logout();
        Session.set('showUserMenu', !Session.get('showUserMenu'));
    }
});