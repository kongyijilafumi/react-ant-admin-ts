import { Provider } from "react-redux";
import store from "./store";
import loadable from "@loadable/component";
const AppRouter = loadable(() => import("./router/appRouter"));
const Fn = () => <></>
const Theme = process.env.showColorSet ? (
  loadable(() => import("./components/theme"))
) : (
  Fn
);
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      {process.env.showColorSet && <Theme />}
    </Provider >
  );
}
export default App;
