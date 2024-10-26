import Link from 'next/link';

export default function Custom404() {
    return (
    
        <div className='text-center my-20'>
            <h1 className='text-9xl font-extrabold py-8 bg-gradient-to-t from-blue-950 via-blue-500 to-blue-700 bg-clip-text text-transparent'>Oops !</h1>
            <h2 className='text-3xl leading-10 text-blue-600 py-3 font-extrabold'>404 - Page Not Found</h2>
            <p className='font-medium text-base py-2'> The page you are looking for has disappeared.</p>
            <div className='flex gap-3 my-4 justify-center'>
                <button onClick={() => window.history.back()}>
                    <p className="py-2 px-4 block border border-[#2563eb] bg-white rounded-lg text-black text-sm transition-all duration-300 ease-in-out">Go back to Previous page</p>
                </button>
                <Link href="/" className='py-2 px-4 block bg-[#2563eb] rounded-lg text-white text-sm font-medium hover:transition-all duration-300 ease-in-out'>
                    Go back home
                </Link>
            </div>
        </div>
            
        
    );
}
