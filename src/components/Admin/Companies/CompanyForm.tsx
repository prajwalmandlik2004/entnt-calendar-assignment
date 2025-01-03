import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Company } from '../../../types/company';

interface CompanyFormProps {
  company?: Company;
  onSubmit: (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedinProfile: '',
    emails: [''],
    phoneNumbers: [''],
    comments: '',
    communicationPeriodicity: 14,
  });

  useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addField = (field: 'emails' | 'phoneNumbers') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeField = (field: 'emails' | 'phoneNumbers', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateField = (field: 'emails' | 'phoneNumbers', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
        <input
          type="url"
          required
          value={formData.linkedinProfile}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Addresses</label>
        {formData.emails.map((email, index) => (
          <div key={index} className="flex mt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => updateField('emails', index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formData.emails.length > 1 && (
              <button
                type="button"
                onClick={() => removeField('emails', index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('emails')}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Add Email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        {formData.phoneNumbers.map((phone, index) => (
          <div key={index} className="flex mt-2">
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => updateField('phoneNumbers', index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formData.phoneNumbers.length > 1 && (
              <button
                type="button"
                onClick={() => removeField('phoneNumbers', index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('phoneNumbers')}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Add Phone Number
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Communication Periodicity (days)</label>
        <input
          type="number"
          required
          min="1"
          value={formData.communicationPeriodicity}
          onChange={(e) => setFormData(prev => ({ ...prev, communicationPeriodicity: parseInt(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          value={formData.comments}
          onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
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
          {company ? 'Update' : 'Create'} Company
        </button>
      </div>
    </form>
  );
};