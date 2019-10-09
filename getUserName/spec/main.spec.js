const Tester = require("@oracle/bots-node-sdk/testing");
const HelloWorldComponent = require('../components/hello.world');

it('should respond to a request with params', done => {
    // create a conversation payload iwth properties and variables
    const properties = { name: 'Unit Tester' };
    const variables = { hello: 'Howdy' };
    const request = Tester.MockRequest(null, properties, variables);
    console.log(request);
    const conv = Tester.MockConversation.fromRequest(request);

    // stub/watch the variable method
    const varSpy = spyOn(conv, 'variable').and.callThrough();

    // invoke the component
    HelloWorldComponent.invoke(conv, (err) => {
      expect(err).toBeUndefined();
      expect(conv.getReplies()).toBeDefined();
      // check that the spy was called (once as getter, once as setter)
      expect(varSpy).toHaveBeenCalledTimes(2);

      // make assertions on the responses
      const reply = conv.getReplies()[0];
      expect(Reflect.has(reply.messagePayload, 'text')).toBe(true);
      expect(reply.messagePayload.text).toEqual('Howdy Unit Tester.');
      expect(conv.variable('greeted')).toBe(true);

      done();
    });
  });