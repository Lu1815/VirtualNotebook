import { extendTheme }  from '@chakra-ui/react';

import Routes from './Components/Routes';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({ breakpoints });

function App() {
  return (
    <div id="app">
      <Routes />
    </div>
  );
}

export default App;
