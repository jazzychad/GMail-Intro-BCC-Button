InboxSDK.load('1.0', 'INSERT_APP_TOKEN_HERE').then(function(sdk){

    var _log = function(msg) {
        //console.log(msg);
    };

    sdk.Compose.registerComposeViewHandler(function(composeView){

        var used = false;

        var button = {
            title: "BCC Intro",
            iconUrl: 'http://www.gohacking.com/wp-content/uploads/2010/04/BCC_for_emails.jpg',
            onClick: function(event) {
                if (!used) {
                    var cv = event.composeView;
                    _log(cv.getToRecipients());
                    _log(cv.getCcRecipients());
                    var toRecipients = cv.getToRecipients();
                    var toNames = toRecipients.map(function(obj){if (obj.name) {return obj.name.split(" ")[0]} else {return null;}}).filter(function(obj){return obj !== null;});
                    _log(toNames);
                    var newToEmails = cv.getCcRecipients().map(function(obj){return obj.emailAddress;});
                    var newBccEmails = cv.getToRecipients().map(function(obj){return obj.emailAddress;});

                    cv.setToRecipients(newToEmails);
                    cv.setBccRecipients(newBccEmails);
                    cv.setCcRecipients([]);
                    cv.insertTextIntoBodyAtCursor("(" + toNames.join(", ") + " to BCC)\n\n");
                    used = true;
                } else {
                    sdk.ButterBar.showMessage({text: "Intro BCC already used.", time: 2000});
                }
            },
        };

        // only show if email is a reply and there is someone(s) on the CC line
        if (composeView.isReply() && composeView.getCcRecipients().length) {
            composeView.addButton(button);
        }

    });

});
