import React from 'react'


function Footer() {
  
    return (
    <footer className="bg-indigo-600 text-white p-4 mt-5">
      <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <img src='public/job-seeker.png' className='h-30 inline-block' />
                    <h3 className="text-xl font-bold">  InterviewPrep </h3>
                    <p className="text-white inline-block">Your career tracking companion</p>
            </div>
            <div className="flex space-x-6">
                © {new Date().getFullYear()} InterviewPrep. All rights reserved.
            </div>
        </div>
        </div>
    </footer>

  )
}
export default Footer;