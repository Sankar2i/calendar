##  **Calendar Application for Communication Tracking**

## Overview
The **Calendar Application for Communication Tracking** is a React-based tool designed to help organizations maintain and strengthen professional relationships. This application enables users to log past interactions, plan future communications, and manage schedules efficiently. By providing a centralized platform, the application ensures timely and consistent engagement with other organizations.

---

## Features

### Admin Module
- **Company Management**:  
  Admins can add, edit, and delete companies with the following fields:  
  - **Name**: The name of the company.  
  - **Location**: The company's physical or operational location.  
  - **LinkedIn Profile**: A link to the company’s LinkedIn page.  
  - **Emails**: One or more email addresses for communication.  
  - **Phone Numbers**: Contact numbers for representatives.  
  - **Comments**: Notes or additional information about the company.  
  - **Communication Periodicity**: Default time interval for scheduled communications (e.g., every 2 weeks).  

- **Communication Method Management**:  
  Admins can define and manage communication methods with the following attributes:  
  - **Name**: E.g., "Visit" or "LinkedIn Post."  
  - **Description**: E.g., "Visit to company premises."  
  - **Sequence**: Determines the order of communication (e.g., LinkedIn Post → LinkedIn Message → Email → Phone Call → Other).  
  - **Mandatory Flag**: Indicates whether a communication method is mandatory in the sequence.  

  **Default Communication Sequence**:
  1. LinkedIn Post  
  2. LinkedIn Message  
  3. Email  
  4. Phone Call  
  5. Other  

### User Module
- **Dashboard**:  
  Provides a grid-like interface for tracking communication tasks:  
  - **Company Name**: Displays the name of the company.  
  - **Last Five Communications**: Summarizes the most recent five communications (type and date).  
  - **Next Scheduled Communication**: Displays the type and date of the next planned communication.  

  **Color-Coded Highlights**:
  - **Red Highlight**: Overdue communication.  
  - **Yellow Highlight**: Communication due today.  
  Users can disable or override highlights if needed.

- **Interactive Features**:  
  - **Hover Effect**: Displays tooltips with communication notes or comments on hover.  
  - **Communication Action**: Users can log communications:  
    - Select a communication type.  
    - Input the date and notes.  
    - Reset overdue highlights after submission.  

- **Notifications**:  
  Displays overdue and today's communications in separate grids. The notification icon shows badge counts for tasks.  

- **Calendar View**:  
  Users can:  
  - View past communications.  
  - Manage upcoming scheduled communications.  

---

## Tech Stack
- **Frontend Framework**: React (Vite)  
- **Styling**: Tailwind CSS  
- **Libraries**: FullCalendar, custom grids  
- **Deployment**: Manual deployment on Netlify  

---

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)  
- npm or yarn  

### Steps
1. Clone the Repository:
   ```
   git clone <repository-url>
   cd calendar-application
   ```
2. Install Dependencies:
   ```
   npm install
   ```
3. Run the Development Server:
   ```
   npm run dev
   ```
4. Build for Production:
   ```
   npm run build
   ```

---

## Deployment
The application is deployed manually on Netlify. Follow these steps:
1. Build the Production Version:
   ```
   npm run build
   ```
2. Upload the `dist` Folder to your Netlify project.

---

## Usage

1. **Admin Module**:
   - Configure companies and define communication parameters.  
2. **User Module**:
   - Track, log, and manage communications via the dashboard and calendar view.  
3. **Calendar View**:
   - Access past and future communication details.  

---

## Future Enhancements
- **Integration**:  
  - APIs for LinkedIn and email for automated communication tracking.  
- **Reporting and Analytics**:  
  - Advanced insights for communication patterns.  
- **Mobile Responsiveness**:  
  - Optimize the interface for mobile devices.  

---

## Contributing
Contributions are welcome! Follow these steps:

1. Fork the Repository.  
2. Create a Feature Branch:  
   ```
   git checkout -b feature/your-feature-name
   ```
3. Commit Your Changes:  
   ```
   git commit -m "Description of changes"
   ```
4. Push to the Branch:  
   ```
   git push origin feature/your-feature-name
   ```
5. Submit a Pull Request.  

---

## Contact
For feedback or inquiries, reach out to us:  
- **Email**: support@yourcompany.com  
- **Website**: [YourCompany](https://www.yourcompany.com)  

---
