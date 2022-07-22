/* eslint-disable no-trailing-spaces */
/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {useAppSelector} from '../../../app/hooks';
import {useParams} from 'react-router-dom';
import {
  Container,
  Typography,
} from '@material-ui/core';
// import SplitPane from '../../components/SplitPane';
// import HeroBanner from '../../components/HeroBanner';
import {titleCase} from '../../../../../utils/arrays';
import {selectEventData} from '../../ticketing/ticketingSlice';
// import TicketPicker from '../../ticketing/TicketPicker';
// import ScrollToTop from '../../components/ScrollToTop';

type EventPageProps = {eventid: string}
const EventPage = () => {
  const {eventid} = useParams<EventPageProps>();
  const eventData = useAppSelector((state) => selectEventData(state, eventid));
  if (eventData === undefined) return <p>Whoops! Event not found</p>;
  const {title} = eventData;

  return (
    <main>
      <Typography variant='h2' component='h1'>{titleCase(title)}</Typography>
      <Container maxWidth='md'>
        <section style={{paddingTop: '50vh'}}>
        
          {/* <SplitPane spacing={10}
            left={
              <div >
                <section>
                  <Typography component="h2" variant="h5">
                                        Event Description
                  </Typography>
                  <Typography variant='body1'>{(description) ? description : ''}</Typography>
                </section>
                <section>
                  <Typography component="h2" variant="h5">
                                        Concessions Tickets
                  </Typography>
                  <Typography variant='body1'>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, numquam. Harum, magni nostrum, incidunt dolores quia quo placeat libero molestiae totam cum reprehenderit, accusantium facilis adipisci ad mollitia rerum accusamus!
                  </Typography>
                </section>
              </div>
            }
            right={
              <div>
                <Typography component='h2' variant='h5'>
                    Select Tickets
                </Typography>
                <TicketPicker tickets={tickets} />
              </div>
            }
        /> */}
        </section>
      </Container>
    </main>
  );
};
export default EventPage;

