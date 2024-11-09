Automation tests on the (https://www.saucedemo.com) 

Project Structure
The project contains three main test scripts:

Locked_Out_User.js - Validates the error message shown when a locked-out user attempts to log in

Performance_Glitch_User.js - Verifies the login and checkout flow for a user experiencing performance glitches.

StandardUser.js - Executes a full end-to-end flow for a standard user, from login to checkout.|

Prerequisites
Node.js installed on the machine.
Chrome WebDriver installed and accessible in your system's PATH.
Run the following command to install dependencies:

npm install


1. Locked Out User Test
This script, testLoginLockedOutUser.js, checks if a locked-out user receives an error message after attempting to log in.

2. Performance Glitch User Flow
The testPerformanceGlitchUserFlow.js script simulates a user with a performance glitch and verifies login, sorting of products, and completing a purchase.

3. Standard User Flow
In testStandardUserFlow.js, a standard user logs in, selects items, checks out, and completes a purchase. This script also verifies the total price and success message.

Author
Zakir Hossain
