import React from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import AboutPage from "./Pages/AboutPage/AboutPage";
import { Routes, Route, BrowserRouter } from "react-router";
import FAQPage from "./Pages/FAQPage/FAQPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import BankDetailPage from "./Pages/BankDetailPage/BankDetailPage";
import CardPage from "./Pages/CardPage/CardPage";
import AdminLogin from "./Pages/AdminPage/AdminLogin/AdminLogin";
import AdminDashboard from "./Pages/AdminPage/AdminDashboard/AdminDashboard";
import SearchPage from "./Pages/SearchPage/SearchPage";
import Downloads from "./Components/Downloads/Downloads";
import AddListingForm from "./Pages/AdminPage/CarListing/AddListingForm/AddListingForm";
import ProductPreview from "./Components/ProductPreview/ProductPreview";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bank" element={<BankDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:id" element={<CardPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/listing/add-listing" element={<AdminDashboard />} />
          <Route path="/listing/edit-listing/get/:id" element={<AdminDashboard />}/>
          <Route path="/dashboard/manage-modal" element={<AdminDashboard />} />
          <Route path="/model-listing/add-model-listing" element={<AdminDashboard />}/>
          <Route path="/modal-listing/edit-modal-listing/get/:id"element={<AdminDashboard />} />
          <Route path="/dashboard/cap-links" element={<AdminDashboard />} />
          <Route path="/cap-links-listing/add-cap-links-listing" element={<AdminDashboard />}/>
          <Route path="/cap-links-listing/edit-cap-links-listing/get/:id" element={<AdminDashboard />}/>
          <Route path="downloads/:filepath/uploads/:filename" element={<Downloads />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
