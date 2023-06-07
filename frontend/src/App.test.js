import { render, screen } from '@testing-library/react';
import App from './App';
//import {BrowserRouter as Router} from 'react-router-dom';

test('MAIN APP PAGE', () => {
  render(
   
    <App />
    
    );
 const linkElement = screen.getByTestId('APP');
 expect(linkElement).toBeInTheDocument();
});



