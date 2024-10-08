const Spinner = ({ color = "blue" }) => {
  return (
    <div
      className={`${
        color === "blue"
          ? "spinner"
          : color === "white"
          ? "spinner-white"
          : "spinner-green"
      }`}
    ></div>
  );
};

export default Spinner;
