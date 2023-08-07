import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// If you encounter any issues or warnings in the future, you can consider moving <React.StrictMode>
// back to index.tsx to help identify and address potential problems. Remember that <React.StrictMode> is a valuable tool for catching and addressing issues early in the development process

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
