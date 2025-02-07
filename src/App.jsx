import { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from "./components/Loading";
import ChunkCard from './components/ChunkCard';
import './App.css'

function App() {

  const [conversationId, setConversationId] = useState('');

  useEffect(() => {
    if(conversationId === '') {
      const storedConversationId = localStorage.getItem('conversationId');
      if(storedConversationId) {
        setConversationId(storedConversationId);
      }
    } else {
      localStorage.setItem('conversationId', conversationId);
    }
  }, [conversationId]);

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
      const response = await axios.post(`${serverUrl}`, { "message": prompt, headers: {
        'x-conversation-id': conversationId || ''
      } });
      console.log('response:', response);
      if (initialPrompt !== prompt) {
        setPreviousChunks([...previousChunks, prompt]);
      }
      console.log(response.headers)
      setConversationId(response.headers['x-conversation-id']);
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
        className="flex flex-col gap-4 w-full p-6 items-center justify-center"
        onSubmit={(e) => handleChunkSubmit(e, initialPrompt)}
      >
        <textarea
          className='text-2xl text-zinc-200 bg-zinc-900 font-bold p-6 rounded-xl w-3/4 focus-within:outline-6 border:none focus-within:outline-orange-600 focus-within:order-none'
          label={'What do you want to do?'}
          onChange={handleInitialPromptChange}
        />
        <button className='border-white border-2 p-2 rounded-xl w-1/2 hover:border-orange-600 hover:w-3/4 transition-all'>
          Get chunkin&apos;
        </button>
      </form>
        ) : (
          <div className='flex flex-col gap-4 w-7/8'>
            {
              previousChunks.length > 0 && (
              <ul className='flex flex-col gap-4 max-h-96 overflow-y-auto border-2 rounded-xl p-6 border-zinc-700'>
                {
                   previousChunks.map(
                    (chunk, index) => (
                      <li
                        key={index}
                        className='flex flex-row gap-12 transition-all'
                      ><em className='text-blue-400'>Step {index+1} =&gt; </em> {chunk}</li>
                    )
                  )
                }
              </ul>
              )
            }
            {
              chunks.length > 0 ? (
                <>
                  <h1 className='text text-orange-400'>Choose your next step</h1>
                    <ul className='flex flex-row gap-12'>
                    {
                      chunks.map(
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
                </>
              ) : (
                <Loading />
              )
            }
          </div>
        )
      }
    </main>
  )
}

export default App