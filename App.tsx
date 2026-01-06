
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TrackingView from './components/TrackingView';
import AnalyticsPanel from './components/AnalyticsPanel';
import GeofencingPanel from './components/GeofencingPanel';
import ApiDocsPanel from './components/ApiDocsPanel';
import OptimizationPanel from './components/OptimizationPanel';
import DeveloperLab from './components/DeveloperLab';
import { AppSection } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.TRACKING);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.TRACKING:
        return <TrackingView />;
      case AppSection.ANALYTICS:
        return <AnalyticsPanel />;
      case AppSection.GEOFENCING:
        return <GeofencingPanel />;
      case AppSection.OPTIMIZATION:
        return <OptimizationPanel />;
      case AppSection.API:
        return <ApiDocsPanel />;
      case AppSection.DEVELOPER_LAB:
        return <DeveloperLab />;
      default:
        return <TrackingView />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-black text-white selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] -z-10 rounded-full opacity-40"></div>
      <div className="fixed bottom-0 left-64 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -z-10 rounded-full opacity-25"></div>

      <Sidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
      />
      
      <main className="flex-1 relative overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
