import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ClubsListView } from './components/ClubsListView';
import { ClubDetailView } from './components/ClubDetailView';
import { CompetitionsView } from './components/CompetitionsView';
import { ArticlesView } from './components/ArticlesView';
import { ArticleDetailView } from './components/ArticleDetailView';
import { FeedView } from './components/FeedView';
import { SavedOfflineView } from './components/SavedOfflineView';
import { DashboardView } from './components/DashboardView';
import { CoachProfileView } from './components/CoachProfileView';
import { AthleteProfileView } from './components/AthleteProfileView';
import { OrganizerProfileView } from './components/OrganizerProfileView';
import { SubscribeModal } from './components/SubscribeModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { AdSenseConfigModal } from './components/AdSenseConfigModal';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  // Route matching logic
  const renderView = () => {
    // Exact routes
    if (currentRoute === '/' || currentRoute === '') {
      return <HomeView />;
    }
    if (currentRoute === '/clubs') {
      return <ClubsListView />;
    }
    if (currentRoute.startsWith('/club/')) {
      const clubId = currentRoute.replace('/club/', '');
      return <ClubDetailView clubId={clubId} />;
    }
    if (currentRoute.startsWith('/coach/')) {
      const coachId = currentRoute.replace('/coach/', '');
      return <CoachProfileView coachId={coachId} />;
    }
    if (currentRoute.startsWith('/athlete/')) {
      const athleteId = currentRoute.replace('/athlete/', '');
      return <AthleteProfileView athleteId={athleteId} />;
    }
    if (currentRoute.startsWith('/organizer/')) {
      const organizerId = currentRoute.replace('/organizer/', '');
      return <OrganizerProfileView organizerId={organizerId} />;
    }
    if (currentRoute === '/competitions') {
      return <CompetitionsView />;
    }
    if (currentRoute === '/articles' || currentRoute === '/news') {
      return <ArticlesView />;
    }
    if (currentRoute.startsWith('/article/')) {
      const articleId = currentRoute.replace('/article/', '');
      return <ArticleDetailView articleId={articleId} />;
    }
    if (currentRoute === '/feed') {
      return <FeedView />;
    }
    if (currentRoute === '/saved') {
      return <SavedOfflineView />;
    }
    if (currentRoute === '/dashboard') {
      return <DashboardView />;
    }

    // Default fallback
    return <HomeView />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer />

      {/* Global Modals */}
      <AuthModal />
      <AdSenseConfigModal />
      <SubscribeModal />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
