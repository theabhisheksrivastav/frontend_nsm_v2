// import footerImage from "/src/assets/Images/contact_img.png"; // Assuming the image is in the public folder
import footerImage from "../assets/images/Indian_girl_footer_section.png";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="footer-background">
        <footer className="container mx-auto max-w-[1200px] relative z-20 mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Image that will be hidden on mobile view */}
            <div className="z-10 hidden lg:block relative">
              <img
                src={footerImage}
                alt="Image Loading ..."
                className="w-full md:w-[300px] h-auto select-none mt-[5rem] mb-[-1.5rem] top-20" // Adjusted margin-bottom to touch the black section
                data-aos="fade-right"
                data-aos-duration="3000"
              />
            </div>

            <div className="py-10 pt-20 w-full text-black px-6">
              <div className="flex flex-col md:flex-row justify-between text-1xl pr-10">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                  <h3 className="font-bold mb-4">Get In Touch</h3>
                  <p className="mt-2">
                    <FaLocationDot className="inline mr-2" />
                    7th Floor, Yamuna Building, 86, Golaghata Rd, Dakshindari,
                    Kolkata - 700048
                  </p>
                  <p className="mt-2">
                    <IoCall className="inline mr-2" />
                    +91 8981037010
                  </p>
                  <p className="mt-2">
                    <MdEmail className="inline mr-2" />
                    contact@ntsmatrics.com
                  </p>
                </div>

                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                  <h3 className="font-bold mb-4">Our Services</h3>
                  <ul>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/">Cryptocurrency Exchange Services</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/">Cryptocurrency Ticker</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/blogs">Blog</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/features">Features</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/roadmap">Roadmap</Link>
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-1/3">
                  <h3 className="font-bold mb-4">Quick Links</h3>
                  <ul>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/">AML & KYC</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/terms">Terms & Condition</Link>
                    </li>
                    <li>
                      <IoIosArrowForward className="inline mr-2" />
                      <Link to="/pricy&policy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section className="bg-black">
        <div className="container mx-auto text-white text-center p-2">
          &copy;2024 NORTH STAR METRICS, All Right Reserved.
        </div>
      </section>
    </>
  );
};

export default Footer;