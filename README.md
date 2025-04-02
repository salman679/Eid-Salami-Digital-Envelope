# Eid Salami Digital Envelope

## Project Overview

Eid Salami Digital Envelope is a platform that allows users to send virtual money gifts (Eid Salami) to friends and family during Eid. The system generates a custom greeting card with an amount and a personalized message, and users can share it via WhatsApp, email, or social media. This is a simple version focusing on generating greeting cards and allowing users to share them.

## Features

### 1. **Custom Greeting Card**

- Users can enter an amount and a personalized message.
- A basic card design that displays the amount and message.
- The greeting card will have an elegant, festive design suitable for Eid.

### 2. **Sharing Options**

- Users can share the digital envelope via:
  - **WhatsApp**
  - **Email**
  - **Social Media**
- Options will allow users to easily share the digital gift with their loved ones.

### 3. **User Interface**

- A simple and clean user interface allows users to input the amount, message, and generate the greeting card.
- The design will focus on ease of use and quick interaction.

### 4. **Basic Payment Flow**

- Users can choose an amount for the Eid Salami gift.
- Integration of a basic payment system for processing the gift (e.g., PayPal or a mock payment system for testing purposes).

**Note:** Payment integration will be basic in this version for testing and simulation purposes.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (or React for future scalability)
- **Payment System :** PayPal (or mock payment system for testing purposes)
- **Sharing Integration:** WhatsApp API, Email API, Social Media API (for sharing links)
- **Design:** Basic UI/UX design for smooth user interaction

## How to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/salman679/eid-salami-digital-envelope.git
   cd eid-salami-digital-envelope
   ```

2. **Install Dependencies:**
   (if using npm for a JavaScript project)

   ```bash
   npm install
   ```

3. **Start the project:**

   - For a static HTML/CSS/JS project:
     Open `index.html` in your browser.

   - For a React project:
     ```bash
     npm start
     ```

4. **Access the app:**
   Once the project is running, visit `http://localhost:3000` or the designated URL in your browser.

## How to Use

1. **Generate Eid Salami Card:**

   - Open the platform and enter the amount you wish to send as Eid Salami.
   - Add a personalized message for the recipient.
   - Click "Generate Card" to create the custom Eid greeting card.

2. **Share the Card:**

   - After generating the card, click on one of the sharing options (WhatsApp, Email, or Social Media).
   - Share the digital envelope with your friends and family.

3. **Payment Flow:**
   - Choose your payment amount.
   - Complete the payment process using PayPal (or mock payment system for testing).
   - Once the payment is successful, the greeting card will be generated.

## Future Features (For Future Versions)

- **Multiple Payment Methods:** Integration with more payment systems (e.g., Stripe, Credit/Debit Cards).
- **Customizable Greeting Cards:** More card designs and customization options.
- **User Accounts:** Allow users to save their previous messages and card designs.
- **Analytics Dashboard:** Track how many cards have been sent and popular gift amounts.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository, create a new branch, and submit a pull request with your improvements.

### Steps for contributing:

1. Fork the repository
2. Create a new branch for your feature
3. Implement your changes
4. Commit your changes and push to your forked repository
5. Create a pull request to the main repository

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Acknowledgements

- **Eid Salami Card Design:** Simple design to reflect the spirit of Eid.
- **Payment System Integration:** PayPal used for processing basic payments (mock payments in v0 for testing purposes).
