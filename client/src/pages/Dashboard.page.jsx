import { useState, useEffect } from 'react';
import NoteItem from '../components/NoteItem.components.jsx';
import { Sun } from 'lucide-react';

// Mock data - replace with API call
const initialNotes = [
  { id: 1, text: 'This is the first note.' },
  { id: 2, text: 'This is the second note.' },
];

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({ name: 'Jonas Khanwald', Email: 'jonaskhanwald123456@gmail.com' }); // Mock user

  // Fetch notes when the component mounts
  useEffect(() => {
    // TODO: Add API call to fetch user's notes
    console.log("Fetching notes for the user...");
    setNotes(initialNotes);
  }, []);

  const handleDeleteNote = (id) => {
    // TODO: Add API call to delete the note
    setNotes(notes.filter((note) => note.id !== id));
    console.log(`Deleting note with id: ${id}`);
  };

  const handleCreateNote = () => {
    const newNoteText = prompt("Enter your new note:");
    if (newNoteText && newNoteText.trim() !== "") {
      const newNote = { id: Date.now(), text: newNoteText };
      // TODO: Add API call to create the note
      setNotes([newNote, ...notes]);
      console.log("Creating new note:", newNoteText);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout logic (clear token, redirect)
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <header className="flex justify-between items-center py-4">
           <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <Sun className="text-blue-600" /> HD
            </h1>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </header>

        <main className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h2>
          <span className="text-xl text-gray-700">Email: {user.Email}</span>
          
          <button
            onClick={handleCreateNote}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Create Note
          </button>

          <div className="mt-8 space-y-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={() => handleDeleteNote(note.id)}
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
