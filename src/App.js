import Dacia from './components/Dacia';
import Appearance from './Appearance';

import './style.css';
function App() {
  const theme = Appearance.useContainer();
  return (
    <div className={`container background-${theme.theme}`}>
      <Dacia />
    </div>
  );
}

export default App;
