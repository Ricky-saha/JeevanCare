import React from 'react';
import { assets } from '../../assets/assets_frontend/assets'
import { Navigate, useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">
      {/* About Us Header */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ABOUT US</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto"></div>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center border-gray-300">
              <div className="text-center text-gray-500">
            
                <p className="text-sm"><img src={assets.about_image} alt="about image " /> </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            {/* Welcome Section */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Welcome To Jeevan Care, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently. 
                At Jeevan Care, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor 
                Appointments And Managing Their Health Records.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Jeevan Care Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our 
                Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service. 
                Whether You're Booking Your First Appointment Or Managing Ongoing Care, Jeevan Care Is Here To Support You 
                Every Step Of The Way.
              </p>
            </div>

            {/* Our Vision */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our Vision At Jeevan Care Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The 
                Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When 
                You Need It.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            WHY <span className="text-blue-600">CHOOSE US</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Efficiency Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Efficiency:</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.
              </p>
            </div>

            {/* Convenience Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Convenience:</h3>
              <p className="text-gray-600 leading-relaxed">
                Access To A Network Of Trusted Healthcare Professionals In Your Area.
              </p>
            </div>

            {/* Personalization Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Personalization:</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed with you in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Booking</h3>
              <p className="text-gray-600 text-sm">Schedule appointments anytime, anywhere</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Verified Doctors</h3>
              <p className="text-gray-600 text-sm">100+ certified healthcare professionals</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Reminders</h3>
              <p className="text-gray-600 text-sm">Never miss an appointment again</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Care</h3>
              <p className="text-gray-600 text-sm">Tailored health recommendations</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready To Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust Jeevan Care for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg" 
            onClick={() => {
                navigate("/doctors");
                scrollTo(0,0);
            }}>
              Find a Doctor
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;