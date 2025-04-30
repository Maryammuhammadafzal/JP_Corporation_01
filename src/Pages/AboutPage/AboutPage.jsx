import React, { useState , useEffect , useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Footer/Footer";
import About_Image1 from "../../assets/Images/about_image1.jpeg";
import About_Image2 from "../../assets/Images/about_image2.jpeg";
import Heading from "../../Components/Heading/Heading";
import CounterItem from "../../Components/CounterItem/CounterItem"
const AboutPage = () => {
  
  return (
    <div className="about w-full min-h-screen flex flex-col overflow-x-hidden justify-center items-center">
      <div className="navbar w-full h-[120px]">
        <Navbar bg="gray-800" />
      </div>
      <div className="about w-[95%] h-auto flex items-center flex-col gap-5">
        <div className="aboutcontent max-[1200px]:flex-col max-[1200px]:items-start w-[98%] h-auto justify-evenly items-center flex gap-3">
          <div className="aboutText max-[900px]:order-2 w-[800px] max-[850px]:w-full h-auto gap-3 flex  flex-col">
            <div className="headings w-full h-auto max-[1160px]:items-center flex p-4  gap-3">
              <Heading text="About Us" />
            </div>
            <div className="paras space-y-5 w-full h-auto flex flex-col gap-3 ">
              <p className="specialText my-3 tracking-wide font-bold text-neutral-500 text-xl max-[600px]:text-[16px]">
                Greetings from JP Corporation, your go-to place for top-notch
                used car sales and purchases. We work hard to make the
                car-buying process easy, clear-cut, and joyful because we are
                passionate about vehicles and dedicated to providing outstanding
                customer service.
              </p>
              <p className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                We at JP Corporation recognize the importance of the decision
                you make when buying an automobile. To accommodate every
                lifestyle and price range, we have thus carefully chosen a wide
                range of well-maintained automobiles. We offer the ideal car to
                suit your needs, whether you’re looking for a sporty sedan, a
                sturdy SUV, or a dependable family minivan.
                <br />
                Our commitment to ethics and openness makes us unique. We are
                committed to giving our clients all the information they require
                in order to make wise choices. For this reason, every one of our
                ads includes comprehensive car histories, complete with odometer
                readings, accident reports, and service information. Every step
                of the process, we want you to feel comfortable and confident
                about your purchase.
                <br />
                Throughout the purchasing process, our team of knowledgeable
                automotive specialists is here to help. Our commitment to
                delivering individualized attention and assistance to guarantee
                your total satisfaction extends beyond simply helping you select
                the ideal automobile.
                <br />
                We appreciate you selecting JP Corporation for all of your car
                requirements. We are eager to assist you!
              </p>
              <div className="para2 w-full h-auto flex flex-col gap-3">
                <h3 className="border-l-4 h-[50px] pl-5 text-2xl font-bold border-orange-600">
                  Our mission statement
                </h3>
                <p className="mt-5 text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  Our goal at JP Corporation is to completely transform the
                  automobile-purchasing process by offering a flawless online
                  environment where openness, confidence, and client happiness
                  are prioritized. We are dedicated to providing a carefully
                  chosen range of excellent used cars that have been thoroughly
                  examined and presented in an open manner, enabling customers
                  to make selections with confidence. Motivated by our love of
                  automobiles and commitment to quality, we work hard to always
                  go above and beyond expectations. From perusing our inventory
                  to obtaining financing and beyond, our staff is committed to
                  providing individualized care and assistance to each and every
                  customer.
                </p>
              </div>
              <div className="para2 w-full h-auto flex flex-col gap-3">
                <h3 className="border-l-4 h-[50px] pl-5 text-2xl font-bold border-orange-600">
                  Our vision
                </h3>
                <p className="mt-5 text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  Our goal at JP Corporation is to be the go-to place for auto
                  shoppers looking for a simple, clear, and pleasurable online
                  purchasing experience. Our goal is to become the reliable
                  resource that clients turn to when they’re looking for the
                  ideal car, offering them individualized attention,
                  professional advice, and a dedication to quality. “Our goal at
                  JP Corporation is to transform the overall car-buying process
                  in addition to becoming the go-to place for purchasers. In our
                  ideal future, buying a car is a fun and empowering experience
                  rather than just a transaction.
                </p>
              </div>
            </div>
          </div>
          <div className="aboutImage w-auto h-[90%] max-[900px]:order-1 max-[1200px]:w-full flex flex-col gap-5 justify-between items-center">
            <img
              src={About_Image1}
              alt="image1"
              className="w-[450px] max-[1200px]:w-full h-[450px] max-[1200px]:h-[400px] max-[900px]:h-[250px] max-[1200px]:my-5 shadow-lg rounded-xl"
            />
            <img
              src={About_Image2}
              alt="image1"
              className="w-[450px] h-[450px] max-[1200px]:w-full max-[1200px]:h-[400px] max-[900px]:h-[250px] max-[1200px]:my-5 shadow-lg rounded-xl"
            />
          </div>
        </div>
        <div className="rating w-[95%] justify-center my-5 h-auto max-[900px]:flex-col max-[900px]:items-center flex ">
          <div className="ratingLeft w-[50%] max-[900px]:w-full min-[900Px]:border-r max-[900px]:border-b border-neutral-400 ml-10 h-auto flex gap-3 max-[900px]:flex-col  justify-start items-center">
          <CounterItem target={15} />
            <p className="text-4xl font-extrabold text-black tracking-wide">
              Years in <br /> Business
            </p>
          </div>
          {/* <hr className="text-gray-300 my-5 w-[140px] "/> */}
          <div className="ratingright w-[50%] max-[450px]:flex-col max-[900px]:w-full h-auto flex justify-evenly items-center ">
            <div className="1 w-auto h-auto flex flex-col gap-2 text-center">
            <CounterItem target={158} />
              <h5 className="subheading text-xl text-orange-600 ">
                Specialist
              </h5>
            </div>
            <div className="1 w-auto h-auto flex flex-col gap-2 text-center">
            <CounterItem target={50} />
              <h5 className="subheading text-xl text-orange-600 ">Car Sold</h5>
            </div>
            <div className="1 w-auto h-auto flex flex-col gap-2 text-center">
            <CounterItem target={8} />
              <h5 className="subheading text-xl text-orange-600 ">
                Localization
              </h5>
            </div>
          </div>
        </div>
        <div className="chooseUs flex flex-col justify-center items-center w-[95%] max-[850px]:w-full gap-3 h-auto p-3">
          <div className="heading my-5 text-center">
            <Heading text="Why Choose Us" />
          </div>
          <div className="chooseUsContent w-full h-auto flex flex-col gap-3 justify-center items-center">
            <p className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
              We want the process of purchasing a car to be as easy and fun as
              we can since we at JP Corporation recognize that it’s an important
              decision. We should be your first choice for any and all
              car-related requirements.
            </p>
            <ul className="w-full h-auto p-3 flex flex-col">
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  High-quality Selection:
                </span>{" "}
                Thoroughly tested to guarantee dependability and performance,
                our carefully chosen inventory offers a wide range of premium
                pre-owned automobiles. We offer the ideal car to fit your needs,
                whether you’re looking for a sporty sedan, a tough SUV, or a
                reasonably priced minivan for the whole family.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Transparent rates:
                </span>{" "}
                We value being truthful and open in all of our business
                interactions. No hidden costs or unpleasant surprises—just
                reasonable, competitive, and up-front pricing. For you to feel
                confident in your decision-making, we offer thorough information
                and extensive car histories.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Distinguished Client Care:
                </span>{" "}
                We put your pleasure first. Personalized attention and
                assistance are the hallmarks of our team of automotive
                professionals at every turn. Our goal is to make the process of
                purchasing a car easy, stress-free, and joyful for you, from
                helping you choose the ideal automobile to obtaining finance and
                beyond.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Simple Financing choices:
                </span>{" "}
                We provide flexible financing choices that are suited to your
                needs since we recognize that purchasing a car may be a
                complicated process. Our financing professionals will work with
                you to identify the finest option that works within your budget,
                regardless of your credit history—good, terrible, or
                nonexistent.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Convenient Online Experience::
                </span>{" "}
                From the comfort of your home, you can explore our inventory,
                arrange test drives, and make your purchase with our easy-to-use
                interface. Buying for your next automobile may be done easily,
                conveniently, and worry-free with our safe online platform.
              </li>
            </ul>
          </div>
        </div>
        <div className="steps flex flex-col justify-center items-center w-[95%] max-[850px]:w-full gap-3 h-auto p-3">
          <div className="heading my-5 max-[850px]:text-center">
            <Heading text="How to buy a car; step-by-step guide" />
          </div>
          <p className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px] mb-5">
            {" "}
            Convenience, flexibility, and peace of mind are provided by online
            auto purchases. To get your ideal automobile from JP Corporation,
            just follow these easy steps:
          </p>
          <div className="steps flex flex-col justify-center items-center w-full gap-5">
            <ul className="w-full h-auto p-3 flex flex-col">
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Browse our website:
                </span>{" "}
                <br />
                Browse our large selection of pre-owned cars by visiting our
                website. To focus your choices depending on manufacturer, model,
                price, and other considerations, use our search filters.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Examine the vehicle’s details:
                </span>{" "}
                <br />
                To read comprehensive details on a car, including pictures,
                features, specs, and costs, click on the listing. Take your time
                weighing your alternatives to choose which automobile best suits
                your needs
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Request Financing:
                </span>{" "}
                <br />
                We provide numerous financing solutions to fit your needs and
                budget. Use our online financing application to quickly and
                simply become pre-approved. Together, you and our financial
                experts will choose the ideal financing option for your
                requirements.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Examine Your Buying Options:
                </span>{" "}
                <br />
                Discuss your buying possibilities with our sales staff after
                your test drive. We’ll provide you a thorough explanation of the
                costs, financing options, and any extra services or guarantees
                that are offered.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Finish off Your Purchase:
                </span>{" "}
                <br />
                When you’re prepared to proceed, we’ll walk you through every
                step of the buying procedure. Sign the required paperwork safely
                and electronically from the comfort of your own home.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Schedule a Pickup or Delivery:
                </span>{" "}
                <br />
                Select if you want your car delivered right to your door or
                picked up from our dealership. We’ll handle logistics to make
                sure everything goes smoothly and without a hitch.
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Enjoy Your New Vehicle:
                </span>{" "}
                <br />
                Best wishes! Now that you possess a high-quality used car from
                JP Corporation, you may drive with pride. Savor the thrill of
                driving your new vehicle and the freedom it brings
              </li>
              <li className="list-decimal text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                {" "}
                <span className="tracking-wide font-bold text-neutral-500 text-lg max-[450px]:text-[16px] max-[350px]:text-[14px]">
                  Stay connected with us:
                </span>{" "}
                <br />
                Remember to remain in touch with us for any upcoming service
                requirements, upkeep advice, and exclusive deals. We are
                available to assist you at every stage of your ownership
                experience Are you prepared to begin the online car-buying
                process? Experience the ease of buying a car online with JP
                Corporation by browsing our inventory today.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
