# JeevanCare
# 🩺 JeevanCare – Fullstack Medical Consultation Platform

JeevanCare is a full-fledged web application designed to streamline the process of online medical consultation. It empowers patients to book appointments, consult doctors via video call, manage prescriptions, and maintain medical history – all in one place.

---

## 📸 Preview
<img width="1918" height="1020" alt="home" src="https://github.com/user-attachments/assets/cba0d546-ade6-4718-9a8f-f38c072e14b6" />
<img width="1917" height="912" alt="home2" src="https://github.com/user-attachments/assets/ba08cd47-809e-4eb5-9b55-7cb2c2037691" />

---

## 🚀 Features

- 🔍 **Doctor Search & Appointment Booking**  
  Easily find doctors by specialization and book appointment slots with a calendar interface.

<img width="1918" height="1020" alt="All doctors" src="https://github.com/user-attachments/assets/ba3f829c-eb26-4500-9c84-bb5928ef480f" />\

<img width="1918" height="1017" alt="my appoinments" src="https://github.com/user-attachments/assets/e31f6152-d1b1-4fac-97ba-acc73f9d867f" />

<img width="1918" height="696" alt="slot" src="https://github.com/user-attachments/assets/a4e711fa-da23-42b8-bfb2-f6ddaab6cec7" />

- 💳 **Secure Online Payments**  
  Integrated with Razorpay to facilitate secure and fast payments during appointment booking.
<img width="1918" height="1026" alt="pay,emt1" src="https://github.com/user-attachments/assets/5dab8ce5-e6af-4e10-b264-f74ea2ce620c" />

<img width="1916" height="1025" alt="payment2" src="https://github.com/user-attachments/assets/9abb8f98-4431-46c5-9101-479169537296" />

- 🎥 **Real-Time Video Consultation**  
  Seamless video consultations using the Zeocloud SDK, ensuring privacy and clarity.
  <img width="1918" height="1011" alt="videocall1" src="https://github.com/user-attachments/assets/dfb1963a-69c1-4e24-92ec-5892e5fec280" />

<img width="1918" height="1017" alt="video calling1" src="https://github.com/user-attachments/assets/078e506d-b44d-475b-a550-05c760f9ac6a" />

- 📄 **Prescription Management**  
  Doctors can create, view, and print digital prescriptions post-consultation while patients can view download and mange their prescriptions.
  <img width="1918" height="1017" alt="my presscrition 1" src="https://github.com/user-attachments/assets/20e31841-5fa1-4ece-8526-c3428ed5bd47" />
<img width="1918" height="1022" alt="my prescription2" src="https://github.com/user-attachments/assets/6d08acc5-2734-4269-b0c4-7a41a6a1a2c9" />
<img width="1918" height="955" alt="create prescription" src="https://github.com/user-attachments/assets/a96fe350-2c85-4eed-91a2-09c0e194e669" />
<img width="1918" height="1015" alt="viewprescription1" src="https://github.com/user-attachments/assets/bcbd2db4-a61c-43d8-8b00-b56dd1ac310e" />


- 🧾 **Medical History Tracking**  
  Doctors  can view and maintain a full history of past consultations and prescriptions.
  
<img width="1918" height="965" alt="dpctpr a ppoinment 2 medical hostory" src="https://github.com/user-attachments/assets/d37f5bb3-1f1d-4e21-b179-b319cbe16684" />
<img width="1918" height="965" alt="docorr appoinment medical histroy 2" src="https://github.com/user-attachments/assets/77b1f9b9-e233-4744-b7cb-1d9591efaec2" />

**other images**

<img width="1918" height="973" alt="doctor dashboard" src="https://github.com/user-attachments/assets/16ef78c4-71db-47de-b370-8e6091d1017f" />
---<img width="1917" height="963" alt="adminpanel1" src="https://github.com/user-attachments/assets/51026184-5fa1-42c0-86d0-fbeee9c86e01" />
<img width="1918" height="962" alt="adminpanel2" src="https://github.com/user-attachments/assets/a99e89ca-26b6-4846-951a-587f6342eaca" />

<img width="1525" height="872" alt="mis 1" src="https://github.com/user-attachments/assets/b4bbb8b0-88fe-4433-97fc-76335b75bb78" />

<img width="1918" height="856" alt="mis2" src="https://github.com/user-attachments/assets/4ccfdac5-6fc7-487b-915a-8ecbe757d58d" />
<img width="1918" height="867" alt="mis3" src="https://github.com/user-attachments/assets/4fd5b84f-c263-4918-811a-c5ccb45143d3" />
<img width="1655" height="802" alt="mail" src="https://github.com/user-attachments/assets/a50ea894-5cf7-431d-8cff-c6a56a0fdc3f" />


## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS 

### Backend:
- Node.js
- Express.js
- Razorpay SDK
- Zeocloud Video SDK

### Database:
- MongoDB 

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Ricky-saha/jeevancare.git
cd jeevancare

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
cd backend
npm install

# Setup environment variables
# Create a `.env` file in /backend and /frontend with necessary credentials
sample env:-
for frontend:-
VITE_API_BASE_URL=
VITE_ZEGO_APP_ID=
VITE_ZEGO_SERVER_SECRET=
VITE_VIDEO_CALL_ENABLED=true
VITE_CALL_RECORDING_ENABLED=false
VITE_SCREEN_SHARE_ENABLED=true
VITE_TEXT_CHAT_ENABLED=true

for backend:-
PORT=
URL=
CLOUDINARY_SECRET_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
JWT_SECRET=
EMAIL_HOST = smtp.gmail.com
EMAIL_USERNAME= 
EMAIL_PASSWORD=
RAZORPAY_KEY= 
RAZORPAY_SECRET= 



# Run the app
# From /backend
node index.js

# From /frontend (in another terminal)
npm run dev


