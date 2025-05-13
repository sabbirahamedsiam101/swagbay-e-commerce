import React from "react";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router";
import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";
function Footer() {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p className="flex ">
            <span>
              <LuMapPin />
            </span>
            123, London Bridge Street, London
          </p>
          <p className="flex ">
            <span>
              <MdOutlineEmail />
            </span>
            support@lebaba.com
          </p>
          <p className="flex ">
            <span>
              <MdOutlinePhone />
            </span>
            (+012) 3456 789
          </p>
        </div>

        <div className="footer__col">
          <h4>COMPANY</h4>
          <Link to="/">Home</Link>
          <Link to="/">About Us</Link>
          <Link to="/">Work With Us</Link>
          <Link to="/">Our Blogs</Link>
          <Link to="/">Trems & Condition</Link>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINK</h4>
          <Link to="/">Help</Link>
          <Link to="/">Track your order</Link>
          <Link to="/">Men</Link>
          <Link to="/">Women</Link>
          <Link to="/">Dresses</Link>
        </div>

        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="" />
            <img src={instaImg2} alt="" />
            <img src={instaImg3} alt="" />
            <img src={instaImg4} alt="" />
            <img src={instaImg5} alt="" />
            <img src={instaImg6} alt="" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright 2025 by Lebaba. All rights reserved.
      </div>
    </>
  );
}

export default Footer;
