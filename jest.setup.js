// Add fetch and Response polyfills
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add Response polyfill
const { Response, Request, Headers } = require("node-fetch");
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

// Add TransformStream polyfill
const { TransformStream } = require("stream/web");
global.TransformStream = TransformStream;

// Add BroadcastChannel mock
class BroadcastChannelMock {
  constructor(channel) {
    this.channel = channel;
  }
  postMessage(message) {}
  addEventListener(type, listener) {}
  removeEventListener(type, listener) {}
  close() {}
}
global.BroadcastChannel = BroadcastChannelMock;

// Setup fetch mock
global.fetch = jest.fn();
