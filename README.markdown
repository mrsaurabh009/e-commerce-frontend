# E-Shop: A Modern E-Commerce Frontend

E-Shop is a fully responsive, feature-rich e-commerce website built with modern web technologies. It provides a seamless shopping experience with dynamic product listings, cart management, user authentication, and a mobile-friendly hamburger menu for navigation. This project showcases advanced frontend development skills, including responsive design, animations, and client-side interactivity.

## Features

- **Responsive Design**: Optimized for all devices, with a 4-column product grid on desktop, scaling down to 3, 2, or 1 column(s) on smaller screens (1200px, 900px, 600px breakpoints).
- **Hamburger Menu**: Collapsible navigation menu for tablets and mobile devices (≤900px), with smooth slide-in animations.
- **Product Management**: Dynamic product listing with filtering by category and sorting by price, including variation selection (e.g., color, size).
- **Cart Functionality**: Add, update, and remove items from the cart, with real-time total and item count updates, stored in `localStorage`.
- **User Authentication**: Login and registration forms with a modal interface, plus profile management for updating user details.
- **Interactive UI**: Smooth animations (fade-in, slide-in, slide-up) and transitions (hover effects, button scaling) for an engaging user experience.
- **Accessibility**: High-contrast design, ARIA labels for social links, and focus states for interactive elements.
- **Error Handling**: Robust client-side validation and error handling for localStorage operations and user inputs.

## Demo
**Live** : [Click](https://mrsaurabh009.github.io/e-commerce-frontend/)


## Screenshots

![Desktop View](screenshots/desktop.png)
![Mobile View with Hamburger Menu](screenshots/mobile.png)
![Product Grid](screenshots/product-grid.png)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/eshop-frontend.git
   cd eshop-frontend
   ```

2. **Serve the Project**:
   - Option 1: Open `index.html` directly in a browser (no server required for static files).
   - Option 2: Use a local development server for a better testing experience:
     ```bash
     npm install -g http-server
     http-server .
     ```
     Then navigate to `http://localhost:8080` in your browser.

3. **Dependencies**: No external dependencies are required, as the project uses vanilla JavaScript and CSS. Placeholder images are loaded from `https://via.placeholder.com`.

## Usage

1. **Navigation**:
   - On desktop (>900px), use the horizontal navigation bar to access Home, Products, Cart, Profile, or Login/Logout.
   - On tablets and mobile (≤900px), click the hamburger menu icon to toggle the vertical navigation menu.
2. **Product Browsing**:
   - Filter products by category or sort by price using the dropdowns in the Filters section.
   - Search for products using the search bar in the navigation.
3. **Cart Management**:
   - Add products to the cart with selected variations (e.g., color, size).
   - Update quantities or remove items from the cart in the Cart section.
   - Proceed to checkout (requires login).
4. **User Management**:
   - Log in or register via the modal accessed through the Login button.
   - Update profile details in the Profile section (requires login).
5. **Testing Responsiveness**:
   - Resize the browser window or use developer tools to test layouts at various breakpoints (1440px, 1200px, 900px, 600px, 360px).

## Project Structure

```
eshop-frontend/
├── index.html        # Main HTML file
├── styles.css        # Responsive CSS with animations and transitions
├── app.js            # JavaScript for dynamic functionality
├── screenshots/      # Folder for demo images (add your own)
└── README.md         # Project documentation
```

## Technologies Used

- **HTML5**: Semantic structure for accessibility and SEO.
- **CSS3**: Flexbox, CSS Grid, animations, transitions, and media queries for responsive design.
- **JavaScript (Vanilla)**: Client-side logic for product management, cart functionality, and user authentication.
- **LocalStorage**: Temporary data storage for cart and user data (to be replaced with a backend in production).

## Future Improvements

- **Backend Integration**: Replace `localStorage` with a Node.js/Express backend and MySQL/PostgreSQL database for persistent storage and secure authentication.
- **Payment Gateway**: Integrate Stripe or PayPal for real checkout functionality.
- **Admin Panel**: Add a dashboard for managing products and orders.
- **Pagination**: Implement product pagination or infinite scroll for large catalogs.
- **Accessibility Enhancements**: Add ARIA attributes for the hamburger menu and improve keyboard navigation.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Author**: Saurabh Kumar
- **GitHub**: [Profile](https://github.com/mrsaurabh009)
- **LinkedIn**: [Profile](https://www.linkedin.com/in/mrsaurabh009)

---

Built with 💻 and ☕ by Saurabh Kumar to showcase frontend development skills.
