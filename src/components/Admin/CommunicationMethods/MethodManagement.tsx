import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { CommunicationMethod } from '../../../types/communicationMethod';
import { communicationMethodStorage } from '../../../utils/communicationMethodStorage';
import { MethodList } from './MethodList';
import { MethodForm } from './MethodForm';

export const MethodManagement: React.FC = () => {
  const [methods, setMethods] = useState<CommunicationMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<CommunicationMethod | undefined>();

  useEffect(() => {
    communicationMethodStorage.initialize();
    loadMethods();
  }, []);

  const loadMethods = () => {
    const loadedMethods = communicationMethodStorage.getMethods();
    setMethods(loadedMethods);
  };

  const handleSubmit = (data: Omit<CommunicationMethod, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingMethod) {
      communicationMethodStorage.updateMethod(editingMethod.id, data);
    } else {
      communicationMethodStorage.addMethod(data);
    }
    loadMethods();
    handleCancel();
  };

  const handleEdit = (method: CommunicationMethod) => {
    setEditingMethod(method);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this communication method?')) {
      communicationMethodStorage.deleteMethod(id);
      loadMethods();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMethod(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Communication Methods</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Method
          </button>
        )}
      </div>

      {showForm ? (
        <MethodForm
          method={editingMethod}
          existingSequences={methods.map(m => m.sequence)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <MethodList
          methods={methods}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};