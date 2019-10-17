'use strict';
var requestjs = require('request');


module.exports = {
  metadata: () => ({
    name: 'create.promise',
    properties: {
      amount: { required: true, type: 'string' },
      promisedate: {required: true, type: 'string'}
    },
    supportedActions: ['ok','nok']
  }),
  invoke: (conversation, done) => {
    //const name = conversation.variable("profile.firstName") || ' ';
    // create a response
    console.error('log1:');

    

    conversation
        .reply(`Wait a moment please...`)
        .keepTurn(true);

    var options = {
      method: 'POST',
      url: 'https://ucf5-zetq-fa-ext.oracledemos.com/fscmRestApi/resources/11.13.18.05/collectionPromises',
      headers:
      {
        'User-Agent': 'request',
        'content-type': 'application/json',
        'Authorization': 'Basic SklNLkpPTkVTOkxGZDQ2ODYz',
        'Accept-Encoding':'identity'
      },
      gzip: true,
      body: 
      { PromiseDate: conversation.properties().promisedate,
        PaymentAccount: null,
        PaymentMethod: null,
        PromiseItemNumber: 'REST TEST Balance',
        BusinessUnit: 'US1 Business Unit',
        BillToCustomerAccount: '10020',
        TransactionNumber: '1146183',
        TransactionDate: '2019-05-25',
        InstallmentNumber: 1,
        PromiseAmount: conversation.properties().amount },
        json: true 
    };



    requestjs(options, function (error, response, body) {
      if (error) {
 
        conversation
          .reply(`An error has occured.`)
          .reply(`Please contact the administrator.`)
          .transition('nok')
          .keepTurn(true);
        done();

        console.error('error1:', error);
        throw new Error(error);
        
      }

      if(response.statusCode=='201'){
        console.log(body);

        conversation.reply(`Thank you, your promise have been created. 👌`);
        conversation.reply(`Your Promise detail ID is `+body.PromiseDetailId);
        // transition state
        conversation.transition();
        conversation.transition('ok');
        done();

      }else{
        console.log("status code:"+response.statusCode);
        console.log(body);
        conversation.reply(`Wrong parameters. A promise may already exist for this date.`);
        // transition state
        conversation.transition();
        conversation.transition('nok');
        done();

      }


    });




    
  }
};
