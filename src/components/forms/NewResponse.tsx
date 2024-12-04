import { ResponseData, ResponseSchema, ValidResponseFieldName } from '@/library/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const NewResponse = ({ formSet }: { formSet: () => void }) => {
    useEffect(() => {
        // Disable scrolling when the component is mounted
        document.body.style.overflow = 'hidden';
        return () => {
            // Enable scrolling when the component is unmounted
            document.body.style.overflow = 'auto';
        };
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ResponseData>({ resolver: zodResolver(ResponseSchema) });

    const onSubmit = async (data: ResponseData) => {
        console.log("SUCCESS CLIENT SIDE", data);

        //Un-Mount form Component
        formSet();
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='pb-2 flex w-full justify-end'>
                        <h2 className="text-2xl font-bold mb-4">New Response</h2>
                    <button className='bg-blue-400 p-1 rounded-md' onClick={formSet}>Close</button>
                    </div>

                    <label className="block mb-2">
                        Name (If blank will be Anonymous):
                        <input
                            placeholder='Optional'
                            {...register("name")}
                            type="text"
                            name="name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                        />
                        {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                    </label>
                    <label className="block mb-4">
                        Response:
                        <input
                            {...register("response")}
                            type="text"
                            name="response"
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                        />
                        {errors.response && <span className="text-red-400 text-sm">{errors.response.message}</span>}
                    </label>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewResponse;