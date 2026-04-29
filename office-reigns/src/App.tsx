// Main Application with Routing

import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './ui/hooks/useGame';
import { GameScreen } from './ui/screens/GameScreen';
import { GameOverScreen } from './ui/screens/GameOverScreen';
import { PromotionScreen } from './ui/screens/PromotionScreen';
import { IntroScreen } from './ui/screens/IntroScreen';
import { PersonaScreen } from './ui/screens/PersonaScreen';
import { ThemeScreen } from './ui/screens/ThemeScreen';
import { NameInputScreen } from './ui/screens/NameInputScreen';
import { AdminLayout, CardList, CardEditor, Settings, ImportExport } from './admin';
import type { Persona } from './engine/types';
import { DEFAULT_THEME_ID, getTheme, type ThemeId } from './ui/theme';
import { setAudioTheme } from './engine/audio';
import './App.css';

// Main Game wrapper that switches between screens based on game status
function GameWrapper() {
  const { gameState, isLoading, startNewGame, showIntro, dismissIntro } = useGame();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [showPersonaScreen, setShowPersonaScreen] = useState(false);
  const [showThemeScreen, setShowThemeScreen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(DEFAULT_THEME_ID);

  // Apply data-theme to root element whenever selectedTheme changes
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  // Flow: Intro → PersonaScreen → ThemeScreen → NameInput → Game

  if (showIntro) {
    // Step 4: Persona + theme selected, show name input
    if (selectedPersona && !showThemeScreen) {
      return (
        <NameInputScreen
          persona={selectedPersona}
          onComplete={(names) => {
            startNewGame(selectedPersona, names);
            setSelectedPersona(null);
            setShowPersonaScreen(false);
            dismissIntro();
          }}
        />
      );
    }

    // Step 3: Persona selected, show theme picker
    if (showThemeScreen) {
      return (
        <ThemeScreen
          onSelect={(themeId) => {
            setSelectedTheme(themeId);
            // Apply theme audio immediately so music changes on theme select
            setAudioTheme(getTheme(themeId).audio);
            setShowThemeScreen(false);
          }}
          onBack={() => {
            setShowThemeScreen(false);
            setSelectedPersona(null);
          }}
        />
      );
    }

    // Step 2: Show persona selection
    if (showPersonaScreen) {
      return (
        <PersonaScreen
          onSelect={(persona) => {
            setSelectedPersona(persona);
            setShowThemeScreen(true);
          }}
          onBack={() => {
            setShowPersonaScreen(false);
          }}
        />
      );
    }

    // Step 1: Show intro/rules
    return (
      <IntroScreen
        onContinue={() => {
          setShowPersonaScreen(true);
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
