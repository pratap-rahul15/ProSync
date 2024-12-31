import Header from "./components/Header";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from "./pages/Project";
import { useState, useEffect } from 'react';

const cache = new InMemoryCache({

  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },

        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },

      },
    },
  },
});

// We are using InMemoryCache to store the data returned from the server, for fast access
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache,
});

function App() {
  // State to manage the theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme dynamically to the document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (

  <>
    <ApolloProvider client={client}>
    <Router>
      <Header />
      <div className='container'>

        {/* Button to toggle between Light and Dark modes */}
        <button onClick={toggleTheme} className='btn btn-primary'>
           {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects/:id' element={<Project />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </ApolloProvider>
  </>

  );
}

export default App;
