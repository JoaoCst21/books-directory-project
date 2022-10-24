import { get, put, post, destroy } from "./httpVerbs.js";
// this function is used to make the router object chainable
const makeChainable = (obj, regex) => {
  const chainable = {
    get: (fn) => {
      get.call(obj, regex, fn);
      return chainable;
    },
    post: (fn) => {
      post.call(obj, regex, fn);
      return chainable;
    },
    put: (fn) => {
      put.call(obj, regex, fn);
      return chainable;
    },
    delete: (fn) => {
      destroy.call(obj, regex, fn);
      return chainable;
    },
  };
  return chainable;
};

export default makeChainable;
