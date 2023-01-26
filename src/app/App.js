import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatePin } from '../pages/CreatePin';
import { Home } from '../pages/Home';
import { Layout } from '../pages/Layout'
import { Login } from '../pages/Login';
import { PinDetails } from '../pages/PinDetails';
import { Profile } from '../pages/Profile';
import { RequireAuth } from './hoc/RequireAuth';
import './styles/global.scss'
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<Home />} />
          <Route path='pin/:id' element={<PinDetails />} />
          <Route path='create' element={<CreatePin />} />
          <Route path=':profileId' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;