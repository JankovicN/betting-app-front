
import App from './components/app'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <div className='vh-100'>
    <App />
  </div>);

