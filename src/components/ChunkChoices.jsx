/* eslint-disable react/prop-types */
import ChunkCard from './components/ChunkCard';

const ChunkChoices = ({ chunks, onChunkClick }) => {
    return (
        <>
            <h1 className='text text-orange-400'>Choose your next step</h1>
            <ul className='flex flex-row gap-12'>
            {
                chunks.map(
                (chunk, index) => (
                    <ChunkCard
                    chunk={chunk}
                    key={index}
                    handleChunkSubmit={onChunkClick}
                    />
                )
                )
            }
            </ul>
        </>
    )
}

export default ChunkChoices;