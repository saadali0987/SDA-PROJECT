'use client'

import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';

function UploadImages({setReferenceImage, referenceImage}) {
    const [original, setOriginal] = useState('')
  return (
    <CldUploadWidget uploadPreset="fastlink" onSuccess={({event, info}) =>{
        console.log(event)
        console.log(info)
        setReferenceImage((e)=>info.secure_url)
        setOriginal((e)=>info.original_filename)
    }}>
        {({open})=>(<>
            <button onClick={()=>open()} className='bg-red-500 p-2 rounded-md'>Upload</button>
            {original && <p>{original}</p>} 
        </>)}
    </CldUploadWidget>
  )
}

export default UploadImages 