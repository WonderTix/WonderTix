import React from 'react';
import {TableDataType} from '../Table/TableData';
import CreateTask, {CreateTaskProps} from './CreateTask';
import DetailTask, {DetailTaskProps} from './DetailTask';
import RemoveTask, {RemoveTaskProps} from './RemoveTask';
import UpdateTask, {UpdateTaskProps} from './UpdateTask';

type ModalComponentProps =
  CreateTaskProps | DetailTaskProps | UpdateTaskProps | RemoveTaskProps;

type ModalManagerProps = {
  isModalOpen: boolean;
  modalType: 'create' | 'update' | 'delete' | null;
  selectedTask: TableDataType | null;
  onClose: () => void;
  onCreate: (task: TableDataType) => void;
  onUpdate: (task: TableDataType) => void;
  onDelete: () => void;
};


const ModalManager: React.FC<ModalManagerProps> = ({
  isModalOpen,
  modalType,
  selectedTask,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  if (!isModalOpen) return null;

  let ModalComponent: React.FC<ModalComponentProps>;

  switch (modalType) {
  case 'create':
    ModalComponent = CreateTask;
    break;
  case 'detail':
    ModalComponent = DetailTask;
    break;
  case 'update':
    ModalComponent = UpdateTask;
    break;
  case 'delete':
    ModalComponent = RemoveTask;
    break;
  default:
    return null;
  }


  return (
    <div className='bg-black bg-opacity-50 flex justify-center items-center
      fixed top-0 right-0 bottom-0 left-0 z-20 antialiased'>
      <ModalComponent
        task={selectedTask}
        onCancel={onClose}
        isVisible={isModalOpen}
        onSubmit={
          modalType === 'create' ? onCreate :
            modalType === 'update' ? onUpdate :
              modalType === 'delete' ? onDelete :
                undefined
        }
      />
    );
  default:
    return null;
  }
};

export default ModalManager;
