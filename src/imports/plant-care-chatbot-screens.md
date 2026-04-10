🌿 1️⃣ Plant Care Chatbot
🎯 Screens Needed
Chatbot Home Screen
Chat Conversation Screen
Error State
Empty Message Validation State
🖥️ Screen Structure
📌 Chatbot Main Screen
Components:
Header (Back + Title “Plant Care Assistant”)
Chat message list (scrollable)
User messages (right aligned)
Bot messages (left aligned)
Typing indicator animation
Input field
Send button (disabled if empty)
📌 States Required
State	UI Behavior
Empty Chat	Show welcome message + example questions
Sending	Show typing animation
Service Error	Show red message: “Chatbot temporarily unavailable. Try again.”
Empty Input	Disable Send button
🧠 Figma AI Prompt
Copy this:
Create a modern mobile chatbot interface for a plant care app. Include a header titled “Plant Care Assistant”, scrollable chat bubbles (user right, bot left), typing animation, and a bottom fixed input field with send button. Include states: empty chat welcome message with suggested questions, disabled send button when input empty, and an error message “Chatbot temporarily unavailable. Try again.” Use soft green botanical theme, rounded cards, clean UX, mobile-first layout.
🌿 2️⃣ Q&A Forum
🎯 Screens Needed
Forum Home (Categories + Trending)
Question Details Page
Create Post Modal
Success Toast
Login Required Modal
🖥️ Forum Home Structure
Search bar
Categories tabs
Trending section
Question cards:
Title
Tags
Likes
Answer count
Bookmark icon
Pagination / Infinite scroll
📌 Validation States
Action	Required UI
Posting while not logged in	Show modal “Please log in to post.”
Post success	Toast: “Posted successfully.”
Like/bookmark	“Saved successfully.”
🧠 Figma AI Prompt
Design a modern mobile Q&A forum interface for a plant app. Include search bar, category filters, trending posts section, and question cards showing title, tags, likes, and answer count. Add a question details screen with answers and like/bookmark buttons. Include states for logged-out users (login required modal), posting success toast, and pagination. Use clean green and white botanical theme.
🌿 3️⃣ Plant Guides & Care Tips
🎯 Screens Needed
Guides Home
Filter Drawer
Guide Detail Page
Save Confirmation
🖥️ Guide Home UI
Recommended guides carousel (based on user plants)
Filter button
Filter options:
Indoor / Outdoor
Beginner
Pest Control
Watering
Guide cards:
Thumbnail
Title
Short description
Save icon
📌 States
State	Behavior
Not logged in saving	Show login required
Saved	“Added to Saved Guides.” toast
Empty	“No guides found for this filter.”
🧠 Figma AI Prompt
Create a mobile guide browsing interface for a plant care app. Include recommended guides carousel, filter drawer (Indoor, Outdoor, Beginner, Pests, Watering), guide cards with thumbnails and save icon. Include guide detail page with related guides section. Add save confirmation toast “Added to Saved Guides.” Clean botanical UI, soft green accents.
🌿 4️⃣ Temporary Plant Care Services (Nearby Stores)
⚠️ This is your most complex flow. Needs multiple screens.
🎯 Screens Needed
Services Home
Location Permission Modal
Nearby Stores List
Store Details
Booking Form
Request Submitted
Request Status Screen
Notification Screen
🖥️ Services Flow UI
1️⃣ Location Permission
Allow Location
Enter manually
2️⃣ Store List
Map preview
List view:
Store name
Rating
Distance
Services offered
Price range
3️⃣ Booking Form
Fields:
Service Type (dropdown)
Date picker (future only)
Time picker
Plant count
Notes
Address
Contact method
Pickup preference toggle
Submit button
📌 Validation Required
Rule	UI Behavior
No location	Block with error
Past date	Show red validation
Missing required fields	Inline errors
Success	Show status “Pending”
🧠 Figma AI Prompt
Design a multi-step booking flow for a plant care services feature in a mobile app. Include location permission modal, nearby store list with ratings and prices, store details screen, and booking form with service type dropdown, future-only date/time picker, plant count, notes, address, contact method, and pickup preference. Include validation errors for past date and missing fields. Show booking confirmation screen with status labels: Pending, Accepted, Declined. Botanical green theme, clean modern UX.
🌿 5️⃣ Rate Plant Stores
🎯 Screens Needed
Orders History
Rate Provider Screen
Success Confirmation
🖥️ Rate UI
Star rating component (1–5)
Tags (fast, friendly, affordable)
Text review box
Submit button
📌 Validation
Rule	UI
Not completed	Disable rating
Profanity	Error message
Success	“Thanks for your review!”
🧠 Figma AI Prompt
Create a rating screen for a plant service app. Include star rating component (1–5), selectable tags (fast, friendly, friendly staff, affordable), optional review text box, and submit button. Disable rating if service not completed. Include success message “Thanks for your review!” Modern botanical UI.
🌿 6️⃣ Edit Profile
🎯 Screens Needed
Profile View
Edit Profile
Password Change
Success Message
🖥️ Edit Profile Fields
Name
Email
Phone
Password
Confirm Password
Notification Preferences (toggle)
📌 Validation
Field	Validation
Email	Valid + unique
Password	Strong + match
Phone	Correct format
🧠 Figma AI Prompt
Design a profile editing screen for a plant care mobile app. Include editable fields: name, email, phone, password, confirm password, notification preferences toggle. Include validation messages for invalid email, weak password, and password mismatch. Show success message “Profile updated successfully.” Botanical green theme, modern UI.
🌿 7️⃣ Delete Account
🎯 Screens Needed
Delete Confirmation Screen
Warning Modal
Password Confirmation
Final Success
🖥️ UI Elements
Red warning box
Text explaining data deletion
Password field
Confirm Delete (red button)
Cancel button
🧠 Figma AI Prompt
Design an account deletion flow for a plant care mobile app. Include warning screen explaining permanent deletion, password confirmation field, red confirm delete button, cancel button, and success screen “Account deleted successfully.” Use clear danger styling for destructive actions.