import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

type Subject = {
  name: string;
  color: string;
};

const SubjectManager = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectColor, setSubjectColor] = useState("#000000");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("customSubjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
  }, []);

  const handleAddSubject = () => {
    if (!subjectName.trim()) return;

    const newSubject: Subject = {
      name: subjectName.trim(),
      color: subjectColor,
    };

    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    localStorage.setItem("customSubjects", JSON.stringify(updatedSubjects));
    setSubjectName("");
  };

  const handleDeleteSubject = (indexToDelete: number) => {
    const updatedSubjects = subjects.filter((_, i) => i !== indexToDelete);
    setSubjects(updatedSubjects);
    localStorage.setItem("customSubjects", JSON.stringify(updatedSubjects));
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="color"
        value={subjectColor}
        onChange={(e) => setSubjectColor(e.target.value)}
        className="w-10 h-10"
      />
      <Button variant="secondary" onClick={handleAddSubject}>
        Add
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={subjects.length === 0}>
            Saved Subjects
          </Button>
        </DialogTrigger>

        <DialogContent aria-describedby={undefined} className="max-w-md">
          <DialogHeader>
            <DialogTitle>Saved Subjects</DialogTitle>
          </DialogHeader>

          {subjects.length === 0 ? (
            <p className="text-gray-500">No subjects saved.</p>
          ) : (
            <ul className="space-y-2 max-h-60 overflow-auto">
              {subjects.map((subj, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border px-3 py-2 rounded"
                  style={{ borderColor: subj.color }}
                >
                  <span style={{ color: subj.color }}>{subj.name}</span>
                  <button
                    onClick={() => handleDeleteSubject(index)}
                    title="Delete"
                  >
                    <X className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectManager;
