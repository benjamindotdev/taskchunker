/* eslint-disable react/prop-types */
const ChunkButton = ({children, onClick}) => {
    return (
        <button
            className='bg-zinc-900 p-2 rounded-xl flex items-center justify-center w-12 h-12 hover:border-2 hover:border-orange-600 transition-all'
            onClick={onClick}>
            {children}
        </button>
    )
}

export default ChunkButton;