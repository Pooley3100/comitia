const Navbar = () => {
  return (
    <div className='w-full h-[100px] bg-yellow-400 items-center flex flex-row shadow-xl text-black'>
        <div className="w-2/5"></div>
        <h1 className="w-1/5 font-roman text-center text-6xl">Comitia</h1>
        <div className="w-2/5 flex justify-end"><p className="bg-slate-200 rounded-md text-xl p-3 mr-7 shadow-md">Create Query</p></div>
    </div>
  )
}

export default Navbar