// src/components/NoteView.jsx
import { X } from "lucide-react";

const NoteView = ({ title, body, onClose }) => {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
    >
      <X size={24} />
    </button>

    {/* Note Content */}
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-700 whitespace-pre-line">{body}</p>
  </div>
</div>

  );
};

export default NoteView;
