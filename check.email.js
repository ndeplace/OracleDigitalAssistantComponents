const utils = require('./../bin/utils');
const getEventId = utils.getEventId;
var request = require('request');

module.exports = {
    metadata: () => ({
        name: 'check.email',
        properties: {
            city: { required: true, type: 'string' },
            email: { required: true, type: 'string' }
        },
        supportedActions: ['ok', 'nok', 'cityRequired']
    }),
    invoke: (conversation, done) => {
        // read 'hello' variable
        const city = conversation.properties().city;
        const email = conversation.properties().email;

        if (getEventId(city) == "000") {

            conversation.variable('city', '');
            // reply
            conversation
                .reply(`Nom de ville incorrect...`)
                .reply(`s'il te plait, donnes moi un nom de ville correct pour l'evenement`)
                .transition('cityRequired')
                .keepTurn(true);
            done();

        } else {

            if (!validateEmail(email)) {
                
                conversation.variable('email', '');


                    conversation
                    .reply(`ceci n'est pas un email valide`)
                    .reply(`merci de m'en donner un autre`)
                    .transition('nok')
                    .keepTurn(true);
                    done();

              } else {
                



            conversation
        .reply(`Un instant s'il te plait...`)
        .keepTurn(true);

            var formdata = {
                method: 'checkUniqueRegistrationEmail',
                emailAddress: email,
                eventId: getEventId(city),
                registrationId: '0'
              }


            var options = {
                method: 'POST',
                url: 'https://eventreg.oracle.com/ajax/registration.cfc',
                headers:
                {
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
                    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                }
                , formData: formdata
            };




            request(options, function (error, response, body) {

                if (error) {
                    conversation
                        .reply(`Une erreur est survenue.`)
                        .reply(`Merci de contacter l'administrateur.`)
                        .transition('nok')
                        .keepTurn(true);
                    done();
                    throw new Error(error);
                }

                var obj = JSON.parse(body);
                
                if(obj.isUnique==true){
                    conversation
                    .transition('ok')
                    .keepTurn(true);
                    done();
                }else{

                    conversation.variable('email', '');


                    conversation
                    .reply(`cet email est déja utilisé pour l'inscription à cet évenement`)
                    .reply(`merci de m'en donner un autre`)
                    .transition('nok')
                    .keepTurn(true);
                    done();
                }
                

            });


        }

        }


    }
};


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }