import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateNote = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !body) {
            alert("Please fill out both fields!");
            return;
        }

        // Here you will call your backend API (need route)
        const newNote = {
            title,
            body,
        };

        console.log("Note Created:", newNote);
        // Example: axios.post("need route", newNote);

        // Clear the form after submit
        setTitle("");
        setBody("");
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Note</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Body Input */}
                    <div>
                        <label className="block mb-1 font-medium">Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter note body"
                            rows="4"
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
