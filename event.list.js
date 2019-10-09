'use strict';
var express = require('express');
var router = express.Router();
const OracleEvent = require('./../models/OracleEvent');

//lib for handling html request
var request = require('request'), request = request.defaults({ jar: true });
var j = request.jar();
const cheerio = require('cheerio');

//util loading
const utils = require('./../bin/utils');
const getCityCode = utils.getCityCode;
const getEventImage = utils.getEventImage;

module.exports = {
  metadata: () => ({
    name: 'event.list',
    "properties": {},
    supportedActions: ['done']
  }),
  invoke: (conversation, done) => {

    //var variableName = conversation.properties().variable;




    // reply
    conversation
      .reply(`Un instant s'il te plait`)
      .keepTurn(true);





    var options = {
      method: 'GET',
      url: 'https://www.oracle.com/search/events/_/N-1z13zfc?Nr=111',
      headers:
      {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      }
    };


    request(options, function (error, response, body) {

      if (error) throw new Error(error);

      const $ = cheerio.load(String(body));
      const arraylength = 5;
      var events = [];


      $('.cb19w2').each(function (i, elem) {
        events.push(new OracleEvent($(this).find('h4 a').text().replace(/\s+/g, ""), $(this).find('h4 a').attr('href'), $(this).find('.cb19w9').first().text(), $(this).find('.cb19w9').first().next().text(), $(this).find('p').text().replace(/\s+/g, "")));

      });

      var cards = [];

      conversation.reply("Voici la liste des " + arraylength + " prochains evenements Oracle en 🇫🇷🇫🇷🇫🇷").keepTurn(true);

      for (var i = 0; i < events.length && i < arraylength; i++) {


        let actionPO = conversation.MessageModel().urlActionObject("infos", null, events[i].url);
        let cardObj = conversation.MessageModel().cardObject(events[i].title, 'Le ' + events[i].date + ' à ' + events[i].city, getEventImage(events[i].url), null, [actionPO]);

        cards.push(cardObj);
      }

      var cardMessage = conversation.MessageModel().cardConversationMessage('horizontal', cards);
      conversation.reply(cardMessage).keepTurn(true);







      // reply
      conversation
        .transition('done')
        .keepTurn(false);
      done();

    });





  }
};








