import React, {useEffect, useState} from 'react';
import {getSeasonImageDefault} from '../../../../utils/imageURLValidation';
import {ImageCarousel} from './ImageCarousel';
import {CarouselEvent} from './CarouselEvent';
import {SubscriptionOption} from './SubscriptionOption';
import {SeasonWithSubscriptions} from './SubscriptionPurchaseUtils';

interface SeasonSubscriptionsProps {
  season: SeasonWithSubscriptions;
  setPopUpProps: any;
}

export const SeasonSubscriptions = (props: SeasonSubscriptionsProps) => {
  const {season, setPopUpProps} = props;
  const [anchors, setAnchors] = useState(
    Array(season.events.length).fill(null),
  );

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setAnchors((prev) => prev.map(() => null));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    return () => document.removeEventListener('keydown', handleEscape, false);
  }, []);

  return (
    <main
      className='bg-fixed bg-cover'
      style={{
        backgroundImage: `url(${getSeasonImageDefault(
          season.imageurl,
        )}),url(${getSeasonImageDefault()})`,
      }}
    >
      <div
        className='flex flex-col justify-center items-center min-h-[calc(100vh-233px)]
                   md:min-h-screen backdrop-blur-sm
                   bg-zinc-900/20 px-[1rem] py-[5rem] tab:px-[2rem]'
      >
        <section className='grid grid-cols-12 bg-zinc-700/60 min-[1700px]:w-[80%] min-[2000px]:w-[70%] p-2 tab:p-5 rounded-xl md:gap-4 mt-10'>
          <header className='col-span-12 text-center text-zinc-200 p-2 pb-0'>
            <h1 className='flex flex-col'>
              <span className='font-medium text-3xl md:text-4xl'>
                {Math.floor(season.startdate / 10000)}
                {' - '}
                {Math.floor(season.enddate / 10000)}
                {' Subscriptions'}
              </span>
              <hr className='h-[2px] my-4 bg-white' />
              <span className='text-3xl md:text-4xl'>{season.name}</span>
            </h1>
          </header>
          <div className='col-span-12 min-[1300px]:col-span-6 flex flex-col pb-2 justify-center'>
            <h2 className='text-white text-xl md:text-2xl text-center pb-2'>
              What&apos;s on stage?
            </h2>
            <ImageCarousel setAnchor={setAnchors}>
              {season.events.map((event, index) => (
                <CarouselEvent
                  key={event.eventid}
                  event={event}
                  anchor={anchors[index]}
                  setAnchor={(value) =>
                    setAnchors(
                      anchors.map((current, anchorIndex) =>
                        index === anchorIndex ? value : current,
                      ),
                    )
                  }
                />
              ))}
            </ImageCarousel>
          </div>
          <div
            className={`col-span-12 min-[1300px]:col-span-6 flex flex-col gap-3 overflow-y-scroll
                        ${
                          season.seasonsubscriptiontypes.length > 3
                            ? 'pt-4 max-[1300px]'
                            : ''
                        }justify-center max-lg:mb-4 items-center min-[1300px]:max-h-[400px]`}
          >
            {season.seasonsubscriptiontypes.map((option) => (
              <SubscriptionOption
                key={`${option.seasonid_fk}-${option.subscriptiontypeid_fk}`}
                setPopUpProps={setPopUpProps}
                option={option}
                season={season}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
