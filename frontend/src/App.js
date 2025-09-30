import { useEffect, useState } from 'react';
import './App.css';
import { Sidebar } from './components/layouts/Sidebar';
import { useAddList, useDeleteList, useGetList } from './components/hooks/listAPI';
import { Home } from './pages/Home';



function App() {
  const { data: list, isLoading, isError } = useGetList();
  const addList = useAddList();
  const deleteList = useDeleteList();
  const [currentList, setCurrentList] = useState('');
  console.log(currentList);


  useEffect(() => {
    if (list?.length > 0 && !currentList) {
      setCurrentList(list[0]._id);
    }
  }, [list, currentList]);



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching todos</p>;
  return (
    <div className="grid grid-cols-[250px,1fr] min-h-screen gap-x-8 bg-bg">
      
      <Sidebar list={list}
        addList={addList}
        deleteList={deleteList}
        currentList={currentList}
        setCurrentList={setCurrentList} />
      <Home
        currentList={currentList}
        list={list}
      />

    </div>
  );
}

export default App;
