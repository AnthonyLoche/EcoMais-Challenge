// App.jsx
import { Provider } from "react-redux";
import { store } from "./store";
import { Router } from "./routes";
import Loading from "./components/global/loading";

function App() {
  return (
    <Provider store={store}>
      <Loading />
      <Router />
    </Provider>
  );
}

export default App;