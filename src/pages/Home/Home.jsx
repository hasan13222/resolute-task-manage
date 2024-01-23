import Help from "./Home/Help";
import Hero from "./Home/Hero";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{ duration: 2 }}
      >
        <Hero />
        <Help />
      </motion.div>
    </>
  );
};

export default Home;
