// this factory is used to store the possible regex routes in
// the routers/subRouters objects
const arrRegexFactory = () => {
  return {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  };
};

// this factory is used to store the functions in the router object
// for every posible route in the routers/subRouters objects
// being the key the regex and the value the function
const objRegexFactory = () => {
  return {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

export { arrRegexFactory, objRegexFactory };
