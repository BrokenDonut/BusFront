import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Bus from './pages/Bus/Bus';
import BusId from './pages/BusId/BusId';

const router = createBrowserRouter([
  {
    path:"/bus",
    element:<Bus></Bus>,
  },
  {
    path:"/bus/:id",
    element:<BusId></BusId>,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
