import { Link } from "react-router-dom"
export default function SiteHeader(){
    return(
        <header class="pb-6 bg-white lg:pb-0">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* <!-- lg+ --> */}
                <nav class="flex items-center justify-between h-16 lg:h-20">
                    <div class="flex-shrink-0">
                        <Link to="../">
                            <img class="w-auto h-8 lg:h-10" src="https://capx.live/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.839a2952.png&w=128&q=75" alt="" />
                        </Link>
                    </div>

                    {/* <button type="button" class="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">

                        <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>


                        <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> */}
                    <a href="#" title="" class="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button"> Get started now </a>
                </nav>

                
            </div>
        </header>

    )
}