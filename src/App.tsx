import { Basket } from "./components/Basket";
import { Tree } from "./components/Tree";
import "./styles/main.scss";
import "./styles/reset.scss";

function App() {
  return (
    <main className="mainContainer ">
      <Tree />
      <Basket />
    </main>
  );
}

export default App;
