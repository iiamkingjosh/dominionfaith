import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import Leadership from './pages/Leadership';
import Ministries from './pages/Ministries';
import SchoolOfMinistry from './pages/SchoolOfMinistry';
import Departments from './pages/Departments';
import HouseFellowship from './pages/HouseFellowship';
import Media from './pages/Media';
import Events from './pages/Events';
import Blog from './pages/Blog';
import Give from './pages/Give';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import Live from './pages/Live';

function getBasePath(href: string) {
  return href.split('#')[0].split('?')[0];
}

function getSearchParams(href: string) {
  const queryPart = href.split('?')[1];
  return queryPart ? new URLSearchParams(queryPart) : undefined;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchParams, setSearchParams] = useState<URLSearchParams | undefined>(undefined);

  const navigate = (href: string) => {
    const base = getBasePath(href);
    const params = getSearchParams(href);
    setCurrentPath(base);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const hash = href.split('#')[1];
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  useEffect(() => {
    const titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = 'Dominion Faith International Ministry';
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/': return <Home onNavigate={navigate} />;
      case '/about': return <About onNavigate={navigate} />;
      case '/vision': return <Vision />;
      case '/leadership': return <Leadership />;
      case '/ministries': return <Ministries onNavigate={navigate} />;
      case '/school-of-ministry': return <SchoolOfMinistry />;
      case '/departments': return <Departments />;
      case '/house-fellowship': return <HouseFellowship />;
      case '/media': return <Media />;
      case '/events': return <Events />;
      case '/blog': return <Blog searchParams={searchParams} />;
      case '/give': return <Give />;
      case '/contact': return <Contact />;
      case '/locations': return <Locations />;
      case '/live': return <Live />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  const noFooterPages = ['/live'];
  const showFooter = !noFooterPages.includes(currentPath);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}
