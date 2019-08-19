# Redux in Web Worker Example

This project is an experiment that builds a reasonably complex React/Redux
application which manages a grid of data.

The application can be used here:
[https://dfbaskin.github.io/redux-web-worker-example/](https://dfbaskin.github.io/redux-web-worker-example/)

Three versions of the application are provided.

1.  Version One - all processing is on the UI thread (no web worker is used).

1.  Version Two - the entire Redux store is on a worker thread and
    [Reselect](https://github.com/reduxjs/reselect) selectors are used to
    move data from the web worker as needed.

1.  Version Three - uses the [redux-in-worker](https://github.com/dai-shi/redux-in-worker)
    package to manage the redux store (this version provided by [Daishi Kato](https://github.com/dai-shi)).

# Resources

- [https://dassur.ma/things/react-redux-comlink/](https://dassur.ma/things/react-redux-comlink/) - the initial inspiration for this project.
- [https://github.com/GoogleChromeLabs/comlink](https://github.com/GoogleChromeLabs/comlink) - Comlink, to communicate with web workers.
- [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html) - React, for the web application itself.
- [https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started) - Redux, for managing application state.
- [https://github.com/reduxjs/reselect](https://github.com/reduxjs/reselect) - Reselect, for selecting state.
- [https://github.com/immerjs/immer](https://github.com/immerjs/immer) - Immer, for working with immutable state.
