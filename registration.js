'use strict';
var request = require('request');


//util loading
const utils = require('./../bin/utils');
const getCityCode = utils.getCityCode;

module.exports = {
  metadata: () => ({
    name: 'registration',
    properties: {
      name: { required: true, type: 'string' },
      surname: { required: true, type: 'string' },
      email: { required: true, type: 'string' },
      city: { required: true, type: 'string' },
      company: { required: true, type: 'string' }
    },
    supportedActions: ['confirmed', 'noconfirmed', 'emailRequired', 'nameRequired', 'surnameRequired', 'cityRequired', 'companyRequired']
  }),
  invoke: (conversation, done) => {
    // perform conversation tasks.
    const name = conversation.properties().name;
    const surname = conversation.properties().surname;
    const email = conversation.properties().email;
    const city = conversation.properties().city;
    const company = conversation.properties().company;

    const isconfirmed = true;

    if (name == "" || !name) {

      // reply
      conversation
        .reply(`Sorry, missing name..`)
        .reply(`Please give me your name`)
        .transition('nameRequired')
        .keepTurn(true);
      done();

    } else if (surname == "" || !surname) {

      // reply
      conversation
        .reply(`Sorry, missing surname..`)
        .reply(`Please give me your surname`)
        .transition('surnameRequired')
        .keepTurn(true);
      done();
    } else if (email == "" || !email) {

      // reply
      conversation
        .reply(`Sorry, missing email...`)
        .reply(`Please give me your email`)
        .transition('emailRequired')
        .keepTurn(true);
      done();
    } else if (company == "" || !company) {

      // reply
      conversation
        .reply(`Sorry, missing company...`)
        .reply(`Please give me your company name`)
        .transition('companyRequired')
        .keepTurn(true);
      done();
    } else if (getCityCode(city) == "000") {

      // reply
      conversation
        .reply(`Erreur, Ville incorrecte...`)
        .reply(`S'il vous plait donnez moi le nom de la ville de l'evenement`)
        .transition('cityRequired')
        .keepTurn(true);
      done();
    } else {

      // reply
      conversation
        .reply(`Un instant s'il vous plait...`)
        .keepTurn(false);

      var formdata = {
        submitForm: ' yes',
        sectionstocheck: ' 107',
        pro_email: email,
        pro_fname: name,
        pro_lname: surname,
        pro_addr_country: 'Spain',
        pro_organization: company,
        pro_position: ' SE',
        pro_addr_line1: ' calle ochoa',
        pro_addr_city: ' malaga',
        pro_addr_state: 'Spain',
        pro_addr_postal_code: ' 29018',
        pro_phone: '  34999090936',
        pro_show_online: ' 1',
        sectionsToCheck: ' 20',
        SectionsToCheck: ' 112',
        PKformID: getCityCode(city),
        throttleID: ' 3A321F90-DE00-A759-073302E1C648AB9A',
        insertKey: ' 3A3233DFF2C646695F7881BF03008A8B',
        r123_url__PKformID: getCityCode(city),
        r123_url__source: ' EMMK190124P00039:em:ip:std:cpo:InvitationLocale',
        r123_url__R123_DOMAIN: ' oracle'
      }

      var options = {
        method: 'POST',
        url: 'https://eventreg.oracle.com/profile/form/index.cfm',
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
          .reply(`Merci de contacter votre admin.`)
          .transition('noconfirmed')
          .keepTurn(true);
          done();
          // conversation.error
          throw new Error(error);
        }

        // reply
        conversation
          .reply(`Voila ${name} 👏👏`)
          .reply(`Tu es inscrit à l'évenement de ${city}`)
          .reply(`Vérifie que tu aies bien reçu le mail de confirmation`)
          .reply(`On aura l'occasion de rediscuter ensemble lors de l'évenement 😉🤫`)
          .transition('confirmed')
          .keepTurn(true);
          done();

      });


    }


  }
};
