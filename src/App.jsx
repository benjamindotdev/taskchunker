import { useState, useEffect } from 'react'
import axios from 'axios';

import './App.css'

function App() {

  const [task, setTask] = useState({});
  const [chunks, setChunks] = useState([]);

  const [isLoadingChunks, setIsLoadingChunks] = useState(false);

  useEffect(() => {
    console.log('chunks:', chunks.response);
  }, [chunks]);

  const serverUrl = 'https://taskchunker-backend-production.up.railway.app/api/v1/chat';

  const handleTaskChange = (e) => {
    setTask(e.target.value)
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    console.log('task:', task);
    setIsLoadingChunks(true);
    try {
      const response = await axios.post(`${serverUrl}`, { "message": task });
      console.log('response:', response);
      setChunks(response.data);
    } catch (error) {
      console.error('error:', error);
      setIsLoadingChunks(false);
    }
  }

  return (
    <main className='bg-zinc-800 h-screen w-full p-6 text-zinc-100 flex flex-col items-center justify-center gap-12'>
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-7xl'>Taskchunker</h1>
      <h2 className='text-2xl'>Build big. Start small.</h2>
    </div>
      {
        !isLoadingChunks ? (
          <form
        className="flex flex-col gap-4 w-full p-6"
        onSubmit={handleTaskSubmit}
      >
        <textarea
        className='text-zinc-900 p-2 rounded-xl w-full'
          label={'What do you want to do?'}
          onChange={handleTaskChange}
        />
        <button className='border-white border-2 p-2 rounded-xl'>
          Chunkify
        </button>
      </form>
        ) : (
            <ul className='flex flex-grid grid-cols-3 -gap-4'>
            {/* {
              chunks && chunks.map(
                (chunk, index) => (
                  <li
                    key={index}
                    className='text-2xl col-span-1 card p-4 rounded-xl'
                  >
                    {chunk}
                  </li>
                )
              )
            } */}
             {JSON.stringify(chunks)}
            </ul>
        )
      }
    </main>
  )
}

export default App