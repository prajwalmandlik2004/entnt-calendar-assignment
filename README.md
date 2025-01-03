# Calendar Application for Communication Tracking

## Overview

This Calendar Application is designed to help organizations efficiently manage and track their professional interactions with other companies. The app ensures timely follow-ups and consistent communication, providing a centralized platform for logging past interactions and planning future communications. Developed using React, this application prioritizes usability, clarity, and efficient data handling.

---

## Features

### Admin Module
1. **Company Management**:
   - Add, edit, and delete companies.
   - Store information such as:
     - Name
     - Location
     - LinkedIn Profile
     - Emails
     - Phone Numbers
     - Comments
     - Communication Periodicity (e.g., every 2 weeks)

2. **Communication Method Management**:
   - Define communication methods with details like:
     - Name (e.g., LinkedIn Post)
     - Description (e.g., Visit to company premises)
     - Sequence (e.g., LinkedIn Post → Email → Phone Call)
     - Mandatory flag for each method

---

### User Module
1. **Dashboard**:
   - Grid view of companies with:
     - Last five communications (type and date)
     - Next scheduled communication (type and date)
   - **Color-Coded Highlights**:
     - **Red**: Overdue communication
     - **Yellow**: Communication due today
   - Interactive hover effects for tooltips with additional details.

2. **Communication Actions**:
   - Log new communications:
     - Select communication type (e.g., Email, LinkedIn Message)
     - Add date and notes
   - Automatically reset overdue/due highlights upon submission.

3. **Notifications**:
   - View overdue and today’s communications in a dedicated section.
   - Notification badge displays the count of overdue and due tasks.

4. **Calendar View**:
   - Visualize past and upcoming communications.
   - Manage scheduled dates and methods.

---

## How to Use

### 1. Setup and Installation
- Clone the repository:
  ```bash
  git clone https://github.com/your-username/calendar-app.git

- Navigate to the project directory:
  ```bash
  cd calendar-app

- Install dependencies:
  ```bash
  npm install

- Start the development server:
  ```bash
  npm run dev

# Accessing the Application

### Admin and user modules can be accessed through the provided routes:

- Admin: 
  - Mail - admin@example.com
  - Pass - admin123
- User: 
  - Mail - user@example.com
  - Pass - user123

# Known Limitations: 

- Currently, the Reporting and Analytics Module has not been developed. Future versions may include detailed performance insights and downloadable reports.