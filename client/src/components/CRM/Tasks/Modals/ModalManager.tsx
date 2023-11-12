import React from 'react';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import RemoveTask from './RemoveTask';
import DetailTask from './DetailTask';
import {TableDataType} from '../Table/TableData';

type ModalManagerProps = {
  isModalOpen: boolean;
  modalType: 'detail' | 'create' | 'update' | 'delete' | null;
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

  let ModalComponent;

  switch (modalType) {
  case 'detail':
    ModalComponent = DetailTask;
    break;
  case 'create':
    ModalComponent = CreateTask;
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
          modalType === 'create' ?
            onCreate : modalType === 'update' ?
              onUpdate : onDelete
        }
      />
    </div>
  );
};

export default ModalManager;
