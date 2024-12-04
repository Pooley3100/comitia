
const Navbar = () => {
    return (
        <div className='w-full h-[100px] bg-yellow-400 flex flex-row shadow-xl text-black'>
            <div className="xl:w-2/5 w-0"></div>
            <h1 className="w-1/5 xl:pl-0 pl-5 font-roman text-center text-6xl">Comitia</h1>
            <div className="w-full flex justify-end"><a href="/create" className="bg-slate-200 rounded-md text-xl p-3 mr-7 shadow-md font-roman hover:bg-slate-400">Create Query</a></div>
        </div>
    )
}

export default Navbar