import { checkIfParamsValid, createObjectParams } from "./helpers.js";
// this function is called when a request comes, it controls the
// flow of the request, calls the middleware functions and then
// calls the corresponding controller function
const handle = async function (req, res) {
  // run Middleware in order
  for (let fn of this.arrMiddleware) {
    await fn(req, res);
  }

  for (const { regex, isRegex, params } of this.arrRegex[req.method]) {
    let newRegex = regex;

    // if there are params in the regex, store them in the req.params object
    if (params) {
      const arrUrl = req.url.split("/").slice(1);
      const arrRegex = newRegex.split("/").slice(1);

      // if the number of params in the regex is not equal to the number of params in the url
      // then the request is not valid, and it will go to the next regex
      if (arrRegex.length !== arrUrl.length) continue;

      // if the route is not a regex, then it will replace the params
      // with the url params and check if the new regex is equal to the url
      // if it is not equal then the request is not valid, and it will go to the next regex
      newRegex = checkIfParamsValid(arrRegex, arrUrl, req.url) || regex;
      if (newRegex === regex) continue;

      // create an object with the params as keys and the url params as values
      req.params = createObjectParams(arrRegex, arrUrl, params);
    }

    // if url is valid, then run the corresponding controller function and break the loop
    if (isRegex ? req.url.match(newRegex) !== null : req.url === newRegex) {
      await this.objRegex[req.method][regex](req, res);
      return;
    }
  }
};

export default handle;
