import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import { DarkModeProvider } from './components/context/DarkModeContext';


const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <DarkModeProvider>
            <Router/>
            </DarkModeProvider>
        </CookiesProvider>
      </QueryClientProvider>
  )
}

export default App;
