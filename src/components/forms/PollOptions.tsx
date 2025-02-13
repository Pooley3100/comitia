'use client'

import {PollFieldProps } from '@/library/types'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const PollOptions: React.FC<PollFieldProps> = ({
    register,
    error,
}) => {
    const { fields, append } = useFieldArray({
        name: "options",
    });
    const onClick = () => {
        append([
            'Option',
        ])
    }
    return (
        <>
            <h2 className='text-lg'>PollOptions</h2>
            <div className='h-[150px] overflow-y-scroll flex items-center flex-col gap-5'>
                {fields.length < 3 ? fields.map((field, index) => (
                    <div key={field.id}>
                    <input     
                        placeholder='New Option'
                        className='rounded-lg'
                        {...register(`options.${index}`)}          
                    />
                    {(Array.isArray(error) && error[index]) && <span className="text-red text-sm">{error[index].option.message}</span>}
                    </div>
                )) :
                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-col gap-2'>
                            {fields.slice(0, fields.length / 2).map((field, index) => (
                                <input
                                    key={field.id} // important to include key with field's id
                                    placeholder='New Option'
                                    className='rounded-lg'
                                    {...register(`options.${index}`)}
                                />
                            ))}
                        </div>
                        <div className='flex flex-col gap-2'>
                        {fields.slice(fields.length / 2, fields.length).map((field, index) => (
                            <input
                                key={field.id} // important to include key with field's id
                                placeholder='New Option'
                                className='rounded-lg'
                                {...register(`options.${index}`)}
                            />
                        ))}
                        </div>
                    </div>
                }

            </div>
            <button type='button' onClick={onClick} className='text-lg'>Add More Options</button>
            {error && <span className="text-red text-sm">{error.message}</span>}
        </>)
}

export default PollOptions