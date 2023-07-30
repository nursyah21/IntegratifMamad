export default function Loading({visible=false,message="Loading..."}){
    return <>
        {visible ?
            <div className='absolute bg-white z-60 top-0 left-0 flex h-screen w-screen justify-center items-center'>
                <h1 className='text-lg'>
                
                {message}
                </h1>
            </div> : null
        }
    </>
  }