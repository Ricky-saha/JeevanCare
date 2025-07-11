import React, { useState } from 'react'
import { X, Plus, Trash2, Calendar, FileText, Pill } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { createPrescription } from '../../../Services/Operations/doctorApi'
import { toast } from 'react-hot-toast'

const INITIAL_MEDICINE = { name: '', dosage: '', frequency: '', duration: '', instructions: '' }

const MedicineCard = ({ medicine, index, onChange, onRemove, canRemove }) => (
  <div className='p-4 bg-white/80 rounded-xl border border-white/50'>
    <div className='flex justify-between items-center mb-3'>
      <h4 className='font-semibold text-gray-800'>Medicine {index + 1}</h4>
      {canRemove && (
        <button type="button" onClick={() => onRemove(index)} className='p-1 text-red-500 hover:bg-red-50 rounded'>
          <Trash2 className='w-4 h-4' />
        </button>
      )}
    </div>
    
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
      {[
        { key: 'name', label: 'Medicine Name', placeholder: 'e.g., Paracetamol', required: true },
        { key: 'dosage', label: 'Dosage', placeholder: 'e.g., 500mg', required: true },
        { key: 'frequency', label: 'Frequency', placeholder: 'e.g., Twice daily', required: true },
        { key: 'duration', label: 'Duration', placeholder: 'e.g., 5 days', required: true }
      ].map(({ key, label, placeholder, required }) => (
        <div key={key}>
          <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
          <input
            type="text"
            value={medicine[key]}
            onChange={(e) => onChange(index, key, e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder={placeholder}
            required={required}
          />
        </div>
      ))}
    </div>
    
    <div className='mt-3'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Instructions</label>
      <textarea
        value={medicine.instructions}
        onChange={(e) => onChange(index, 'instructions', e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        placeholder="e.g., Take after meals"
        rows="2"
      />
    </div>
  </div>
)

const CreatePrescriptionModal = ({ isOpen, onClose, doctorId, patientId, appointmentId, onSuccess }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    medicines: [{ ...INITIAL_MEDICINE }],
    generalInstructions: '',
    followUpDate: ''
  })

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines]
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value }
    setFormData({ ...formData, medicines: updatedMedicines })
  }

  const addMedicine = () => setFormData({ ...formData, medicines: [...formData.medicines, { ...INITIAL_MEDICINE }] })

  const removeMedicine = (index) => {
    if (formData.medicines.length > 1) {
      setFormData({ ...formData, medicines: formData.medicines.filter((_, i) => i !== index) })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.medicines.some(med => !med.name.trim() || !med.dosage.trim() || !med.frequency.trim() || !med.duration.trim())) {
      return toast.error('Please fill all required medicine fields')
    }

    try {
      setLoading(true)
      const response = await dispatch(createPrescription({
        doctorId, patientId, appointmentId,
        medicines: formData.medicines,
        generalInstructions: formData.generalInstructions,
        followUpDate: formData.followUpDate
      }))
      
      if (response?.success) {
        toast.success('Prescription created successfully!')
        setFormData({ medicines: [{ ...INITIAL_MEDICINE }], generalInstructions: '', followUpDate: '' })
        onSuccess?.()
        onClose()
      } else {
        toast.error(response?.message || 'Failed to create prescription')
      }
    } catch (error) {
      toast.error('Error creating prescription: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white/95 backdrop-blur-md rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20'>
        
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 to-green-50/80'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-500 rounded-lg'>
              <FileText className='w-6 h-6 text-white' />
            </div>
            <h2 className='text-xl font-bold text-gray-800'>Create Prescription</h2>
          </div>
          <button onClick={onClose} className='p-2 hover:bg-gray-200/80 rounded-lg'>
            <X className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Medicines */}
          <div className='bg-gray-50/50 rounded-xl p-6 border border-gray-200/50'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-500 rounded-lg'>
                  <Pill className='w-5 h-5 text-white' />
                </div>
                <h3 className='text-lg font-bold text-gray-800'>Medicines</h3>
              </div>
              <button type="button" onClick={addMedicine} className='flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm'>
                <Plus className='w-4 h-4' />
                Add Medicine
              </button>
            </div>
            <div className='space-y-4'>
              {formData.medicines.map((medicine, index) => (
                <MedicineCard
                  key={index}
                  medicine={medicine}
                  index={index}
                  onChange={handleMedicineChange}
                  onRemove={removeMedicine}
                  canRemove={formData.medicines.length > 1}
                />
              ))}
            </div>
          </div>

          {/* General Instructions */}
          <div className='bg-yellow-50/50 border border-yellow-200/50 rounded-xl p-4'>
            <label className='block text-sm font-medium text-yellow-800 mb-2'>General Instructions</label>
            <textarea
              value={formData.generalInstructions}
              onChange={(e) => setFormData({ ...formData, generalInstructions: e.target.value })}
              className='w-full p-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80'
              placeholder="e.g., Take complete rest for 3 days. Drink plenty of warm water..."
              rows="3"
            />
          </div>

          {/* Follow-up Date */}
          <div className='bg-purple-50/50 border border-purple-200/50 rounded-xl p-4'>
            <label className=' text-sm font-medium text-purple-800 mb-2 flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              Follow-up Date (Optional)
            </label>
            <input
              type="date"
              value={formData.followUpDate}
              onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
              className='w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80'
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-3 pt-4 border-t border-gray-200/50'>
            <button type="button" onClick={onClose} className='flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'>
              Cancel
            </button>
            <button type="submit" disabled={loading} className='flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 font-semibold'>
              {loading ? 'Saving...' : 'Save Prescription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePrescriptionModal