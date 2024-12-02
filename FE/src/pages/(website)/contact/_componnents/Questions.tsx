import React from 'react'

const Questions = () => {
    return (
        <div className="container px-4 relative min-[1200px]:w-[1170px] min-[992px]:w-[970px] min-[768px]:w-[750px]">
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <div className="flex flex-col items-center h-auto text-center">
                        <div className="mb-8 sm:mb-16" />
                        <h1
                            className="text-[18px] highlight max-[1199px]:text-[46px] max-[1199px]:leading-[46px] max-[767px]:text-[34px] max-[767px]:leading-[30px]  leading-[30px] font-black uppercase text-black"
                            style={{
                                textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
                                fontFamily: "'Raleway', sans-serif",
                            }}
                        >
                            have a questions?
                        </h1>
                    </div>
                    <form className='space-y-4 flex flex-col items-center mt-[30px]'>
                        <div className='flex flex-col md:flex-row justify-center gap-4'>
                            <input
                                className='text-[14px] h-[50px] w-full md:w-[467px] border border-[#eee] rounded-full px-8 focus:outline-0 focus:ring-none focus:border-[#b8cd06] focus:ring-[#b8cd06]'
                                type="text"
                                placeholder='Name'
                            />
                            <input
                                className='text-[14px] h-[50px] w-full md:w-[467px] border border-[#eee] rounded-full px-8 focus:outline-0 focus:ring-none focus:border-[#b8cd06] focus:ring-[#b8cd06]'
                                type="text"
                                placeholder='Email'
                            />
                        </div>
                        <div className='flex flex-col md:flex-row justify-center gap-4'>
                            <input
                                className='text-[14px] h-[50px] w-full md:w-[467px] border border-[#eee] rounded-full px-8 focus:outline-0 focus:ring-none focus:border-[#b8cd06] focus:ring-[#b8cd06]'
                                type="text"
                                placeholder='Phone'
                            />
                            <input
                                className='text-[14px] h-[50px] w-full md:w-[467px] border border-[#eee] rounded-full px-8 focus:outline-0 focus:ring-none focus:border-[#b8cd06] focus:ring-[#b8cd06]'
                                type="text"
                                placeholder='Subject'
                            />
                        </div>
                        <div className='flex justify-center'>
                            <textarea
                                className='text-[14px] h-[140px] w-[940px] border border-[#eee] rounded-3xl px-8 focus:outline-none focus:border-[#b8cd06] focus:ring-[#b8cd06]'
                                placeholder='Your message'></textarea>
                        </div>

                        <div>
                            <button className="group relative w-[150px] h-[0px] px-4 py-6 bg-[#b8cd06] text-white rounded-full overflow-hidden mb-[100px]">
                                <span className="absolute inset-0 flex items-center justify-center font-bold text-xs uppercase transition-all duration-200 ease-in-out group-hover:opacity-0">
                                    send message
                                </span>
                                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 ease-in-out transform translate-x-full group-hover:translate-x-0 group-hover:opacity-100 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 md:w-5 md:h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Questions
