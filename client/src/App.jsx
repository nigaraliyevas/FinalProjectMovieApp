import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
