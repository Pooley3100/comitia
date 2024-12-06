import { useRouter } from "next/navigation";

const Public = ({ url }: { url: string | null }) => {
    const router = useRouter();
    function directToSite(publicBool: boolean) {
        if (publicBool) {
           
        } else {
            
        }
        router.push(url || '/'); // Replace '/' with the default URL if `url` is null
    }


return (
    <div className='flex flex-col w-full h-full items-center text-black font-roman text-xl'>
        <h1>Would you like this question to be publically visible?</h1>
        <div className="flex flex-row justify-between gap-10 pt-10">
            <button className='bg-slate-400 rounded-md shardow-md p-4' onClick={() => directToSite(true)}>Yes</button>
            <button className='bg-slate-400 rounded-md shardow-md p-4' onClick={() => directToSite(false)}>No</button>
        </div>
    </div>
)
}

export default Public