'use strict';
 
module.exports = {
  metadata: () => ({
    name: 'hello.world',
    properties: {
      name: { required: true, type: 'string' },
    },
    supportedActions: []
  }),
  invoke: (conversation, done) => {
    // read 'hello' variable
    const hi = conversation.variable('hello') || 'Hi';
    // create a response
    conversation.reply(`${hi} ${conversation.properties().name}.`);
    // set a variable
    conversation.variable('greeted', true);
    // transition state
    conversation.transition();
    done();
  }
};
