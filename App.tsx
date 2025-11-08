import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TreatmentMethodPage from './pages/TreatmentMethodPage';
import AboutPage from './pages/AboutPage';
import QuestionnaireApp from './QuestionnaireApp';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/treatment-method" element={<TreatmentMethodPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/questionnaire" element={<QuestionnaireApp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;