import React, {ReactElement} from 'react';

/**
 * The intro text for the donation page
 *
 * @returns {ReactElement}
 */
export default function DonationIntro(): ReactElement {
  return (
    <div>
      <div className='py-1'>
        <p className='py-2'>Dear Friends,</p>
        <p className='py-2'>
          I am eternally grateful for my relationship with Portland Playhouse.
          As their 15th Anniversary Season comes to a close,
          <b>
            I ask that you consider deepening your support of this organization
            and the artists who create here.
          </b>
        </p>
        <p className='py-2'>
          I&lsquo;ve felt so supported by the way the Playhouse runs their
          business. Talk is cheap, right? But when a situation comes up to where
          that talk has to be put into action,
          <b>
            Portland Playhouse lives their values and puts the individual first.
          </b>
        </p>
        <p className='py-2'>
          They&lsquo;ve created an environment where artists can show up as
          their whole selves. I don&lsquo;t have to leave pieces of my life at
          the stage door. My husband and daughter are welcome in rehearsals, and
          I see the children of other actors around, playing or doing their
          homework. It&lsquo;s not chaotic or unprofessional. Your
          family&lsquo;s there and the work still gets done.
        </p>
        <p className='py-2'>
          <b>
            As an institution, they speak from a place of trust and they hold on
            to their word.
          </b>
          If they don&lsquo;t get it right, they ask - where did we mess up? How
          can we do better? How can we move forward? Thats what I love about
          them. Tey are forever evolving, forever growing.
        </p>
        <p className='py-2'>
          <b>
            Please help Portland Playhouse continue to grow by donating
            generously today.
          </b>
        </p>
        <p className='py-2'>Sincerely,</p>
        <p className='py-2'>
          Cycerli Ash-Barlocker Recently seen as Scrooge in{' '}
          <i>A Christmas Carol</i>, Evie in
          <i> What I Learned in Paris</i>, and as the director of
          <i> Chicken & Biscuits</i>
        </p>
        <p className='py-2'>
          *Gifts made by June 30th will be matched up to $40,000 by our friends
          at
          <b> the Raymond Family Foundation!</b>
        </p>
      </div>
    </div>
  );
}
