🏪 1️⃣ Register a Plant Store Profile
🎯 Screens Needed
Store Owner Auth Page (Login + Register tabs)
Register Form (with upload logo)
Validation/Error states
Success toast + Redirect to Store Dashboard
🧩 Components
Tabs: Login | Register
Fields: Store Name, Email, Password, Phone, Location
Upload: Store Logo (optional) with preview
CTA: “Create Account”
Inline validation text under fields
✅ States
State	UI behavior
Email already exists	“Email already registered.”
Invalid fields	Highlight + field-level messages
Password weak	Requirements hint
Loading	Spinner on CTA
Success	Toast: “Account created successfully.”
🧠 Figma AI Prompt
Design a web authentication screen for store owners in a plant care platform with two tabs: Login and Register. Register form includes store name, email, password, phone, location, and optional store logo upload with preview. Add validation states: email already registered message, required fields highlight, password security requirements hint, and loading state on submit. On success show toast “Account created successfully.” then redirect to store dashboard. Professional SaaS dashboard style with botanical green accents.
🏪 2️⃣ Manage & Update Store Profile Information
🎯 Screens Needed
Store Profile View
Edit Profile Form
Save Success / Error State
🧩 Components
Store logo + store name header
Sections: Contact Info, Location, About Store
Edit button → toggles editable fields
Save Changes button
Cancel button
✅ States
State	UI
Success	“Profile updated successfully.” toast
Failure	“Update failed. Please check highlighted fields.”
Phone invalid	Inline error
Empty required	Highlight missing
🧠 Figma AI Prompt
Create a store owner profile page in a web dashboard. Include store logo, store name, contact info, phone, email, location, and about section. Provide Edit mode with Save Changes and Cancel buttons. Add validation states for invalid phone format and empty required fields. Show success toast “Profile updated successfully.” and error message “Update failed. Please check highlighted fields.” Clean admin dashboard UI.
🛒 3️⃣ Products: Add + Edit Existing Product Information
You’ll want one Products module with two modals: Add Product + Edit Product.
🎯 Screens Needed
Products List Page
Add Product Modal
Edit Product Modal
Validation + Success toasts
🧩 Components
Products table with:
Product Name
Category
Price
Stock
Status (In stock / Low / Out)
Actions (Edit / Delete optional)
Search + filters (category, stock)
Add Product button
Product form fields:
Name, Category, Price, Stock, Description, Image upload
✅ States
Rule	UI
Price <= 0	“Price must be a positive number.”
Stock < 0	“Stock cannot be negative.”
Name empty	“Product name cannot be empty.”
Add success	“Product added successfully.”
Edit success	“Product updated successfully.”
🧠 Figma AI Prompt
Design a web dashboard Products module for a plant store owner. Include a searchable, filterable products table with columns: product name, category, price, stock, status, and actions. Add “Add Product” modal and “Edit Product” modal with fields: name, category, price, stock, description, and image upload with preview. Include validation errors: price must be positive, stock cannot be negative, name required. Show success toasts “Product added successfully.” and “Product updated successfully.” Professional SaaS dashboard layout.
🧰 4️⃣ Offer Temporary Plant Care Services (Publish Services)
🎯 Screens Needed
Services List Page
Add Service Modal
Publish Success / Date Error state
🧩 Components
Services table/cards:
Title
Price/day
Available dates
Status (Active / Paused)
Actions (Edit / Unpublish optional)
Add Service button
Add Service form:
Title, Description, Price per day, Date range picker
Publish button
✅ States
Rule	UI
Invalid date range	“Please select valid dates.”
Empty title	Inline error
Price <= 0	Inline error
Success	“Service published successfully.”
🧠 Figma AI Prompt
Create a Services management page for store owners in a plant care dashboard. Show a list/table of services with title, price per day, available dates, status, and actions. Include “Add Service” modal with fields title, description, price per day, and date range picker. Add validation states: title required, price must be positive, invalid date range message “Please select valid dates.” On publish show toast “Service published successfully.” Clean modern dashboard UI.
⭐ 5️⃣ View Customer Ratings and Feedback
🎯 Screens Needed
Ratings Overview Page
Reviews List with filters
Empty Reviews State
🧩 Components
Average rating summary card (stars + number)
Breakdown bar (5★…1★)
Reviews list:
User name (or anonymous)
Star rating
Date
Review text
Filters: rating, newest/oldest, keyword search
✅ States
State	UI
No reviews	“No reviews yet.”
Loading	Skeleton list
Access control	Redirect to login if not authenticated
🧠 Figma AI Prompt
Design a Ratings & Feedback page for a plant store owner dashboard. Include an average rating summary card with star display, review count, and rating breakdown bars. Add a scrollable reviews list showing reviewer, star rating, date, and review text, with filters (rating, sort, search). Include loading skeleton state and empty state message “No reviews yet.” Professional dashboard style.
📥 6️⃣ Receive Temporary Plant Care Requests
🎯 Screens Needed
Requests List Page (Pending / Accepted / Declined tabs)
Request Details Drawer/Page
Empty State
🧩 Components
Tabs: Pending | Accepted | Declined | Completed (optional)
Request cards/table:
Customer name
Service requested
Dates
Plant count
Status badge
Click item → opens details
✅ States
State	UI
No requests	“No service requests available.”
New request	“New request” badge
Invalid / inactive service (admin-side rule)	show status “Unavailable” (optional)
🧠 Figma AI Prompt
Create a Requests inbox page for store owners to view plant care service requests. Include tabs for Pending, Accepted, Declined, and optional Completed. Display requests in a table or cards showing customer name, service type, dates, plant count, and status badges. Clicking a request opens a detailed view. Include empty state message “No service requests available.” Clean SaaS dashboard UI.
✅ 7️⃣ Manage and Respond to Service Requests (Accept / Reject)
This is the Request Details experience.
🎯 Screens Needed
Request Detail View
Confirm Accept Modal
Reject Modal with optional reason
Success states
🧩 Components
Request Detail shows:
Customer info + contact method
Service type
Requested date/time
Address / pickup preference
Notes
Plant count
Buttons:
Accept (primary)
Reject (danger)
Disabled if already responded
Reject flow:
Optional note textarea
Confirm Reject button
✅ States
Rule	UI
Already responded	Disable buttons + label “Already processed”
Accept success	“Request approved successfully.”
Reject success	“Request declined.”
🧠 Figma AI Prompt
Design a request detail screen for store owners to manage plant care service requests. Include customer info, service details, requested dates, plant count, address/pickup preference, and notes. Add action buttons Accept and Reject. Include modal confirmations: accept confirmation and reject modal with optional note field. After decision show success messages “Request approved successfully.” and “Request declined.” Disable actions if request already processed. Professional dashboard UI.
✅ Global Dashboard Shell (Use this in Figma once)
If you want consistency, tell Figma to reuse one shell:
Left sidebar: Overview, Profile, Products, Services, Requests, Ratings
Top bar: Store name, notifications bell, account menu
Main content: cards + tables + filters
Add this sentence to every prompt:
Use a consistent dashboard shell with sidebar navigation, top bar, and responsive desktop layout. Include loading, empty, success toast, and error states across all pages.