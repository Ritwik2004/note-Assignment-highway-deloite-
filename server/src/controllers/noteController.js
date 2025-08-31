import Notes from "../models/noteModel.js";

const createNote = async(req, res)=>{
    try {
        const { title, body } = req.body;
        console.log("title : ",title)
        console.log("body : ",body)

        // Validation
        if (!title || !body) {
            return res.status(400).json({ message: "Title and body are required" });
        }
        console.log("note creation start")
        // Create new note
        console.log("user id : ", req.user.id)
        const newNote = new Notes({
            title,
            body,
            userID: req.user.id   // assuming req.user is set by your auth middleware
        });
        console.log("note created")
        // Save note
        await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const fetchNote = async(req,res)=>{
    try {
    const userId = req.user.id; // user ID from auth middleware

    const notes = await Notes.find({ userID: userId })
      .sort({ createdAt: -1 }); // -1 = descending (latest first)

    res.status(200).json({
      message: "Notes fetched successfully",
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

const deleteNote = async(req,res)=>{
     try {
    const noteId = req.params.id;   // note ID will come from URL params
    const userId = req.user.id;    // user ID comes from logged-in user

    // Find the note by ID and user
    const note = await Notes.findOne({ _id: noteId, userID: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found or not authorized" });
    }

    // Delete the note
    await Notes.findByIdAndDelete(noteId);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

export {
    createNote,
    fetchNote,
    deleteNote
}