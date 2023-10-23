import React from 'react';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import RemoveTask from './RemoveTask';
import {TableDataType} from '../Table/TableData';

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

  switch (modalType) {
  case 'create':
    return (
      <CreateTask
        onCancel={onClose}
        isVisible={isModalOpen}
        onSubmit={onCreate}
      />
    );
  case 'update':
    return (
      <UpdateTask
        task={selectedTask}
        onCancel={onClose}
        isVisible={isModalOpen}
        onSubmit={onUpdate}
      />
    );
  case 'delete':
    return (
      <RemoveTask
        onCancel={onClose}
        isVisible={isModalOpen}
        onSubmit={onDelete}
      />
    );
  default:
    return null;
  }
};

export default ModalManager;
