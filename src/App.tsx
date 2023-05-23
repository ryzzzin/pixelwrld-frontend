import React from 'react';
import './App.scss';
import Game from './pages/Game';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Games from './pages/Games';
import NewGame from './pages/NewGame';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/games/new",
    element: <NewGame />,
  },
  {
    path: "/games/:sessionId",
    element: <Game />,
  },
]);

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </RecoilRoot>
  );
}

export default App;
