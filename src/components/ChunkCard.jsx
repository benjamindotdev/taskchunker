/* eslint-disable react/prop-types */
import { Pencil, Check } from 'lucide-react';
import ChunkButton from './ChunkButton';

const ChunkCard = ({ chunk, handleChunkSubmit }) => {
    const handleEdit = () => {
        console.log('edit:', chunk);
    }

    return (
        <li
            className='flex flex-col justify-between text-2xl col-span-1 card p-4 rounded-xl border-2 border-white hover:border-orange-600 hover:scale-105'
        >
            <p className='text-lg'>{chunk.description}</p>
            <div className='flex flex-row gap-4 p-4'>
                <ChunkButton onClick={handleEdit}>
                    <Pencil size={24} />
                </ChunkButton>
                <ChunkButton onClick={(e) => handleChunkSubmit(e, chunk.description)}>
                    <Check size={24} />
                </ChunkButton>
            </div>
        </li>
    )

}

export default ChunkCard;

