import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='mx-64 mt-10'>

            <div className='md:flex items-center justify-between'>
                <div>

                    <h1 className='h-12 text-4xl font-bold text-green-600'>Task Management</h1>

                </div>
                <div className='md:flex items-center gap-8'>

                    <ul className={`md:flex max-sm:bg-[#108826] max-sm:text-white gap-8 text-[#108826] font-semibold absolute md:static 0 max-sm:pl-8 py-2 duration-500`}>
                        <Link to='/'><li className='max-sm:p-3'>Task add</li></Link>
                        <Link to='/alltasks'><li className='max-sm:p-3'>All Tasks</li></Link>

                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Header;