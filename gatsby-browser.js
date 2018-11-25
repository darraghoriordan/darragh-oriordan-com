import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import createStore from "./src/state/store";

// remove the JSS style tag generated on the server to avoid conflicts with the one added on the client
export const onInitialClientRender = function() {
  // eslint-disable-next-line no-undef
  var ssStyles = window.document.getElementById("server-side-jss");
  ssStyles && ssStyles.parentNode.removeChild(ssStyles);
};

export const wrapRootElement = ({ element }) => {
  const store = createStore();

  const ConnectedRootElement = (
    <Provider store={store}>
    {element}
    </Provider>
  );

  return ConnectedRootElement;
};
