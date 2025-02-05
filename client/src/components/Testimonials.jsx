import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from 'framer-motion';


const Testimonials = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y: 100}}
    animate={{opacity:1}}
    transition={{delay:1, y:0}} 
    viewport={{once:true}} 
    className='flex flex-col items-center justify-center my-20 py-6'>
      
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Testimonials</h1>
      <p className='tetx-gray-500 mb-12'>Turn your imagination into visuals</p>

      <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((testimonial, index) => (
            <div key={index} className='bg-white/20 rounded-lg p-12 shadow-order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                <div>
                    <img src={testimonial.image} alt="" className="w-14 rounded-full"/>
                    <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                    <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                    <div className='flex mb-4'>
                        {Array(testimonial.stars).fill().map((item, inex)=>(
                            <img key={index} src={assets.rating_star} alt=""/>
                        ))}
                    </div>
                    <p className='text-cente r text-sm text-gray-600'>{testimonial.text}</p>
                </div>
            </div>

        )) }
      </div>
    </motion.div>
  )
}

export default Testimonials
