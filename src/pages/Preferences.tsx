import { useState } from "react";
import CategoryPicker from "@/components/Preferences/CategoryPicker";
import QuizOptions from "@/components/Preferences/QuizOptions";

const Preferences = () => {
  const [activeSection, setActiveSection] = useState("categories");

  return (
    <>
      {activeSection === "categories" && (
        <CategoryPicker setActiveSection={setActiveSection} />
      )}
      {activeSection === "options" && <QuizOptions setActiveSection={setActiveSection} />}
    </>
  );
};

export default Preferences;
