'use client'
import { BeatLoader } from "react-spinners";

const Loader = ({ className, size, color }) => {
  return (
    <BeatLoader className={className} role="loader" size={size} color={color} />
  );
};

export default Loader;
