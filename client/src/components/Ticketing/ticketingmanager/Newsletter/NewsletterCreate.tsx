/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, {ReactElement} from 'react';

/**
 * Created Newsletter page
 *
 * @returns {ReactElement}
 */
export default function NewsletterCreate(): ReactElement {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] h-full'>
        <div className='w-full h-full'>
          <h1 className='font-bold text-5xl mb-10 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-red-600'>Newsletter Creation!</h1>
          <hr/>
          <div className='bg-white w-full h-full p-10 shadow-xl rounded-xl'>
            <div className='grid grid-cols-4 gap-2'>
              <div><button className="bg-green-500 text-white w-full py-2 rounded-xl hover:bg-green-600">Add</button> </div>
              <div><button className="bg-yellow-500 text-white w-full py-2 rounded-xl hover:bg-yellow-600" >Preview</button> </div>
              <div><button className="bg-blue-500 text-white w-full py-2 rounded-xl hover:bg-blue-600" >Finish</button> </div>
              <div><button className="bg-red-500 text-white w-full py-2 rounded-xl hover:bg-red-600" >Discard</button> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
