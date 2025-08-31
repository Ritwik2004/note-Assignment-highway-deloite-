import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteItem from "../components/NoteItem.components.jsx";
import { Sun } from "lucide-react";
import axios from "axios";
import { fetchNotes } from "../context/AuthContext.jsx";
import { deleteNotes } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  // const [user, setUser] = useState({});
  const navigate = useNavigate();

  // LocalStorage data
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  const pic = localStorage.getItem("Pic");

  // Fetch user + notes
  useEffect(() => {
    const fetchData = async () => {
      try {

        // ✅ need route: GET /notes
        const notesRes = await fetchNotes({
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        console.log("Notes API response:", notesRes.data);

        // 🛠 Ensure notes is always an array
        const fetchedNotes = Array.isArray(notesRes.data)
          ? notesRes.data
          : notesRes.data.notes || [];

        setNotes(fetchedNotes);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };
    fetchData();
  }, []);

  // Delete a note
  const handleDeleteNote = async (id) => {
  try {
    await deleteNotes(id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    });

    setNotes(notes.filter((n) => n._id !== id)); // ✅ use _id
  } catch (err) {
    console.error("Delete note failed", err);
  }
};


  // Create a new note
  // const handleCreateNote = async () => {
  //   const newNoteText = prompt("Enter your new note:");
  //   if (!newNoteText || newNoteText.trim() === "") return;

  //   try {
  //     // ✅ need route: POST /notes
  //     const res = await axios.post(
  //       "need route",
  //       { text: newNoteText },
  //       { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
  //     );

  //     console.log("Create Note API response:", res.data);

  //     // 🛠 Ensure the new note object is valid
  //     setNotes([res.data, ...notes]);
  //   } catch (err) {
  //     console.error("Create note failed", err);
  //   }
  // };

  // Logout
  const handleLogout = async () => {
    try {
      console.log("hit logout")
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("Name");
      localStorage.removeItem("Email");
      localStorage.removeItem("Pic");
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Sun className="text-blue-600" /> HD
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium underline cursor-pointer text-blue-600 hover:text-blue-500"
          >
            Sign Out
          </button>
        </header>

        {/* Main */}
        <main className="mt-4">
          <div className="flex items-center gap-3">
            {/* {pic && (
              <img
                src={pic}
                alt="profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            )} */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {name}!</h2>
              <span className="text-sm text-gray-700">Email: {email}</span>
            </div>
          </div>

          <button
            onClick={()=>navigate("/noteCreation")}
            className="mt-6 w-full flex justify-center cursor-pointer py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Note
          </button>

          {/* Notes List */}
          <div className="mt-8 space-y-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteItem
                  key={note.id || note._id}
                  note={note}
                  onDelete={() => handleDeleteNote(note.id || note._id)}
                  onView={() => handleViewNote(note.id || note._id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">You have no notes yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
