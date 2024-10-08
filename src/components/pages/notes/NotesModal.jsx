import { Modal } from "@mui/material";
import apiInstance from "@/helpers/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const NotesModal = ({
  isNoteModalOpen,
  setIsNoteModalOpen,
  fetchNotes,
  mode = "add",
  noteData = null,
}) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noteData) {
      setNote({
        title: noteData.title,
        description: noteData.description,
      });
    }
  }, [noteData]);

  const onCloseHandler = () => {
    setIsNoteModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    const keys = ["title", "description"];
    for (let key of keys) {
      if (!note[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }
    try {
      setLoading(true);
      let responseData = null;
      if (mode === "add") {
        responseData = await apiInstance.addNote(note);
      } else if (mode === "update" && noteData) {
        responseData = await apiInstance.updateNote(noteData._id, note);
      }
      if (responseData && responseData.status === 200) {
        toast.success(
          mode === "add"
            ? "Note added successfully"
            : "Note updated successfully"
        );
        setIsNoteModalOpen(false);
        fetchNotes();
      }
    } catch (error) {
      console.log("Add/Update Note error => ", error);
      mode === "add"
        ? toast.error("Failed to add note")
        : toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isNoteModalOpen}
      onClose={() => setIsNoteModalOpen(false)}
      className='flex items-center justify-center'
    >
      <div className='w-[30%] outline-none'>
        <div className='h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl'>
          <div className='text-white text-[1.3rem] flex justify-center items-center relative w-full'>
            {mode === "add" ? "New Note" : "Edit Note"}
            <button
              className='cursor-pointer absolute right-0'
              onClick={onCloseHandler}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
        <form
          className='p-4 px-5 bg-white rounded-b-2xl min-h-[500px] flex flex-col justify-between'
          onSubmit={handleNoteSubmit}
        >
          <div className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Title'
              name='title'
              value={note.title}
              className='w-full border border-gray-300 rounded-md p-3 outline-none'
              onChange={handleChange}
            />
            <textarea
              placeholder='Description'
              name='description'
              className='w-full border border-gray-300 rounded-md p-3 outline-none min-h-36'
              onChange={handleChange}
              value={note.description}
            />
          </div>
          <button
            className='bg-[#036231] text-white px-4 py-3 rounded-md'
            type='submit'
          >
            {loading ? (
              <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] '>
                <div className='w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
              </div>
            ) : mode === "add" ? (
              "Save Note"
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NotesModal;
