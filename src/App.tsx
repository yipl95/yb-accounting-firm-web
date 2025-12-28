import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ConsultationModal } from './components/ConsultationModal';
import { CozeWidget } from './components/CozeWidget';
import { WeComFloat } from './components/WeComFloat';

function App() {
  return (
    <div className="font-sans text-slate-900 bg-white">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
      <ConsultationModal />
      <CozeWidget />
      <WeComFloat />
    </div>
  );
}

export default App;
