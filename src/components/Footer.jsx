import React from 'react'


const Footer = () => {
  
    return (
    <footer className="bg-indigo-600 text-white p-4 mt-5">
      <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <img src='https://i.postimg.cc/y8JLxcQ1/job-seeker.png' className='h-30' />
                    <h3 className="text-xl font-bold">JobQuest</h3>
                    <p className="text-white inline-block">Your career tracking companion</p>
            </div>
            <div className="flex space-x-6">
                © {new Date().getFullYear()} JobQuest. All rights reserved.
            </div>
        </div>
        </div>
    </footer>

  )
}
export default Footer;