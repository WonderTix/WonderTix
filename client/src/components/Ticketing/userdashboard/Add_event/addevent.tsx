/* eslint-disable max-len */
import React from 'react';


const Addevent = () => {
  return (

    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] '>
        <h1 className='font-bold text-5xl mb-14 bg-clip-text text-transparent
         bg-gradient-to-r from-violet-500 to-fuchsia-500   ' >Add New Event</h1>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6 mr-10">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6
                 text-gray-900">Event</h3>
                <p className="mt-1 text-sm text-gray-600">This information will
                 be displayed publicly so be careful what you share.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className="
                        block text-sm font-medium text-gray-700">
                             Event Name </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input type="text" name="company-website"
                            id="company-website"
                            className="focus:ring-indigo-500
                            bg-zinc-100 h-9 pl-4 focus:border-indigo-500 flex-1
                             block w-full rounded-lg sm:text-sm "
                            placeholder="Event Name"/>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="about" className="block text-sm
                       font-medium text-gray-700"> About </label>
                      <div className="mt-1">
                        <textarea id="about" name="about" rows={3}
                          className="shadow-sm focus:ring-indigo-500
                          focus:border-indigo-500 mt-1 block w-full
                           sm:text-sm border pl-4 pt-2 bg-zinc-100
                            rounded-md" placeholder="Event Details"></textarea>
                      </div>
                      <p className="mt-2 text-sm
                       text-gray-500">Brief description for the event</p>
                    </div>
                    <div>
                      <label className="block text-sm
                       font-medium text-gray-700"> Flyer photo </label>
                      <div className="mt-1 flex justify-center
                       px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed
                        rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12
                           text-gray-400" stroke="currentColor"
                          fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0
                             0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8
                              32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6 mr-10">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Ticketing Details</h3>
                <p className="mt-1 text-sm text-gray-600">Add ticketing prices and details</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="tickets-number" className="block text-sm font-medium text-gray-700">Number of Tickets</label>
                        <input type="text" name="tickets-number" id="tickets-number" data-autocomplete="given-name" className="mt-1 focus:ring-indigo-500 bg-zinc-100 h-9 pl-4 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>


                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700"> Original Price of One Ticket</label>
                        <input type="text" name="price" id="price" data-autocomplete="email" className="mt-1 focus:ring-indigo-500 bg-zinc-100 h-9 pl-4 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Price Choices</label>
                        <select id="country" name="country" data-autocomplete="country-name" className="mt-1 block w-full py-2 px-3 border  bg-zinc-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option>Free</option>
                          <option>Original Price</option>
                          <option>Both Original Price & Free </option>
                        </select>
                      </div>

                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200 "></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0 mb-12">
          <div className="md:grid md:grid-cols-3 md:gap-6 mr-10">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Date & Time</h3>
                <p className="mt-1 text-sm text-gray-600">Decide which dates and time of the event</p>
              </div>


            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <div className="text-base font-medium text-gray-900" aria-hidden="true">Number of days</div>
                      <div className="col-span-6 sm:col-span-4">
                        <input type="numberdays" name="numberdays" id="numberdays" data-autocomplete="numberdays" className="mt-1 focus:ring-indigo-500 bg-zinc-100 h-9 pl-4 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      </div>
                      <div className='flex flex-col my-2'>
                        <label className=' hover:text-indigo-600 font-medium text-gray-900 rounded-full py-2  my-1'>Pick a Date</label>
                        <input className='bg-zinc-100 text-gray-600 text-center  content-center rounded-lg py-2 px-4' type="date" />
                      </div>

                      <label className=' hover:text-indigo-600  rounded-full py-2  my-1 text-base font-medium text-gray-900'>Pick a Time</label>
                      <div className="mt-2 p-2 w-40 bg-zinc-100 rounded-xl">
                        <div className='flex flex-col my-2 text-zinc-600' >
                          <div className="flex">
                            <select name="hours" className="bg-transparent mr-3 ml-1 text-lg appearance-none outline-none">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">10</option>
                              <option value="12">12</option>
                            </select>
                            <span className="text-xl mr-2">:</span>
                            <select name="minutes" className="bg-transparent text-lg appearance-none outline-none mr-4">
                              <option value="0">00</option>
                              <option value="30">30</option>
                            </select>
                            <select name="ampm" className="bg-transparent text-lg appearance-none outline-none">
                              <option value="am">AM</option>
                              <option value="pm">PM</option>
                            </select>
                          </div>
                        </div>
                      </div>


                    </fieldset>

                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Addevent;
