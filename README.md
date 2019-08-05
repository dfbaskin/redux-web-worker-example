# Redux in Web Worker Example

This project is an experiment that builds a reasonably complex React/Redux
application which manages a grid of data.

Two versions of the application are used. The first version does all of
its processing on the UI thread. The second version moves the entire Redux
store to a web worker and then uses Reselect selectors to pull data
from the web worker into the main UI thread.

# Resources

- [https://dassur.ma/things/react-redux-comlink/](https://dassur.ma/things/react-redux-comlink/) - the initial inspiration for this project.
- [https://github.com/GoogleChromeLabs/comlink](https://github.com/GoogleChromeLabs/comlink) - Comlink, to communicate with web workers.
- [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html) - React, for the web application itself.
- [https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started) - Redux, for managing application state.
- [https://github.com/reduxjs/reselect](https://github.com/reduxjs/reselect) - Reselect, for selecting state.
- [https://github.com/immerjs/immer](https://github.com/immerjs/immer) - Immer, for working with immutable state.
