import React from 'react';
import {createNewTaskTextFieldLabels} from '../../../utils/arrays';
import SearchBar from './Search';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * @param {any} props Properties to be passed through to TaskForm
 * @returns {React.ReactElement} TaskForm HTML Element
 */
const TaskForm = (props: any): React.ReactElement => {
  // const [beginValue, setBeginValue] = React.useState(null);
  // const [formValues, setFormValues] = React.useState();
  // const [taskId, setTaskId] = React.useState(0);
  // const [parentId, setParentId] = React.useState(0);
  // const [subject, setSubject] = React.useState('');
  // const [parentSubject, setParentSubject] = React.useState('');
  // const [status, setStatus] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(null);
  const [assignTo, setAssignTo] = React.useState('');
  const [relatedRecords, setRelatedRecords] = React.useState();
  // const [description, setDescription] = React.useState('');


  // useEffect(() => {}, [beginValue]);

  /**
   * @returns {void}
   */
  const handleClick = (): void => {
    // console.log(taskId);
    // console.log(parentId);
    // console.log(subject);
    // console.log(parentSubject);
    console.log(dueDate);
    // console.log(status);
    console.log(assignTo);
    console.log(relatedRecords);
    // console.log(description);
    console.log('alskdjflsdf');
  };


  return (
    <form className='border border-zinc-200 rounded-lg p-4 shadow-lg bg-white'>
      <h1>{props.title}</h1>
      <div className='container grid grid-cols-2 gap-2
      items-center justify-start rounded-xl'
      >
        <div>
          <input type="text" placeholder={createNewTaskTextFieldLabels[0].label}
            key={createNewTaskTextFieldLabels[0].label}
            id={createNewTaskTextFieldLabels[0].id}
            className="input w-full max-w-xs border
              border-zinc-300 p-2 rounded-lg "
            // disabled={true}
            // onChange={() => {setTaskId(0)}}
          />
        </div>
        <div>
          <input type="text" placeholder={createNewTaskTextFieldLabels[1].label}
            key={createNewTaskTextFieldLabels[1].label}
            id={createNewTaskTextFieldLabels[1].id}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            // disabled={true}
            // onChange={() => {setTaskId(0)}}
          />
        </div>
        <div>
          <input type="text" placeholder={createNewTaskTextFieldLabels[2].label}
            key={createNewTaskTextFieldLabels[2].label}
            id={createNewTaskTextFieldLabels[2].id}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            // disabled={true}
            // onChange={() => {setTaskId(0)}}
          />
        </div>
        <div>
          <input type="text" placeholder={createNewTaskTextFieldLabels[3].label}
            key={createNewTaskTextFieldLabels[3].label}
            id={createNewTaskTextFieldLabels[3].id}
            className="input w-full max-w-xs border
            border-zinc-300 p-2 rounded-lg "
            // disabled={true}
            // onChange={() => {setTaskId(0)}}
          />
        </div>
        <div>
          <select id="search-select" className="select w-full
           max-w-xs bg-white border border-zinc-300
           rounded-lg p-3 text-zinc-600">
            <option disabled selected>Status:</option>
            <option value={0}>Not Started</option>
            <option value={1}>In Progress</option>
            <option value={2}>Completed</option>
          </select>

        </div>
        <div>
          <div>
            <div className='flex flex-row'>
              <DatePicker selected={dueDate}
                onChange={(newValue) => {
                  setDueDate(newValue);
                }}
                className='border  border-zinc-300 text-sm p-3 rounded-lg '
                placeholderText="Due Date"/>
            </div>

          </div>
        </div>
        <div >
          <SearchBar data="Assign To" onChange={setAssignTo}></SearchBar>
        </div>
        <div>
          <SearchBar data="Related Record" onChange={setRelatedRecords}/>
        </div>

        <div className='col-span-2'>
          <textarea placeholder='Task Description'
            id="task-description" className="textarea
          w-full border h-40 border-zinc-300 p-4  rounded-lg"
          // disabled={true}
          // onChange={() => {setTaskId(0)}}
          ></textarea>
        </div>
        <div className='col-span-2'>
          {!props.threeButtonForm ?
            <button onClick={()=>{
              handleClick();
            }}>{props.name}</button> :
            <div className='flex justify-center gap-4'>
              <button className='bg-blue-600 text-white px-5 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800'
              >
                New Task
              </button>
              <button className='bg-blue-600 text-white px-5 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800'
              >
                Sub Task
              </button>
              <button className='bg-blue-600 text-white px-5 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800'
              >
                Edit Task
              </button>
            </div>
          }
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
