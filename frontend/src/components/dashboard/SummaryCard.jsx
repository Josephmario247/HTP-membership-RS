import React from 'react'

const SummaryCard = ({icons, text, number, color}) => {
  return (
    <div className='rounded flex bg-white'>
        <div className={`text-xl md:text-3xl w-auto h-auto flex rounded-md justify-center items-center ${color} text-white px-4`}>
            {icons}
        </div>
        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold'>{text}</p>
            <p className='text-xl font-bold'>{number}</p>
        </div>
    </div>
  )
}
 
export default SummaryCard