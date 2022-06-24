/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Instance} from '../v1/events/eventsSlice';
import InstanceCard from './InstanceCard';
import Grid from '@material-ui/core/Grid';
import {titleCase} from '../utils';

export interface InstancesGroupProps {
    eventTitle: string,
    eventDesc?: string,
    image_url: string,
    instances: Instance[],
}
const InstancesGroup = (props: InstancesGroupProps) => {
  const instances = props.instances.map((instance) =>
    <Grid item key={instance.id} xs={12} sm={6} md={4}>
      <InstanceCard
        {...instance}
        image_url={props.image_url}
        eventName={props.eventTitle}
        desc={props.eventDesc}
        id={instance.id.toString()}
      />
    </Grid>,
  );
  return (
    <section>
      <h2>{titleCase(props.eventTitle)}</h2>
      <Grid container spacing={3}>
        {instances}
      </Grid>
    </section>
  );
};

export default InstancesGroup;
