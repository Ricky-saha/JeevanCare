import { useState, useEffect, useMemo } from 'react'
import { Search, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import PrescriptionCard from './PrescriptionCard'
import LoadingPage from '../all/LoadingPage'
import ErrorPage from '../all/ErrorPage'

export default function PrescriptionList ({ prescriptions, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const itemsPerPage = 6

  // Filter and sort prescriptions using useMemo for performance
  const filteredPrescriptions = useMemo(() => {
    let filtered = [...prescriptions]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        prescription =>
          prescription.doctorId?.name?.toLowerCase().includes(query) ||
          prescription.prescriptionId?.toLowerCase().includes(query) ||
          prescription.doctorId?.speciality?.toLowerCase().includes(query) ||
          prescription._id?.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        prescription =>
          prescription.status?.toLowerCase() === statusFilter.toLowerCase()
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'doctor':
          return (a.doctorId?.name || '').localeCompare(b.doctorId?.name || '')
        case 'appointment':
          return (
            new Date(b.appointmentId?.appointmentDate) -
            new Date(a.appointmentId?.appointmentDate)
          )
        default:
          return 0
      }
    })

    return filtered
  }, [prescriptions, searchQuery, statusFilter, sortBy])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, sortBy])

  // Pagination calculations
  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPrescriptions = filteredPrescriptions.slice(startIndex, endIndex)

  const handlePageChange = page => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setSortBy('newest')
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'doctor', label: 'By Doctor' },
    { value: 'appointment', label: 'By Appointment Date' }
  ]

  // Render pagination numbers
  const renderPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
              i === currentPage
                ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i}
          </button>
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className='text-gray-400 px-2'>
            ...
          </span>
        )
      }
    }
    return pages
  }

  if (loading) return <LoadingPage />
  if (error)
    return <ErrorPage error={error} onRetry={() => window.location.reload()} />

  return (
    <div className='space-y-6'>
      {/* Filters and Search */}
      <div className='bg-white rounded-2xl shadow-lg p-6'>
        <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
          {/* Search */}
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search by doctor, prescription ID...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300'
            />
          </div>

          {/* Filters */}
          <div className='flex flex-wrap gap-4 items-center'>
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300'
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300'
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-300'
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <p className='text-sm text-gray-600'>
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredPrescriptions.length)} of{' '}
            {filteredPrescriptions.length} prescriptions
          </p>
        </div>
      </div>

      {/* Prescriptions Grid */}
      {currentPrescriptions.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {currentPrescriptions.map(prescription => (
            <PrescriptionCard
              key={prescription._id}
              prescription={prescription}
            />
          ))}
        </div>
      ) : (
        <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <FileText className='w-8 h-8 text-gray-400' />
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            No Prescriptions Found
          </h3>
          <p className='text-gray-600 mb-6'>
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters to find prescriptions.'
              : "You don't have any prescriptions yet. Visit a doctor to get your first prescription."}
          </p>
          {(searchQuery || statusFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className='bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300'
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='bg-white rounded-2xl shadow-lg p-6'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='text-sm text-gray-600'>
              Page {currentPage} of {totalPages}
            </div>

            <div className='flex items-center space-x-2'>
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                <div className='flex items-center space-x-2'>
                  <ChevronLeft className='w-4 h-4' />
                  <span>Previous</span>
                </div>
              </button>

              {/* Page Numbers */}
              <div className='flex items-center space-x-1'>
                {renderPageNumbers()}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                <div className='flex items-center space-x-2'>
                  <span>Next</span>
                  <ChevronRight className='w-4 h-4' />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
