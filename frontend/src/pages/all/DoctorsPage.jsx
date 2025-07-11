import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDoctors } from '../../../Services/Operations/patientApi';
import LoadingPage from '../../components/all/LoadingPage';
import ErrorPage from '../../components/all/ErrorPage';
import {specialityData} from '../../assets/assets_frontend/assets'

export default function DoctorsPage() {
 const { speciality } = useParams();
 const navigate = useNavigate();
 const dispatch = useDispatch();
 
 // Get data from Redux store
 const { doctors, loading, error } = useSelector(state => state.patient);
 
 // Local state for filtered doctors and mobile filters
 const [filterDoc, setFilterDoc] = useState([]);
 const [showfilters, setShowFilters] = useState(false);

 // Fetch doctors on component mount if not already loaded
 useEffect(() => {
   if (!doctors || doctors.length === 0) {
     dispatch(getAllDoctors());
   }
 }, [dispatch, doctors]);

 // Filter doctors based on speciality
 const applyFilter = () => {
   if (speciality && doctors) {
     setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
   } else if (doctors) {
     setFilterDoc(doctors);
   }
 };
 console.log(filterDoc);

 // Apply filter when doctors or speciality changes
 useEffect(() => {
   applyFilter();
 }, [doctors, speciality]);

 // Loading state
 if (loading) {
   return (
     <LoadingPage/>
   );
 }

 // Error state
 if (error) {
   return (
    <ErrorPage error={error} onRetry={()=>dispatch(getAllDoctors())}/>
   );
 }

 // Updated specialties list
 const specialties =specialityData.map((specs)=>(
  specs.speciality
 ))
 
 const handleSpecialtySelect = (spec) => {
   // Navigate to the selected specialty or all doctors
   if (speciality === spec) {
     navigate('/doctors');
   } else {
     navigate(`/doctors/${spec}`);
   }
   
   // Close the filter panel on mobile after selection
   setShowFilters(false);
 };

 return (
   <div className="mt-3 px-4 sm:px-6 lg:px-8">
     <p className='text-gray-600 mb-6'>Browse through the doctors specialist</p>
     
     <div className='flex flex-col lg:flex-row gap-6'>
       
       {/* Mobile Filter Toggle */}
       <button 
         className={`py-2 px-4 border rounded-lg text-sm transition-all lg:hidden mb-4
           ${showfilters ? 'bg-blue-950 text-white' : "bg-green-800 text-white"}`} 
         onClick={() => setShowFilters(prev => !prev)}
       >
         {showfilters ? 'Hide Filters' : 'Show Filters'}
       </button>
       
       {/* Filter Sidebar */}
       <div className={`lg:block ${showfilters ? "block" : 'hidden'} lg:w-64 flex-shrink-0`}>
         <div className="bg-white rounded-lg shadow-sm border p-4">
           <h3 className="font-semibold text-gray-800 mb-4">Specialties</h3>
           <div className="space-y-2 max-h-96 overflow-y-auto">
             {specialties.map((spec) => (
               <button
                 key={spec}
                 onClick={() => handleSpecialtySelect(spec)}
                 className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border
                   ${speciality === spec 
                     ? "bg-green-800 text-white border-green-800" 
                     : "hover:bg-gray-50 border-gray-200 text-gray-700"
                   }`}
               >
                 {spec}
               </button>
             ))}
           </div>
         </div>
       </div>
       
       {/* Main Content Area */}
       <div className='flex-1 min-h-screen'>
         {/* Doctors Grid */}
         {filterDoc.length > 0 ? (
           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
             {filterDoc.map((item, index) => (
               <div
                 onClick={() => navigate(`/appointment/${item.id}`)}
                 className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-white shadow-sm hover:shadow-lg'
                 key={item._id || index}
               >
                 <div className='w-full h-48 bg-blue-50 overflow-hidden'>
                   <img
                     className='w-full h-full object-cover'
                     src={item.image}
                     alt={item.name}
                     onError={(e) => {
                       e.target.src = '/placeholder-doctor.jpg';
                     }}
                   />
                 </div>
                 <div className='p-4'>
                   <div className='flex items-center gap-2 text-sm text-green-500 mb-2'>
                     <div className={`w-2 h-2 rounded-full ${item.available !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                     <span>{item.available !== false ? 'Available' : 'Unavailable'}</span>
                   </div>
                   <h3 className='font-medium text-gray-900 mb-1'>{item.name}</h3>
                   <p className='text-sm text-gray-600'>{item.speciality}</p>
                 </div>
               </div>
             ))}
           </div>
         ) : (
           /* Empty State */
           <div className="flex flex-col items-center justify-center py-16 text-center">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
               <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
             </div>
             <h3 className="text-xl font-semibold text-gray-800 mb-2">
               {speciality ? `No doctors found for ${speciality}` : 'No doctors available'}
             </h3>
             <p className="text-gray-500 mb-6">
               {speciality 
                 ? 'Try selecting a different specialty or check back later.' 
                 : 'Please check back later or try refreshing the page.'
               }
             </p>
             {speciality && (
               <button
                 onClick={() => navigate('/doctors')}
                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
               >
                 View All Doctors
               </button>
             )}
           </div>
         )}
       </div>
     </div>
   </div>
 );
}