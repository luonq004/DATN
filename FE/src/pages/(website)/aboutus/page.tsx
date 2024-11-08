//images
import client_logo_1 from '@/assets/images/client-logo-1.jpg'
import client_logo_2 from '@/assets/images/client-logo-2.jpg'
import bg_25 from '@/assets/images/background-25.jpg'
import thum_38 from '@/assets/images/thumbnail-38.jpg';

//ohter
import About_Us_Bg from '@/assets/images/about-us-bg.jpg'
import SlideShow from './_components/SlideShow'
import SlideOurTeam from './_components/SlideOurTeam'
import { Link } from 'react-router-dom'

const AboutUsPage = () => {
    return (
        <>
            <section style={{ backgroundImage: `url(${About_Us_Bg})` }} className='min-h-[600px] bg-cover bg-fixed bg-center bg-no-repeat text-white grid place-items-center'>
                <div className='grid place-items-center max-w-[650px] text-center gap-3 px-5'>
                    <span className='uppercase text-[34px] ms:text-[40px] font-bold'>we are fabricfocus</span>
                    <div className='h-2'>
                        <span className="w-14 h-[1px] inline-block align-top bg-white relative before:absolute before:content-[''] before:w-2 before:h-[1px] before:bg-white before:-left-3 before:top-0 after:absolute after:content-[''] after:w-2 after:h-[1px] after:bg-white after:-right-3 after:top-0"></span>
                    </div>
                    <span className=''>
                        We believe fashion is not just about what you wear, but about how you express yourself and tell your story.
                    </span>
                </div>
            </section >
            <section className='w-full md:w-[730px] lg:w-[950px] xl:w-[1160px] mx-auto pt-24 px-4'>
                <div className='w-full grid lg:grid-cols-[500px_auto] gap-x-4'>
                    <div className='grid'>
                        <span className='uppercase'>about us</span>
                        <span className='uppercase text-[34px] ms:text-[40px] font-bold'>we are fabricfocus</span>
                        <div className='h-3'>
                            <span className="w-14 h-[1px] inline-block align-top bg-black relative before:absolute after:absolute after:content-[''] after:w-2 after:h-[1px] after:bg-black after:-right-3 after:top-0"></span>
                        </div>
                        <span>Founded with a passion for modern fashion, FabricFocus is committed to providing unique apparel.</span>
                    </div>
                    <div className='grid gap-y-4 text-[#888] text-sm'>
                        <span>
                            At FabricFocus, we pay attention to every little detail to ensure that each product is flawless when it reaches you. From fabric selection and color choices to stitching, we are committed to delivering comfort and durability. In pursuit of sustainable fashion, we select eco-friendly materials, so that our products not only make you look good but also contribute to a better planet.
                        </span>
                        <span>
                            Whether you prefer a classy, dynamic, or minimalist look, we have designs tailored just for you. FabricFocus’s mission is to help you feel confident in every moment, whether you're walking down the street, working at the office, or attending a special event.
                        </span>
                    </div>
                </div>
            </section>
            <section className={`w-full md:w-[730px] lg:w-[950px] xl:w-[1160px] mx-auto pt-24 px-4`}>
                <SlideShow />
            </section>
            <section className={`max-w-[1408px] mx-auto pt-[140px] px-4 flex flex-col gap-y-16`}>
                <div className='grid place-items-center max-w-[650px] text-center gap-3 px-5 mx-auto'>
                    <span className='uppercase text-[#555]'>our team</span>
                    <span className='uppercase text-[34px] ms:text-[40px] font-bold'>
                        meet with professionals
                    </span>
                    <div className='h-2'>
                        <span className="w-14 h-[1px] inline-block align-top bg-[#c2d805] relative before:absolute before:content-[''] before:w-2 before:h-[1px] before:bg-[#c2d805] before:-left-3 before:top-0 after:absolute after:content-[''] after:w-2 after:h-[1px] after:bg-[#c2d805] after:-right-3 after:top-0"></span>
                    </div>
                </div>
                <div className='w-full md:w-[730px] lg:w-[950px] xl:w-[1160px] mx-auto px-4'>
                    <SlideOurTeam />
                </div>
            </section>
            <section className={`w-full md:w-[730px] lg:w-[950px] xl:w-[1160px] mx-auto pt-[140px] px-4 flex flex-col gap-y-16`}>
                <div className='grid place-items-center max-w-[650px] text-center gap-3 px-5 mx-auto'>
                    <span className='uppercase text-[#555]'>our brands</span>
                    <span className='uppercase text-[34px] ms:text-[40px] font-bold'>
                        best of the best
                    </span>
                    <div className='h-2'>
                        <span className="w-14 h-[1px] inline-block align-top bg-[#c2d805] relative before:absolute before:content-[''] before:w-2 before:h-[1px] before:bg-[#c2d805] before:-left-3 before:top-0 after:absolute after:content-[''] after:w-2 after:h-[1px] after:bg-[#c2d805] after:-right-3 after:top-0"></span>
                    </div>
                </div>
                <div className='Client_Logo grid grid-cols-2 grid-rows-5 md:grid-cols-4 md:grid-rows-3 lg:grid-cols-5 lg:grid-rows-2 *:border *:-mt-[1px] *:-mr-[1px]'>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                    <Link to="">
                        <div className='group relative overflow-hidden place-items-center'>
                            <img className='transition-all duration-500 translate-y-0 group-hover:-translate-y-full' src={client_logo_1} alt="client_logo_1" />
                            <img className='absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 translate-y-full group-hover:translate-y-0' src={client_logo_2} alt="client_logo_1" />
                        </div>
                    </Link>
                </div>
            </section>
            <section className={`w-full md:w-[730px] lg:w-[950px] xl:w-[1160px] mx-auto pt-[140px] px-4 grid`}>
                <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center'>
                    <div className='hidden lg:block'>
                        <img src={bg_25} alt="bg_25" />
                    </div>
                    <div className='flex flex-col gap-x-4 gap-y-14'>
                        <div className='Title grid gap-y-3'>
                            <span className='uppercase text-[#555]'>real sound</span>
                            <span className='uppercase text-[34px] ms:text-[40px] font-bold'>
                                feel perfect beat
                            </span>
                            <div className='h-2'>
                                <span className="w-2 h-[1px] inline-block align-top bg-[#c2d805] relative after:absolute after:content-[''] after:w-14 after:h-[1px] after:bg-[#c2d805] after:-right-[3.75rem] after:top-0"></span>
                            </div>
                            <span className='text-[#555]'>
                                In feugiat molestie tortor a malesuada. Etiam a venenatis ipsum. Proin pharetra elit at feugiat commodo vel placerat tincidunt sapien nec
                            </span>
                        </div>
                        <div className='Content_Feel grid gap-y-7'>
                            <div className='flex gap-x-0 md:gap-x-6'>
                                <img className='rounded-xl w-[200px] h-[150px]' src={thum_38} alt="thum38" />
                                <div className='flex flex-col justify-center gap-y-3 text-sm'>
                                    <div className='uppercase font-bold'>
                                        Phasellus rhoncus in nunc sit
                                    </div>
                                    <span className='text-[#555]'>
                                        Etiam mollis tristique mi ac ultrices. Morbi vel neque eget lacus sollicitudin facilisis. Lorem ipsum dolor sit amet semper ante vehicula
                                    </span>
                                </div>
                            </div>
                            <div className='flex gap-x-0 md:gap-x-6'>
                                <img className='rounded-xl w-[200px] h-[150px]' src={thum_38} alt="thum38" />
                                <div className='flex flex-col justify-center gap-y-3 text-sm'>
                                    <div className='uppercase font-bold'>
                                        Phasellus rhoncus in nunc sit
                                    </div>
                                    <span className='text-[#555]'>
                                        Etiam mollis tristique mi ac ultrices. Morbi vel neque eget lacus sollicitudin facilisis. Lorem ipsum dolor sit amet semper ante vehicula
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUsPage