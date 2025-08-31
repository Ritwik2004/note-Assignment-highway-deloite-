import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import NoteView from '../pages/ViewNote.page';

const NoteItem = ({ note, onDelete }) => {
  const [showNote, setShowNote] = useState(false);
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div onClick={() => setShowNote(true)} className='cursor-pointer w-[95%]'>
        <p className="text-gray-800">{note.title}</p>
      </div>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Delete note: ${note.text}`}
      >
        <Trash2 size={20} />
      </button>


      {showNote && (
        <NoteView
          title={note.title}
          body={note.body}
          onClose={() => setShowNote(false)}
        />
      )}
    </div>
  );
};

export default NoteItem;
