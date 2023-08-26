// import PropTypes from 'prop-types';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from "./App";
//
// import '../public/index.css'
//
// window.onload = function () {
//     fetch('public/data.json')
//         .then((response) => response.json())
//         .then((data) => {
//             let app = React.createElement(App, {data});
//             let root = document.getElementById('root');
//             ReactDOM.render(app, root);
//         });
// }

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<App />);
