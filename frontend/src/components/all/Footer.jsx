import { assets } from "../../assets/assets_frontend/assets"
export default function Footer() {
    return (
        <footer className="bg-blue-950 text-white rounded-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left - Company Info */}
                    <div>
                        <img 
                            src={assets.logo} 
                            alt="JeevanCare Logo" 
                            className="h-10 w-auto mb-4"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            JeevanCare is dedicated to providing trusted, accessible healthcare services through our verified network of experienced doctors.
                        </p>
                    </div>

                    {/* Center - Company Links */}
                    <div>
                        <h3 className="text-base font-semibold mb-4 text-white">COMPANY</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About us</a></li>
                            <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact us</a></li>
                            <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Right - Contact Info */}
                    <div>
                        <h3 className="text-base font-semibold mb-4 text-white">GET IN TOUCH</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-300 text-sm">+91 935472XXXX</li>
                            <li className="text-gray-300 text-sm">life@jeevancare.com</li>
                            <li className="text-gray-300 text-sm">Janakpuri, New Delhi, India</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 pt-6 border-t border-blue-800">
                    <p className="text-gray-400 text-center text-sm">
                        © 2025 JeevanCare. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}