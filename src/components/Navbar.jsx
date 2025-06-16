import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white' >
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-15">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
          </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contect</a>
        </li>
      </ul> */}
      <button className='flex items-center'>
        <img className='invert p-5' src="icons/github.svg" alt="" srcset="" />
      </button>
      </div>
    </nav>
  )
}

export default Navbar
