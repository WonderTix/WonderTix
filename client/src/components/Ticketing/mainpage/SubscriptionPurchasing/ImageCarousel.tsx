import React, {ReactElement, useEffect, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {MobileStepper} from '@mui/material';
import {FormButton} from '../../ticketingmanager/Event/components/FormButton';
import {BackIcon, ForwardArrow} from '../../Icons';

interface ImageCarouselProps {
  children: JSX.Element[];
  setAnchor: (value) => void;
}

export const ImageCarousel = (props: ImageCarouselProps): ReactElement => {
  const {children, setAnchor} = props;
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = children.length;

  useEffect(() => {
    setActiveStep(0);
  }, [children.length]);

  const setActiveStepAndAnchor = (step: number) => {
    setActiveStep(step);
    setAnchor((prev) => prev.map(() => null));
  };

  return (
    <div>
      <SwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
        {children}
      </SwipeableViews>
      <MobileStepper
        position='static'
        activeStep={activeStep}
        sx={{
          color: 'white',
          background: 'none',
          justifyContent: 'center',
        }}
        backButton={
          <FormButton
            className='pr-2 disabled:text-gray-300 disabled:opacity-50 transition-all ease-in-out duration-300'
            disabled={activeStep === 0}
            testID='carousel-back-button'
            title='back'
            onClick={() => setActiveStepAndAnchor(activeStep - 1)}
          >
            <BackIcon />
          </FormButton>
        }
        nextButton={
          <FormButton
            className='pl-2 disabled:text-gray-300 disabled:opacity-50 transition-all ease-in-out duration-300'
            disabled={activeStep === maxSteps - 1}
            testID='carousel-next-button'
            title='next'
            onClick={() => setActiveStepAndAnchor(activeStep + 1)}
          >
            <ForwardArrow />
          </FormButton>
        }
        steps={maxSteps}
      />
    </div>
  );
};
