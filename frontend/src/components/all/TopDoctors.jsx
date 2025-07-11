import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllDoctors } from "../../../Services/Operations/patientApi";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

export default function TopDoctors() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 
 // Get data from Redux store
 const { doctors, loading, error } = useSelector(state => state.patient);

 // Fetch doctors on component mount if not already loaded
 useEffect(() => {
   if (!doctors || doctors.length === 0) {
     dispatch(getAllDoctors());
   }
 }, [dispatch, doctors]);

 // Loading state
 if (loading) {
   return (
     <LoadingPage/>
   )
 }

 // Error state
 if (error) {
   return (
    <ErrorPage error ={error} onRetry={() => dispatch(getAllDoctors())}/>
    
   );
 }

 return (
   <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
     <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
     <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors</p>
     
     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0">
       {doctors?.slice(0, 10).map((item, index) => (
         <div 
           onClick={() => navigate(`appointment/${item.id}`)}
           className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-white shadow-sm hover:shadow-lg" 
           key={item._id || index}
         >
           <div className="w-full h-48 bg-blue-50 overflow-hidden">
             <img 
               className="w-full h-full object-cover" 
               src={item.image}  
               alt={item.name}
             />
           </div>
           <div className="p-4">
             <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
               <div className={`w-2 h-2 rounded-full ${item.available !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
               <span>{item.available !== false ? 'Available' : 'Unavailable'}</span>
             </div>
             <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
             <p className="text-sm text-gray-600">{item.speciality}</p>
           </div>
         </div>
       ))}
     </div>
     
     {/* Show message if no doctors */}
     {(!doctors || doctors.length === 0) && !loading && !error && (
       <div className="text-center text-gray-500 py-8">
         <p>No doctors available at the moment</p>
       </div>
     )}
     
     <button 
       onClick={() => { navigate("/doctors"); scrollTo(0, 0) }}
       className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors"
     >
       more +
     </button>
   </div>
 );
}