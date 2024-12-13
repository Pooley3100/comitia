'use client'

import { OptionSchema, PollFieldProps } from '@/library/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'

const PollOptions: React.FC<PollFieldProps> = ({
    type,
    register,
    error,
    name,
    control
}) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "options", // unique name for your Field Array
        rules: { minLength: 2, required: "Please create at least two options" }
    });
    const onClick = () => {
        append({
            option: ''
        })
    }
    return (
        <>
            <h2 className='text-lg'>PollOptions</h2>
            <div className='h-[150px] overflow-y-scroll flex items-center flex-col gap-5'>
                {fields.length < 3 ? fields.map((field, index) => (
                    <input
                        key={field.id} // important to include key with field's id
                        placeholder='New Option'
                        className='rounded-lg'
                        {...register(`options.${index}.option`)}
                    />
                )) :
                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-col gap-2'>
                            {fields.slice(0, fields.length / 2).map((field, index) => (
                                <input
                                    key={field.id} // important to include key with field's id
                                    placeholder='New Option'
                                    className='rounded-lg'
                                    {...register(`options.${index}.option`)}
                                />
                            ))}
                        </div>
                        <div className='flex flex-col gap-2'>
                        {fields.slice(fields.length / 2, fields.length).map((field, index) => (
                            <input
                                key={field.id} // important to include key with field's id
                                placeholder='New Option'
                                className='rounded-lg'
                                {...register(`options.${index}.option`)}
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