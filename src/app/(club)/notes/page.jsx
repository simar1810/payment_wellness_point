"use client";

import { Backicon, Editicon, Searchicon } from "@/components/svgs";
import { GrNotes } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import apiInstance from "@/helpers/api";
import NotesModal from "@/components/pages/notes/NotesModal";
import { MdDeleteOutline } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { Modal } from "@mui/material";
import toast from "react-hot-toast";

const Page = () => {
  const [notes, setNotes] = useState([]);
  const [isAddNotesModalOpen, setIsAddNotesModalOpen] = useState(false);
  const [isUpdateNotesModalOpen, setIsUpdateNotesModalOpen] = useState(false);
  const [updateNoteIndex, setUpdateNoteIndex] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();

  async function fetchNotes() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getNotes();
      console.log("Fetch Notes data => ", data.data);
      if (status === 200) {
        setNotes(data.data);
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async () => {
    try {
      setDeleteLoading(true);
      const { data, status } = await apiInstance.deleteNote(
        notes[updateNoteIndex]._id
      );
      console.log("Delete Note data => ", data);
      if (status === 200) {
        fetchNotes();
        toast.success("Note deleted successfully");
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const generateUniqueColors = (numColors) => {
    const colors = new Array(numColors).fill(null).map(() => {
      let color;
      do {
        color = `#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`;
      } while (isInvalidColor(color));
      return color;
    });
    return colors;
  };

  const isInvalidColor = (color) => {
    const { r, g, b } = hexToRgb(color);
    const isWhite = r > 200 && g > 200 && b > 200;
    const isGreen = g > 150 && r < 100 && b < 100;
    return isWhite || isGreen;
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const noteColors = useMemo(
    () => generateUniqueColors(notes.length),
    [notes.length]
  );

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      note.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className='w-full h-full'>
      <div className='bg-white border-t flex items-center justify-between p-4'>
        <div className='flex items-center gap-4'>
          <button onClick={() => router.back()} className='cursor-pointer'>
            <Backicon h={18} w={18} c='#000' />
          </button>
          <h1 className='font-bold text-xl'>Notes</h1>
        </div>
        <button
          className='bg-[#036231] text-white px-4 py-2 rounded-md'
          onClick={() => {
            setIsAddNotesModalOpen(true);
          }}
        >
          + Add Notes
        </button>
      </div>
      <div className='w-full h-full flex justify-center p-4 px-8'>
        <div className='bg-white rounded-lg w-full max-w-screen-xl h-fit min-h-[600px]'>
          <div className='flex justify-between items-center p-2 px-4 border-b'>
            <h1 className='font-semibold text-lg'>{notes.length} Notes</h1>
            <div className='flex items-center gap-4 border-b  p-2'>
              <Searchicon h={18} w={18} c='#c9c9c9' />
              <input
                type='text'
                placeholder='Search Notes'
                className='outline-none'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-96'>
              <div className='w-10 h-10 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className='flex flex-col justify-center items-center h-[500px]'>
              <div className='flex items-center justify-center bg-[#90C8444D] rounded-full p-4 mb-2'>
                <GrNotes fontSize={25} color='#036231' />
              </div>
              <h1 className='font-semibold text-lg'>No Notes Available</h1>
            </div>
          ) : (
            <div className='grid grid-cols-4 gap-2 p-4'>
              {filteredNotes.map((note, index) => (
                <div
                  className='text-white rounded-md flex flex-col  p-4 max-w-[300px]'
                  key={note._id}
                  style={{ backgroundColor: noteColors[index] }}
                >
                  <h1 className='font-semibold text-lg'>{note.title}</h1>
                  <p className='text-sm mb-2'>{note.description}</p>
                  <div className='flex items-center gap-2 mt-auto'>
                    <button
                      className='bg-[#036231] rounded-md p-2 cursor-pointer'
                      onClick={() => {
                        setIsUpdateNotesModalOpen(true);
                        setUpdateNoteIndex(index);
                      }}
                    >
                      <Editicon h={15} w={15} c='#fff' />
                    </button>
                    <button
                      className='bg-[#036231] rounded-md p-2 cursor-pointer'
                      onClick={() => {
                        setIsDeletePopupOpen(true);
                        setUpdateNoteIndex(index);
                      }}
                    >
                      <MdDeleteOutline h={12} w={12} c='#fff' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddNotesModalOpen && (
        <NotesModal
          isNoteModalOpen={isAddNotesModalOpen}
          setIsNoteModalOpen={setIsAddNotesModalOpen}
          fetchNotes={fetchNotes}
        />
      )}

      {isUpdateNotesModalOpen && (
        <NotesModal
          isNoteModalOpen={isUpdateNotesModalOpen}
          setIsNoteModalOpen={setIsUpdateNotesModalOpen}
          fetchNotes={fetchNotes}
          mode='update'
          noteData={notes[updateNoteIndex]}
        />
      )}

      {isDeletePopupOpen && (
        <Modal
          className='flex items-center justify-center'
          open={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
        >
          <div className='bg-[#036231] text-white flex flex-col items-center p-4 rounded-lg min-h-40 min-w-96'>
            <div className='flex items-center justify-center'>
              <GoAlertFill color='#fff' size={40} />
            </div>
            <h1 className='font-semibold text-lg mt-2'>Are you sure?</h1>
            <p className='text-sm text-center text-gray-200 max-w-96'>
              Do you really want to delete this note? It will be deleted
              permanently
            </p>
            <div className='flex gap-4 mt-6'>
              <button
                className='border-2 border-white text-white px-4 py-2 rounded-md'
                onClick={() => {
                  setIsDeletePopupOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className='bg-red-600 text-white px-4 py-2 rounded-md min-w-20'
                onClick={() => {
                  handleDeleteNote();
                }}
              >
                {deleteLoading ? (
                  <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] '>
                    <div className='w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Page;
