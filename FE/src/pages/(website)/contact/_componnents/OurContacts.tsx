import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlusG, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';


const OurContacts = () => {
    return (
        <div className="container px-4 relative min-[1200px]:w-[1170px] min-[992px]:w-[970px] min-[768px]:w-[750px]">
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <div className="flex flex-col items-center h-auto text-center mt-[70px]">
                        <div className="mb-8 sm:mb-16" />
                        <p
                            className="text-[14px] highlight max-[1199px]:text-[46px] max-[1199px]:leading-[46px] max-[767px]:text-[34px] max-[767px]:leading-[40px] leading-[20px] uppercase text-[#555]"
                            style={{
                                textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
                                // fontFamily: "'Raleway', sans-serif",
                            }}
                        >
                            our contacts
                        </p>

                        <h1
                            className="text-[40px] highlight max-[1199px]:text-[46px] max-[1199px]:leading-[46px] max-[767px]:text-[34px] max-[767px]:leading-[40px] leading-[70px] font-black uppercase text-black "
                            style={{
                                textShadow: "1px 1px 1px rgba(0, 0, 0, .1)",
                                fontFamily: "'Raleway', sans-serif",
                            }}
                        >
                            we ready for your questions

                        </h1>
                        <div className="p-[20px_0] title-underline h-[21px] ">
                            <span className="w-[55px]  text-[#c2d805] h-[1px] bg-current inline-block align-top relative"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-y-10 min-[768px]:grid-cols-4 mt-[50px]">
                <div className="text-center px-4">
                    <div className="mb-[10px] mx-auto">
                        <img
                            className="mx-auto highlight"
                            src="/src/assets/icons/address.png"
                            alt="address"
                        />
                    </div>
                    <div
                        className="mb-[15px] highlight text-[13px] leading-[18px] text-[#343434] font-black uppercase"
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                        }}
                    >
                        address
                    </div>
                    <div className="text-[#888] highlight text-[13px] leading-[20px] ">
                        1st, new york, usa
                    </div>
                    <div>

                    </div>
                </div>

                <div className="text-center px-4">
                    <div className="mb-[10px] mx-auto">
                        <img
                            className="mx-auto highlight"
                            src="/src/assets/icons/phone.png"
                            alt="phone"
                        />
                    </div>
                    <div
                        className="mb-[15px] highlight text-[13px] leading-[18px] text-[#343434] font-black uppercase"
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                        }}
                    >
                        phone
                    </div>
                    <div className="text-[#888] highlight text-[13px] leading-[20px] ">
                        +3 (523) 555 123 8745
                    </div>
                    <div className="text-[#888] highlight text-[13px] leading-[20px] ">
                        +3 (523) 555 758 5238
                    </div>
                    <div>

                    </div>
                </div>

                <div className="text-center px-4">
                    <div className="mb-[10px] mx-auto">
                        <img
                            className="mx-auto highlight"
                            src="/src/assets/icons/Email.png"
                            alt="email"
                        />
                    </div>
                    <div
                        className="mb-[15px] highlight text-[13px] leading-[18px] text-[#343434] font-black uppercase"
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                        }}
                    >
                        email
                    </div>
                    <div className="text-[#888] highlight text-[13px] leading-[20px] ">
                        offce@exzo.com
                    </div>
                    <div>

                    </div>
                </div>

                <div className="text-center px-4">
                    <div className="mb-[10px] mx-auto">
                        <img
                            className="mx-auto highlight"
                            src="/src/assets/icons/flower.png"
                            alt="follow"
                        />
                    </div>
                    <div
                        className="mb-[15px] highlight text-[13px] leading-[18px] text-[#343434] font-black uppercase"
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                        }}
                    >
                        Follow us
                    </div>

                    <div className="flex space-x-4 justify-center items-center">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="text-[#555] hover:text-white hover:bg-[#b8cd06] transition-colors duration-300 w-5 h-5 rounded-full p-1 bg-[#d3d3d3]"
                        />
                        <FontAwesomeIcon
                            icon={faTwitter}
                            className="text-[#555] hover:text-white hover:bg-[#b8cd06] transition-colors duration-300 w-5 h-5 rounded-full p-1 bg-[#d3d3d3]"
                        />
                        <FontAwesomeIcon
                            icon={faLinkedinIn}
                            className="text-[#555] hover:text-white hover:bg-[#b8cd06] transition-colors duration-300 w-5 h-5 rounded-full p-1 bg-[#d3d3d3]"
                        />
                        <FontAwesomeIcon
                            icon={faGooglePlusG}
                            className="text-[#555] hover:text-white hover:bg-[#b8cd06] transition-colors duration-300 w-5 h-5 rounded-full p-1 bg-[#d3d3d3]"
                        />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default OurContacts