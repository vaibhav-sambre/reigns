// Main Application with Routing

import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './ui/hooks/useGame';
import { GameScreen } from './ui/screens/GameScreen';
import { GameOverScreen } from './ui/screens/GameOverScreen';
import { PromotionScreen } from './ui/screens/PromotionScreen';
import { IntroScreen } from './ui/screens/IntroScreen';
import { NameInputScreen } from './ui/screens/NameInputScreen';
import { AdminLayout, CardList, CardEditor, Settings, ImportExport } from './admin';
import type { Persona } from './engine/types';
import './App.css';

// Main Game wrapper that switches between screens based on game status
function GameWrapper() {
  const { gameState, isLoading, startNewGame, showIntro, dismissIntro } = useGame();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  // Flow: Intro -> NameInput -> Game

  if (showIntro) {
    // If persona selected, show name input
    if (selectedPersona) {
      return (
        <NameInputScreen
          persona={selectedPersona}
          onComplete={(names) => {
            startNewGame(selectedPersona, names);
            setSelectedPersona(null); // Reset for next time
            dismissIntro();
          }}
        />
      );
    }

    // Otherwise show intro (persona selection)
    return (
      <IntroScreen
        onStart={(persona) => {
          setSelectedPersona(persona);
        }}
      />
    );
  }

  if (isLoading || !gameState) {
    return <GameScreen />;
  }

  switch (gameState.status) {
    case 'game-over':
      return <GameOverScreen />;
    case 'promoted':
      return <PromotionScreen />;
    default:
      return <GameScreen />;
  }
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Game Routes */}
        <Route
          path="/"
          element={
            <GameProvider>
              <GameWrapper />
            </GameProvider>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CardList />} />
          <Route path="card/:id" element={<CardEditor />} />
          <Route path="settings" element={<Settings />} />
          <Route path="import-export" element={<ImportExport />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
