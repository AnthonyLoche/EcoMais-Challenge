// App.jsx
import { Provider } from "react-redux";
import { store } from "./store";
import { Router } from "./routes";
import Loading from "./components/global/loading";
import { Toaster } from 'sonner';

function App() {
  return (
    <Provider store={store}>
      <Loading />
      <Router />
      <Toaster position="bottom-right" richColors />
    </Provider>
  );
}

export default App;