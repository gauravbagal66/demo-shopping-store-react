import React, { useEffect, useState } from "react";

import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePay,
  faCcMastercard,
  faCcPaypal,
  faCcAmex,
  faApplePay,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";

import logo from "./assets/logo.png";
import usd from "./assets/usa.png";

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return { props: { products } };
}
function App() {
  const [products, setProducts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [sortedProducts, setSortedProducts] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("RECOMMENDED");

  const sortOptions = [
    "Recommended",
    "Newest First",
    "Popular",
    "Price: High to Low",
    "Price: Low to High",
  ];

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);

    let sorted = [...products]; // clone original list

    switch (option) {
      case "Price: High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Price: Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Newest First":
        sorted.sort((a, b) => b.id - a.id); // assuming ID = time-based
        break;
      case "Popular":
        sorted = [...products]; // No popularity field, so fallback
        break;
      default:
        sorted = [...products]; // Recommended = default
    }

    setSortedProducts(sorted);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setSortedProducts(data); // set initially
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      {/* <Head>
        <title>Discover Our Products</title>
      </Head> */}

      <header className="header">
        <div className="top-row">
          <div className="spacer"></div>
          <button
            className="hamburger"
            href="/"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
          <div className="logo">
            <img src={logo} alt="Logo" id="logoo" />
          </div>

          <div className="logo-text">LOGO</div>

          <div className="icons">
            <span>🔍</span>
            <span>❤️</span>
            <span>🛒</span>
            <span>👤</span>
            <span className="lang">ENG ▼</span>
          </div>
        </div>
        <nav className="nav">
          <a href="/shop">SHOP</a>
          <a href="/skills">SKILLS</a>
          <a href="/stories">STORIES</a>
          <a href="/about">ABOUT</a>
          <a href="/contact">CONTACT US</a>
        </nav>
      </header>

      <div className="below-nav-links">
        <a href="/home">HOME</a> | <a href="/shop">SHOP</a>
      </div>

      <main className="container">
        <section className="intro">
          <h1 className="title">DISCOVER OUR PRODUCTS</h1>
          <p className="subtitle">
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
            dolor.
          </p>
        </section>

        <section className="filter-bar">
          <div className="filter-left">
            <div className="items-count">{products.length} ITEMS</div>
            <button className="show-filter">&gt; SHOW FILTER</button>
          </div>
          {/* ------------------------------------------------------------------------------ */}

          {/* <div className="sort">RECOMMENDED ▼</div> */}

          <div className="sort-dropdown">
            <div
              className="sort-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedSort} ▼
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {sortOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="grid">
          {sortedProducts && sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <article key={product.id} className="card">
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p className="price">${product.price}</p>
                <p className="signin-message">
                  <a href="#">Sign in</a> or Create an account to see pricing
                </p>
              </article>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="newsletter">
            <h3>BE THE FIRST TO KNOW</h3>
            <p>Sign up for updates from mettā muse.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your e-mail..." />
              <button>SUBSCRIBE</button>
            </div>
          </div>
          <div className="contact">
            <h3>CONTACT US</h3>
            <p>+44 221 133 5360</p>
            <p>customercare@mettamuse.com</p>
            <h3>CURRENCY</h3>
            <p id="us">
              <img src={usd} alt="usd" id="usd" />
              USD
            </p>
            <small>
              Transactions will be completed in Euros and a currency reference
              is available on hover.
            </small>
          </div>
        </div>
        <hr className="footer-divider" />

        <div className="footer-links">
          <div>
            <h4>mettā muse</h4>
            <ul>
              <li>About Us</li>
              <li>Stories</li>
              <li>Artisans</li>
              <li>Boutiques</li>
              <li>Contact Us</li>
              <li>EU Compliances Docs</li>
            </ul>
          </div>
          <div>
            <h4>QUICK LINKS</h4>
            <ul>
              <li>Orders & Shipping</li>
              <li>Join/Login as a Seller</li>
              <li>Payment & Pricing</li>
              <li>Return & Refunds</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4>FOLLOW US</h4>
            <div className="social-icons">
              <div className="payment-icons">
                <FontAwesomeIcon icon={faInstagram} title="Instagram" />
                <FontAwesomeIcon icon={faLinkedin} title="Linkdin" />
              </div>
            </div>
            <h4>mettā muse ACCEPTS</h4>
            <div className="payment-icons">
              <FontAwesomeIcon icon={faGooglePay} title="G Pay" id="gpay" />
              <FontAwesomeIcon icon={faCcMastercard} title="Mastercard" />
              <FontAwesomeIcon icon={faCcPaypal} title="PayPal" />
              <FontAwesomeIcon icon={faCcAmex} title="Amex" />
              <FontAwesomeIcon icon={faApplePay} title="Apple Pay" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>Copyright © 2023 mettamuse. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}

export default App;
