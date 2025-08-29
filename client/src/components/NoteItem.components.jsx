import { Trash2 } from 'lucide-react';

const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <p className="text-gray-800">{note.text}</p>
      <button 
        onClick={onDelete} 
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Delete note: ${note.text}`}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default NoteItem;
