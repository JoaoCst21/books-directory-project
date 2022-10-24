import createRouter from "./createRouter.js";

// so, the possible requests routes are stored in an array with
// the route regex/route as values, and the functions stored
// in an object with the regex as key, when ever a request comes
// the handle function is called, it will run the middleware
// functions, then it will loop through the array of routes,
// and compare the route if is not valid it will go to
// next iteration and check again, if it is valid and so on
// and so forth, if its true it will go to the map/object
// and run the function stored in the map/object with the
// key as the regex value, all in that order

// this is the main object that is exported
const app = { createRouter, ...createRouter() };
Object.setPrototypeOf(app, createRouter.prototype);
export default app;
