import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start" >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)"}}
      >
        © 2023 Copyright: {" "}
        <p className="text-dark d-inline" href="">
          ANYTHING
        </p>
      </div>
    </footer>
  );
};

export default Footer;
