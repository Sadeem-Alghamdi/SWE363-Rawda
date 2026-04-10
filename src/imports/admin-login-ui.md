🛡️ 1️⃣ Admin Login
🎯 Screens Needed
Admin Login Page
Login Error State
Locked Account State
Success → Dashboard Redirect
🖥️ Login UI Structure
Centered login card
Logo + “Admin Panel”
Username field
Password field
Show/Hide password toggle
Login button
Error message area
📌 Validation States
Scenario	UI Response
Wrong credentials	“Invalid username/password”
Account disabled	“Error, Contact Support”
Success	Toast: “Login Successfully” → Redirect
Loading	Spinner on button
🧠 Figma AI Prompt
Design a clean web-based admin login page for a plant care platform. Include centered login card with username and password fields, show/hide password toggle, login button, and validation messages. Include states: invalid credentials (“Invalid username/password”), disabled account (“Error, Contact Support”), loading spinner on login, and success toast “Login Successfully” before redirect. Professional dashboard style, green accent with neutral gray admin theme.
👥 2️⃣ Manage User Accounts
🎯 Screens Needed
User List Table
User Details Panel
Edit Role Modal
Confirmation Modal
Success Toast
🖥️ Dashboard Layout Structure
Left Sidebar:
Dashboard
Users
Experts
Forum Moderation
Reviews
Content Approval
Subscriptions
Badges
Main Area:
Search bar
Filters (Role, Status)
Data Table:
Columns:
Name
Email
Role
Account Created Date
Status
Actions (Edit / Activate / Delete)
📌 States
Action	UI
Change role	Dropdown modal
Delete user	Confirmation modal
Success	“User updated successfully”
Empty list	“No users found”
🧠 Figma AI Prompt
Create a web admin dashboard page for managing users. Include sidebar navigation and a main content area with searchable and filterable data table showing Name, Email, Role, Created Date, Status, and Actions (Edit, Activate, Delete). Include modals for editing role and confirming deletion. Include success toast “User updated successfully” and empty state “No users found.” Professional SaaS dashboard UI.
🌿 3️⃣ Approve Gardening Expert Registration
🎯 Screens Needed
Expert Applications List
Expert Detail Review Page
Approval/Rejection Modal
Notification Confirmation
🖥️ Expert Applications Table
Columns:
Name
Email
Years Experience
Submitted Date
Status (Pending / Approved / Rejected)
🖥️ Detail Page
Profile photo
Bio
Uploaded certificates
Experience proof documents (preview)
Approve button (green)
Reject button (red)
Optional note input
📌 States
Status	UI
Pending	Yellow badge
Approved	Green badge
Rejected	Red badge
Empty	“No pending expert applications.”
🧠 Figma AI Prompt
Design an expert application approval dashboard page for an admin panel. Include a table listing expert applications with status badges (Pending, Approved, Rejected). Create a detail review page showing profile, bio, uploaded certificates, and experience proof documents. Include Approve and Reject buttons with optional rejection note field. Include success notification and empty state message.
💬 4️⃣ Moderate Q&A Forum
🎯 Screens Needed
Moderation Overview
Post Detail Review
Action Confirmation Modal
🖥️ Moderation UI
Table:
Post Title
Author
Date
Reports Count
Status
Actions (Remove / Warn / Mark Safe)
📌 Action States
Action	Result
Remove	Post disappears
Warn	Warning sent notification
Mark safe	Status updated
🧠 Figma AI Prompt
Create a forum moderation admin page for a web dashboard. Include searchable table of posts with columns: Title, Author, Date, Reports Count, Status, and Actions (Remove, Warn User, Mark Safe). Include confirmation modal before removing content and success update state. Clean professional admin UI.
⭐ 5️⃣ Manage Store Ratings & Reviews
🎯 Screens Needed
Store Ratings Overview
Review Moderation Panel
🖥️ Ratings Overview
Store Name
Average Rating
Total Reviews
View Reviews button
🖥️ Review Panel
Star rating
Reviewer name
Date
Review text
Verified toggle
Remove button
Filter dropdown (Verified / Reported / Low rating)
🧠 Figma AI Prompt
Design an admin dashboard page to manage plant store ratings and reviews. Include store list with rating summaries and review counts. Add review moderation screen showing star rating, reviewer name, review text, verified toggle, remove button, and filtering options. Include update confirmation state.
📚 6️⃣ Approve Expert Submitted Plant Guides
🎯 Screens Needed
Pending Submissions List
Content Review Page
Approve / Request Change / Reject Modal
🖥️ Review Page
Article Title
Submitted by
References section
Content preview
Approve (green)
Request Changes (orange)
Reject (red)
🧠 Figma AI Prompt
Create an admin content approval page for reviewing expert-submitted plant guides. Include list of pending submissions and a detailed review page showing article content, references, and action buttons (Approve, Request Changes, Reject). Include status update and notification confirmation.
💳 7️⃣ Manage Subscription Plans
🎯 Screens Needed
Plans Overview
Edit Plan Modal
🖥️ Plans UI
Cards:
Free Plan
Pro Plan
Each shows:
Price
Features list
Active users count
Edit button
🧠 Figma AI Prompt
Design an admin subscription management page showing plan cards (Free and Pro) with price, features list, and active users count. Include edit plan modal to change price and features. Include save confirmation state. Modern SaaS admin UI.
🏅 8️⃣ Badge-Based System for Experts
🎯 Screens Needed
Badge Rules Page
Expert Badge Assignment Page
🖥️ Badge Rules UI
Badge Level Name
Requirements (e.g., 20 verified answers)
Edit Rules button
🖥️ Expert Badge Management
Expert name
Current badge
Assign badge dropdown
Remove badge button
🧠 Figma AI Prompt
Design an admin badge management system for experts. Include badge levels with requirement rules and edit functionality. Create expert management table showing current badge and options to assign or remove badges. Include update confirmation state. Professional dashboard style.