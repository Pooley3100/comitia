
const Navbar = () => {
    return (
        <div className='w-full h-[100px] bg-yellow-400 flex flex-row shadow-xl items-center justify-center text-black'>
            <div className="md:w-2/5 w-0"></div>
            <a className="xl:pl-0 pl-5 font-roman text-center text-6xl" href="/">Comitia</a>
            <div className="md:w-2/5 flex justify-end"><a href="/create" className="bg-slate-200 rounded-md text-xl p-3 mr-7 shadow-md font-roman hover:bg-slate-400">Create Query</a></div>
        </div>
    )
}

export default Navbar