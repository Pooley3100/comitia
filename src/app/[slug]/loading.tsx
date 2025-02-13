const Loading = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center flex-col">
      <p className="text-5xl text-black">Loading</p>
      <div className="w-64 h-4 bg-gray-200 mt-4">
        <div className="h-full bg-gray-500 animate-pulse"></div>
      </div>
    </div>
  )
}

export default Loading