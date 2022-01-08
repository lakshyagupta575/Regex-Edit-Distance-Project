import React, { useState } from "react";
import Input2 from "./Input/Input2";
import MainHeader from "./MainHeader/MainHeader";
import Output from "./Output/Output";
import Footer from "./Footer/Footer";

const App = () => {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <Input2 />
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default App;
