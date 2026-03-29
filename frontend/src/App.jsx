import { useState, useEffect } from 'react';
import { MOCK_FLOWS, resolveFlowKey } from './constants/mockFlows';
import HeroView from './components/HeroView';
import WorkspaceModal from './components/WorkspaceModal';
import GraphView from './components/GraphView';

// ─── View States: hero → workspace → graph ────────────────────────────
function App() {
  const [view, setView] = useState('hero'); // 'hero' | 'workspace' | 'graph'
  const [flow, setFlow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [graphDirection, setGraphDirection] = useState('forward');
  const [graphSteps, setGraphSteps] = useState(10);

  const handleOpenWorkspace = () => setView('workspace');

  const handleClose = () => {
    setView('hero');
    setTimeout(() => {
      setFlow(null);
    }, 500);
  };

  const handleBackToWorkspace = () => {
    setView('workspace');
    setFlow(null);
  };

  // This function now talks to your actual backend
  const handleAnalyze = async (url, fnText, direction = 'forward', steps = 10) => {
    setFlow(null);
    setLoading(true);
    setGraphDirection(direction);
    setGraphSteps(steps);
    const key = resolveFlowKey(url, fnText);
    setTimeout(() => {
      setFlow(MOCK_FLOWS[key] || MOCK_FLOWS.login);
      setLoading(false);
      setView('graph');
    }, 900);
  };

  // Lock body scroll when workspace/graph is open
  useEffect(() => {
    if (view !== 'hero') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [view]);

  return (
    <>
      <HeroView isActive={view === 'hero'} onOpenWorkspace={handleOpenWorkspace} />
      <WorkspaceModal
        isOpen={view === 'workspace'}
        onClose={handleClose}
        onAnalyze={handleAnalyze}
        loading={loading}
      />
      <GraphView
        isOpen={view === 'graph'}
        flow={flow}
        loading={loading}
        onBackToWorkspace={handleBackToWorkspace}
        initialDirection={graphDirection}
        maxSteps={graphSteps}
      />
    </>
  );
}

export default App;
