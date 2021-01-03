import "./App.css";
import ConvertSpeech from "./Components/ConvertSpeech";
import ConvertText from "./Components/ConvertText";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <ConvertSpeech />
      <ConvertText />
    </div>
  );
}

export default App;
