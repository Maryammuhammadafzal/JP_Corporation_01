import React, { useState } from "react";
// import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
        console.log(e.target.value);
    const { name, value } = e.target;
    console.log(name , value);
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
    
  };
  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.name ,
        formData.email ,
        formData.phone ,
        formData.message);
    
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      console.log("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      alert("Message Sent")
      setFormData({ name: "", email: "", message: "", phone });
    } catch (error) {
      setLoading(false);
      console.log("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-auto bg-gray-200 h-[450px] max-[450px]:h-[500px] rounded-2xl shadow-xs justify-center flex">
      <form
        onSubmit={handleSubmit}
        className="flex w-[80%]  max-[1000px]:w-[90%] gap-3 flex-col justify-center items-center"
      >
        <div className="inputs max-[900px]:flex-col w-full gap-1 max-[900px]:gap-2 flex h-auto">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Name"
            className="w-[32%] max-[1000px]:w-[33%] max-[900px]:w-full rounded-lg border-gray-200 border shadow-xs h-12 p-3 bg-white outline-0 active:border-0 active:outline-0 focus:border-0 focus:outline-0 "
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="Email"
            className="w-[32%] max-[1000px]:w-[33%] max-[900px]:w-full rounded-lg border-gray-200 border shadow-xs h-12 p-3 bg-white outline-0 active:border-0 active:outline-0 focus:border-0 focus:outline-0 "
          />
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            placeholder="Number"
            className="w-[32%] max-[1000px]:w-[33%] max-[900px]:w-full rounded-lg border-gray-200 border shadow-xs h-12 p-3 bg-white outline-0 active:border-0 active:outline-0 focus:border-0 focus:outline-0 "
          />
        </div>
        <div className="message w-full">
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            placeholder="Message"
            className="w-full h-[170px] rounded-lg border-gray-200 border shadow-xs  p-3 bg-white outline-0 active:border-0 active:outline-0 focus:border-0 focus:outline-0"
          ></textarea>
        </div>
        <div className="flex w-full max-[450px]:flex-col max-[450px]:gap-5 items-center">
          <div className="check w-[80%] gap-3 text-md max-[950px]:text-sm max-[360px]:text-xs max-[450px]:w-full flex">
            <input
              type="checkbox"
              name="check"
              id="check"
              className="border-gray-100  border rounded-lg"
            />
            I accept the privacy policy
          </div>
          <div className="button w-[200px] max-[450px]:w-full flex justify-end">
            <button
              className="w-fit max-[600px]:w-full h-fit py-3 px-5 font-semibold text-lg text-white bg-orange-600 rounded-xl cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
