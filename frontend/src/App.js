import { useEffect, useState } from 'react';
import './App.css';

import { Sidebar } from './components/layouts/Sidebar';
import { ListToday } from './pages/today/ListToday';
import { Route, Routes } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    getList();
  })
  //Get list
  const getList = async () => {
    const querySnapshot = await getDocs(collection(db, "List"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setList(data)
  }


  return (
    <div className="grid grid-cols-[250px,1fr] min-h-screen gap-x-8 bg-bg">
      <Sidebar list={list} />
      <Routes>
        <Route
          path='/today'
          element={<ListToday
            list={list} />
          }></Route>
      </Routes>
    </div>
  );
}

export default App;
