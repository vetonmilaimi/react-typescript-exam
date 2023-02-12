import { observer } from "mobx-react-lite";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/NavBar";

import Reviews from "./Reviews";
import BestSellers from "./BestSellers";
import AudioBooks from "./AudioBooks";
import Novels from "./Novels";

export default observer(function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <BestSellers />
      <Novels />
      <AudioBooks />
      

      <Reviews />
      <Footer />
      
      



      

      
      
    </>
  );
});
