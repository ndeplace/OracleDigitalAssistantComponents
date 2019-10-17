'use strict';
 
module.exports = {
  metadata: () => ({
    name: 'start.greeting',
    properties: {
    },
    supportedActions: ['ok']
  }),
  invoke: (conversation, done) => {
    
    const name = conversation.variable("profile.firstName") || ' ';

    // create a response
    conversation.reply(`Hello ${name}, how can I help you today?`);
    // transition state
    conversation.transition();
    done();
  }
};
