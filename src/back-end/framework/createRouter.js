import makeChainable from "./makeChainable.js";
import { arrRegexFactory, objRegexFactory } from "./regexFactory.js";
import { get, put, post, destroy } from "./httpVerbs.js";
import { use, useRoute } from "./routeCore.js";
import handle from "./handleFlowRequest.js";
// this factory function is used to create a router object
const createRouter = function () {
  const obj = Object.create(createRouter.prototype);
  obj.arrMiddleware = [];
  obj.arrRegex = arrRegexFactory();
  obj.objRegex = objRegexFactory();
  obj.route = (regex) => makeChainable(obj, regex);
  return obj;
};

// this is the prototype of the router object
createRouter.prototype.get = get;
createRouter.prototype.post = post;
createRouter.prototype.put = put;
createRouter.prototype.delete = destroy;
createRouter.prototype.use = use;
createRouter.prototype.useRoute = useRoute;
createRouter.prototype.handle = handle;

export default createRouter;
