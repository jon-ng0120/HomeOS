import './App.scss';
import CalendarEvents from './components/CalendarEvents';
import WelcomePanel from './components/WelcomePanel';

function App() {
  return (
    <div className="App">
      <WelcomePanel />
      <CalendarEvents />
    </div>
  );
}

export default App;
