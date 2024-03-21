import React, {ReactElement} from 'react';

/**
 * Footer for the newsletter stuff
 *
 * @returns {ReactElement}
 */
const Footer = (): ReactElement => {
  return (
    <footer className='bg-zinc-300 text-center drop-shadow-lg'>
      <form
        action=''
        className='px-6 pt-6 grid md:grid-cols-3 gap-4 justify-center items-center mb-6'
      >
        <label
          className='md:ml-auto text-gray-800 font-bold'
          htmlFor='newsletter-subscribe-email'
        >
          Sign up for our newsletter
        </label>
        <input
          type='email'
          className='
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded-full
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white
                      focus:border-indigo-600 focus:outline-none
                      '
          id='newsletter-subscribe-email'
          placeholder='Email address'
        />
        <button
          className='inline-block px-6 py-2.5 bg-indigo-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:shadow-lg w-fit
          focus:bg-blue-700 focus:shadow-lg focus:outline-none
          focus:ring-0 active:bg-blue-800 active:shadow-lg
          transition duration-150 ease-in-out mx-auto md:mx-0'
        >
          Subscribe
        </button>
      </form>
      <p className='text-center text-gray-700 p-4'>
        &#169; 2024 Copyright:{' '}
        <a className='text-gray-800' href='https://portlandplayhouse.org/'>
          Portland Playhouse
        </a>
      </p>
    </footer>
  );
};

export default Footer;
