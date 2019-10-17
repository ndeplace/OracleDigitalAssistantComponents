const Tester = require("@oracle/bots-node-sdk/testing");
const StartGreetingComponent = require('../components/start.greeting');
const CreatPromiseComponent = require('../components/create.promise');


it('@satrt.greting : should respond to a request with params', done => {
    // create a conversation payload iwth properties and variables
    const properties = {};
    const variables = { "profile.firstName": 'Nicolas' };
    const request = Tester.MockRequest(null, properties, variables);
  
    const conv = Tester.MockConversation.fromRequest(request);

    // stub/watch the variable method
    const varSpy = spyOn(conv, 'variable').and.callThrough();

    // invoke the component
    StartGreetingComponent.invoke(conv, (err) => {
      expect(err).toBeUndefined();
      expect(conv.getReplies()).toBeDefined();
      // check that the spy was called (once as getter, once as setter)
      expect(varSpy).toHaveBeenCalledTimes(1);
  
      // make assertions on the responses
      const reply = conv.getReplies()[0];
      expect(Reflect.has(reply.messagePayload, 'text')).toBe(true);
      expect(reply.messagePayload.text).toEqual('Hello Nicolas, how can I help you today?');
      done();
    });
  });

  it('@create.promise : test', done => {
    // create a conversation payload iwth properties and variables
    const properties = { amount: '1', promisedate : '2019-11-01'};
    const variables = {"profile.firstName": 'Nicolas'};
    const request = Tester.MockRequest(null, properties, variables);
  
    const conv = Tester.MockConversation.fromRequest(request);

    // stub/watch the variable method
    const varSpy = spyOn(conv, 'variable').and.callThrough();

    // invoke the component
    CreatPromiseComponent.invoke(conv, (err) => {
      
      done();
    });
  });

