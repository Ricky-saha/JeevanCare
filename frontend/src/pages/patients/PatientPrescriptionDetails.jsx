import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronLeft, Printer } from 'lucide-react'
import { getPrescriptionDetails } from '../../../Services/Operations/patientApi'
import LoadingComponent from '../../components/all/LoadingPage'
import { toast } from 'react-hot-toast'
import ErrorPage from '../../components/all/ErrorPage'
import PrescriptionHeader from '../../components/Patient/PrescriptionHeader'
import PrescriptionContent from '../../components/Patient/PrescriptionContent'
import PrescriptionFooter from '../../components/Patient/PrescriptionFooter'
import "./PrescriptionPrint.css"

export default function PrescriptionDetail() {
  const { prescriptionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { prescriptionDetails, loading, error } = useSelector(state => state.patient)

  // Fetch prescription details on component mount
  useEffect(() => {
    if (isAuthenticated && prescriptionId) {
      console.log('🔄 Fetching prescription details for ID:', prescriptionId)
      dispatch(getPrescriptionDetails(prescriptionId))
    } else if (!isAuthenticated) {
      toast.error('Please login to view prescription details')
      navigate('/login')
    }
  }, [dispatch, isAuthenticated, prescriptionId, navigate])



  const handlePrint = () => {
    window.print()
  }

  const handleGoBack = () => {
    navigate('/patient/prescription')
  }

  // Loading or No data state
  if (!prescriptionDetails) {
    if (loading) {
      return <LoadingComponent />
    }
    
    // Show error page if not loading and no data (indicates failed fetch or not found)
    return <ErrorPage error={error || "Prescription not found or failed to load"} />
  }

  const prescription = prescriptionDetails

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Actions - Hidden on print */}
        <div className="flex justify-between mb-8 no-print">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Prescriptions
          </button>
          
          <button
            onClick={handlePrint}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print Prescription
          </button>
        </div>

        {/* Prescription Document */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print-area">
          <PrescriptionHeader
            prescription={prescription}
            user={user}
          />
          
          <PrescriptionContent prescription={prescription} />
          
          <PrescriptionFooter prescription={prescription} />
        </div>
      </div>
    </div>
  )
}