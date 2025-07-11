import { useState, useEffect } from 'react'

export default function SlotBooking({ docInfo, onBookAppointment }) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedTime, setSelectedTime] = useState(null)

  // Time slots
  const TIME_SLOTS = [
    '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am',
    '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm',
    '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm',
    '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm', '8:00 pm'
  ]

  const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // Generate next 7 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    
    return dates
  }

  const dates = generateDates()

  // Get available slots for selected day
  const getAvailableSlots = () => {
    if (selectedDay === 0) {
      // Today - filter out past times
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      
      return TIME_SLOTS.filter(slot => {
        const [time, period] = slot.split(' ')
        let [hours, minutes] = time.split(':').map(Number)
        
        if (period === 'pm' && hours !== 12) hours += 12
        if (period === 'am' && hours === 12) hours = 0
        
        const slotTime = hours * 60 + minutes
        const currentTime = currentHour * 60 + currentMinute + 30 // 30min buffer
        
        return slotTime > currentTime
      })
    }
    
    // Future days - all slots available
    return TIME_SLOTS
  }

  const availableSlots = getAvailableSlots()

  // Auto-select first available slot when day changes
  useEffect(() => {
    if (availableSlots.length > 0) {
      setSelectedTime(availableSlots[0])
    } else {
      setSelectedTime(null)
    }
  }, [selectedDay])

  // Handle appointment booking
  const handleBookAppointment = () => {
    if (!selectedTime) {
      alert('Please select a time slot')
      return
    }
    
    if (!onBookAppointment) {
      alert('Booking function not available')
      return
    }
    
    const appointmentData = {
      date: dates[selectedDay].toLocaleDateString().split('T')[0],
      time: selectedTime,
      fees: docInfo?.fees
    }
    
    onBookAppointment(appointmentData)
    console.log(appointmentData)
  }
  

  

  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 mt-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-6'>Booking Slots</h2>

      {/* Days Selection */}
      <div className='flex overflow-x-auto gap-3 mb-6 pb-2'>
        {dates.map((date, i) => (
          <div
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`flex-shrink-0 text-center p-3 rounded-full cursor-pointer transition-all duration-300 ${
              selectedDay === i ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'
            }`}
          >
            <div className='text-xs font-medium'>{DAY_NAMES[date.getDay()]}</div>
            <div className='text-lg font-bold'>{date.getDate()}</div>
            {i === 0 && <div className='text-xs opacity-75 mt-1'>Today</div>}
          </div>
        ))}
      </div>

      {/* Available Slots Info */}
      <div className='mb-4 p-3 bg-blue-50 rounded-lg'>
        <p className='text-sm text-blue-700'>
          <span className='font-medium'>{availableSlots.length} slots available</span>
          {selectedDay === 0 ? ' today' : ''}
        </p>
      </div>

      {/* Time Slots */}
      {availableSlots.length > 0 ? (
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-6'>
          {availableSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedTime === time
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-blue-100'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      ) : (
        <div className='text-center py-8 text-gray-500'>
          <p className='text-lg mb-2'>No slots available for today</p>
          <p className='text-sm'>Please select another day</p>
        </div>
      )}

      {/* Selected Appointment Summary */}
      {selectedTime && (
        <div className='mb-6 p-4 bg-green-50 rounded-lg border border-green-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-green-700'>Selected Appointment</p>
              <p className='font-medium text-green-800'>
                {dates[selectedDay].toDateString()} at {selectedTime}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-green-700'>Consultation Fee</p>
              <p className='font-bold text-green-800'>₹{docInfo?.fees}</p>
            </div>
          </div>
        </div>
      )}

      {/* Book Button */}
      <button 
        onClick={handleBookAppointment}
        disabled={!selectedTime}
        className={`w-full font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg ${
          selectedTime
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-1'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {selectedTime ? 'Book an Appointment' : 'Select a time slot'}
      </button>
    </div>
  )
}