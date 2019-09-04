export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((_arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const updateObject = (oldObject, newValues) => ({ ...oldObject, ...newValues });
