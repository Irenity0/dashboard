import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Subject = {
  name: string;
  color: string;
};

const Picker = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [message, setMessage] = useState<Subject | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("customSubjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
  }, []);

  const handleBtnClick = () => {
    if (subjects.length === 0) {
      setMessage(null); 
      setError(true);  
      return;
    }

    const randomIndex = Math.floor(Math.random() * subjects.length);
    const randomSubject = subjects[randomIndex];
    setMessage(randomSubject);
    setError(false); // Clear any previous error
  };

  return (
    <>
      <Button onClick={handleBtnClick}>Pick me uwu</Button>

      {error && (
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.1rem",
            color: "#f87171", // red
          }}
        >
          Add a subject first &gt;.&lt;
        </p>
      )}

      {message && (
        <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
          Hello Ire! Let's study{" "}
          <span style={{ color: message.color, fontWeight: "bold" }}>
            {message.name}
          </span>{" "}
          for a couple hours now. Good luck! (●'◡'●)
        </p>
      )}
    </>
  );
};

export default Picker;