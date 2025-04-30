import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Footer/Footer";
import Heading from "../../Components/Heading/Heading";
import About_Image1 from "../../assets/Images/about_image1.jpeg";
import About_Image2 from "../../assets/Images/about_image2.jpeg";
import Carousel from "../../Components/Carousel/Carousel";
import Table from "../../Components/Table/Table";
const BankDetailPage = () => {
  return (
    <div className="about w-full min-h-screen flex flex-col overflow-x-hidden justify-center items-center">
      <div className="navbar w-full h-[100px]">
        <Navbar bg="gray-800" />
      </div>
      <div className="about w-[100%] h-auto flex items-center flex-col gap-5">
        <div className="carCarousel w-full h-auto object-cover ">
          <Carousel />
        </div>
        <div className="aboutcontent max-[1200px]:flex-col max-[1200px]:items-start w-[98%] h-auto justify-evenly items-center flex gap-3">
          <div className="aboutText p-3 w-[650px] max-[850px]:w-full h-auto gap-3 flex  flex-col">
            <div className="headings w-full h-auto max-[1160px]:items-center flex p-4  gap-3">
              <Heading text="Terms and conditions:" />
            </div>
            <div className="paras space-y-5 w-full h-auto flex flex-col gap-3 ">
              <ul className="list-disc marker:text-orange-600 gap-4 flex flex-col">
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  We appreciate you selecting JP Corporation for your export
                  requirements. Our dedication is in offering you superior
                  products and outstanding service. Please take note of the
                  following terms and conditions before exporting any of our
                  goods:
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  We provide our items for sale under the conditions of FOB
                  (Free On Board) or C&F (Cost and Freight).{" "}
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  The buyer must notify the exporting country of the kind and
                  conditions of the inspection prior to export.{" "}
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  For shipping processing, a deposit ranging from 50% to 100% of
                  the entire C&F charge is needed.{" "}
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  The customer will get a Shipping Order (SO) after placing an
                  order for the shipment. At this point, the client is in charge
                  of notifying us of any changes to the consignee.{" "}
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  All relevant papers for the import procedure will be sent by
                  DHL to the buyer’s designated location when the full amount
                  has been confirmed. When the package is shipped, a DHL
                  tracking number will be given.
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  Two copies of the original Bill of Lading (BL), the original
                  export inspection certificate (if needed), the original
                  invoice, and the original export certificate will all be
                  included in the DHL shipment.
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  After the departure date, one week must pass before the
                  remaining balance of the entire C&F charge is due.
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  Individuals who meet the legal age of majority in their
                  jurisdiction or who are at least eighteen years old can
                  utilize our services. By use our website, you affirm that you
                  fulfill the necessary qualifications.{" "}
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  We collect, utilize, and share personal information in
                  accordance with our privacy policy. You agree to the
                  collection, use, and dissemination of your personal data in
                  line with our privacy policy by using our website.
                </li>
                <li className="text-neutral-500 tracking-wide text-[16px] max-[450px]:text-[14px] max-[350px]:text-[12px]">
                  We appreciate you taking the time to read our terms and
                  conditions. Please do not hesitate to contact us if you need
                  additional information or if you have any queries.
                </li>
              </ul>
             
             
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
        <div className="w-full h-auto flex justify-center items-center">
                <Table/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BankDetailPage;
