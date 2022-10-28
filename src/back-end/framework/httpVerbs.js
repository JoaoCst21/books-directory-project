// characters that makes the text been treated as a regex
const arrRegexIdentifier = ["?", "+", "*", "(", ")"];

// check if the text is a regex or not
const check = (text) => {
  return arrRegexIdentifier.some((identifier) => text.includes(identifier));
};

const checkParams = (regex) => {
  if (!regex.includes(":")) return { regex };
  const params = regex.match(/:(\w+)/g).map((param) => param.slice(1));
  return { regex, params };
};

const makeCrudMethod = (crudType) =>
  function (regex, fn) {
    const { regex: newRegex, params } = checkParams(regex);
    this.arrRegex[crudType].push({
      regex: newRegex,
      isRegex: check(newRegex),
      params,
    });
    this.objRegex[crudType][newRegex] = fn;
  };

const objRegex = {
  GET: {},
};

const get = makeCrudMethod("GET");
const post = makeCrudMethod("POST");
const put = makeCrudMethod("PUT");
const destroy = makeCrudMethod("DELETE");

export { get, post, put, destroy };
