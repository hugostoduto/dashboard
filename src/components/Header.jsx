import React from 'react'

const header = ({ category, title, }) => {
  return (
    <div className="mb-10">
      <p className="text-gray-400">
        {category}
      </p>
      <div className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </div>
    </div>
  )
}

export default header