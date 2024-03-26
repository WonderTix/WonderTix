import React, {ReactElement, useEffect, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {MobileStepper} from '@mui/material';
import {FormButton} from '../../ticketingmanager/Event/components/FormButton';
import {BackIcon, ForwardArrow} from '../../Icons';

interface ImageCarousal {
  children: JSX.Element[];
  setAnchor: (value) => void;
}

export const ImageCarousal = (props: ImageCarousal): ReactElement => {
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
            className='pr-2 disabled:hidden'
            disabled={activeStep === 0}
            testID='carousal-back-button'
            title='back'
            onClick={() => setActiveStepAndAnchor(activeStep - 1)}
          >
            <BackIcon />
          </FormButton>
        }
        nextButton={
          <FormButton
            className='pl-2 disabled:hidden'
            disabled={activeStep === maxSteps - 1}
            testID='carousal-next-button'
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
