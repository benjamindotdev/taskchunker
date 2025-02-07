import { useState, useEffect, Suspense } from 'react'
import axios from 'axios';
import Loading from "./components/Loading";

import ChunkCard from './components/ChunkCard';


import './App.css'

function App() {

  const [initialPrompt, setInitialPrompt] = useState({});
  const [chunks, setChunks] = useState([]);
  const [previousChunks, setPreviousChunks] = useState([]);

  const [isLoadingChunks, setIsLoadingChunks] = useState(false);

  useEffect(() => {
    console.log('chunks:', chunks.response);
  }, [chunks]);

  const serverUrl = 'https://taskchunker-backend-production.up.railway.app/api/v1/chat';

  const handleInitialPromptChange = (e) => {
    setInitialPrompt(e.target.value)
  }

  const handleChunkSubmit = async (e, prompt) => {
    e.preventDefault();
    console.log('task:', prompt);
    setIsLoadingChunks(true);
    try {
      const response = await axios.post(`${serverUrl}`, { "message": prompt });
      console.log('response:', response);
      if (initialPrompt !== prompt) {
        setPreviousChunks([...previousChunks, prompt]);
      }
      setChunks(response.data.next_actions);
    } catch (error) {
      console.error('error:', error);
      setIsLoadingChunks(false);
    }
  }

  return (
    <main className='bg-zinc-800 h-screen w-full p-6 text-zinc-100 flex flex-col items-center justify-center gap-12'>
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-7xl bg-gradient-to-r from-orange-600 via-purple-500 to-blue-400 inline-block text-transparent bg-clip-text'>Taskchunker</h1>
      <h2 className='text-2xl text-blue-400'>Build big. Start small.</h2>
    </div>
      {
        !isLoadingChunks ? (
          <form
        className="flex flex-col gap-4 w-full p-6"
        onSubmit={(e) => handleChunkSubmit(e, initialPrompt)}
      >
        <textarea
        className='text-zinc-900 p-2 rounded-xl w-full'
          label={'What do you want to do?'}
          onChange={handleInitialPromptChange}
        />
        <button className='border-white border-2 p-2 rounded-xl'>
          Chunkify
        </button>
      </form>
        ) : (
          <div className='flex flex-col gap-4'>
          <Suspense fallback={<Loading /> }>
          <ul>
            {
              previousChunks && previousChunks.map(
                (chunk, index) => (
                  <li key={index}><em className='text-blue-400'>Step {index+1} =&gt; </em> {chunk}</li>
                )
              )
            }
          </ul>
            <h1 className='text text-orange-400'>Choose your next step</h1>
            <ul className='flex flex-grid grid-cols-3 gap-4'>
            {
              chunks && chunks.map(
                (chunk, index) => (
                  <ChunkCard
                    chunk={chunk}
                    key={index}
                    handleChunkSubmit={handleChunkSubmit}
                  />
                )
              )
            }
            </ul>
            </Suspense>
          </div>
        )
      }
    </main>
  )
}

export default App