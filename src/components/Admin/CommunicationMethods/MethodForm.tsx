import React, { useState, useEffect } from 'react';
import { CommunicationMethod } from '../../../types/communicationMethod';

interface MethodFormProps {
  method?: CommunicationMethod;
  existingSequences: number[];
  onSubmit: (data: Omit<CommunicationMethod, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const MethodForm: React.FC<MethodFormProps> = ({
  method,
  existingSequences,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sequence: Math.max(0, ...existingSequences) + 1,
    isMandatory: false,
  });

  useEffect(() => {
    if (method) {
      setFormData(method);
    }
  }, [method]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Method Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sequence</label>
        <input
          type="number"
          required
          min="1"
          value={formData.sequence}
          onChange={(e) => setFormData(prev => ({ ...prev, sequence: parseInt(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="mandatory"
          checked={formData.isMandatory}
          onChange={(e) => setFormData(prev => ({ ...prev, isMandatory: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="mandatory" className="ml-2 block text-sm text-gray-700">
          Mandatory Method
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {method ? 'Update' : 'Create'} Method
        </button>
      </div>
    </form>
  );
};