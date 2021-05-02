import React from "react";

const Footer = () => {
  return (
    <footer className="footer fixed-bottom text-center">
      <div>
        This is a portfolio project built with React/Redux. You can see the
        description and source code in my{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Nistler/currency-converter"
          className="text-decoration-none"
        >
          repository
        </a>
        . Unfortunately, the exchange rate API has a limit of{" "}
        <span className="text-light">1500 free requests per month</span>, so
        please{" "}
        <span className="text-light">
          do not abuse the base currency change.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
