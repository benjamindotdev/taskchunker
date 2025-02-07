/* eslint-disable react/prop-types */

import { useState} from 'react'
import { Pencil, Check } from 'lucide-react';
import ChunkButton from './ChunkButton';

const ChunkCard = ({ chunk, handleChunkSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPrompt, setEditedPrompt] = useState('');
    const handleEdit = () => {
        console.log('edit:', chunk);
        setIsEditing(!isEditing);
        editedPrompt ? setEditedPrompt(chunk.description) : setEditedPrompt('');
    }

    const handleInputChange = (e) => {
        console.log('input:', e.target.value);
        setEditedPrompt(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChunkSubmit(e, editedPrompt === '' ? chunk.description : editedPrompt)
        setEditedPrompt('');
        setIsEditing(false);
    }

    return (
        <li
            className='flex flex-col justify-between text-2xl col-span-1 card p-4 rounded-xl border-2 border-white hover:border-orange-600 hover:scale-105'
        >
            {
                isEditing ? (
                    <input
                        onChange={handleInputChange}
                        placeholder={editedPrompt === '' ? chunk.description : editedPrompt}
                        className='text-lg p-2 rounded-xl'
                    />
                ) : (
                    <p className='text-lg'>{chunk.description}</p>
                )
            }
            <div className='flex flex-row gap-4 p-4'>
                <ChunkButton onClick={handleEdit}>
                    <Pencil size={24} />
                </ChunkButton>
                <ChunkButton onClick={handleSubmit}>
                    <Check size={24} />
                </ChunkButton>
            </div>
        </li>
    )

}

export default ChunkCard;

