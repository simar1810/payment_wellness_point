import { EyeIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function SingleClientinfo({ index, detail, onMutateDep }) {
  const router = useRouter();
  const clientId = detail._id;
  const clubSystem = useSelector((state) => state.user.clubSystem);
  const [editOpen, setEditOpen] = useState(false)
  return (
    <div className="w-full px-3">
      <div className="w-full text-sm py-1 text-[#292D32] font-medium flex items-center justify-around gap-1">
        <p className="w-[5%] text-center">{index + 1}</p>
        <p className="w-[12%] max-w-40 text-center">{detail.name}</p>
        <p className="w-[12%] text-center">{detail.mobileNumber}</p>
        {clubSystem === 2 && <>
          <p className="w-[10%] text-center">{parseInt(detail?.activePoints).toFixed(2)}</p>
          <p className="w-[12%] max-w-40 text-center">{Math.round(parseInt(detail?.activePoints) / parseInt(detail?.coachVolumePoint))}</p>
        </>}

        <p className="w-[10%] flex justify-center items-center gap-1">
          {detail.rollno}
          <button onClick={() => setEditOpen(true)}>
            <FaEdit c="green" />
          </button>
        </p>

        <p className="w-[12%] text-center">{detail.sponseredByName}</p>
        <p className="w-[10%] text-center">{detail.attendance.length}</p>

        <div className="w-[12%] flex justify-center">
          {clubSystem === 0 ? (
            detail.isActive ? (
              <button className="h-[30px] min-w-[98px] px-4 text-white bg-[#03632C] rounded">
                Active
              </button>
            ) : (
              <button className="w-full h-[30px] max-w-[98px] text-white bg-[#EA4335] rounded">
                In-Active
              </button>
            )
          ) : clubSystem === 1 ? (
            detail.isSubscription ? (
              <button className="h-[30px] min-w-[98px] px-4 text-white bg-[#03632C] rounded">
                Active
              </button>
            ) : (
              <button className="w-full h-[30px] max-w-[98px] text-white bg-[#EA4335] rounded">
                In-Active
              </button>
            )
          ) : clubSystem === 2 ? (
            detail.volumePoints > 0 ? (
              <button className="h-[30px] px-4 min-w-[98px] text-white bg-[#03632C] rounded">
                Active
              </button>
            ) : (
              <button className="w-full h-[30px] max-w-[98px] text-white bg-[#EA4335] rounded">
                In-Active
              </button>
            )
          ) : (
            <button className="w-full h-[30px] max-w-[98px] text-white bg-[#EA4335] rounded">
              In-Active
            </button>
          )}
        </div>
        <p
          onClick={() => router.push(`/club-clients/${clientId}`)}
          className="w-[5%] flex justify-center cursor-pointer"
        >
          <EyeIcon h={20} w={25} c={"black"} />
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#EEEEEE]"></div>
      {editOpen && <EditRollNoComponent onMutateDep={onMutateDep} detail={detail} onDiscardEditing={() => setEditOpen(false)} />}
    </div>
  );
}

function EditRollNoComponent({ detail, onDiscardEditing, onMutateDep }) {
  async function handleEditRollNo(e) {
    try {
      e.preventDefault()
      const data = {
        newRollNumber: `${detail.rollno.slice(0, 3)}${e.currentTarget.newRollNumber.value}`,
        clientId: detail._id
      }
      const response = await apiInstance.editClientRollNumber(data);
      if (response.data.success) {
        toast.success(response.data.message);
        onMutateDep(prev => !prev)
      }
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data.message || error.message)
    }
  }


  return <div className="max-w-[600px] mx-auto mt-10 bg-[#FFF] shadow-2xl p-8 rounded-md relative border-2">
    <button onClick={onDiscardEditing} className="absolute right-4 top-4">
      <FaXmark c="black" className="w-10 h-10" />
    </button>
    <form onSubmit={handleEditRollNo}>
      <FormControl title={`Roll Number - starts from - ${detail.rollno.slice(0, 3)}`} name="newRollNumber" defaultValue={detail.rollno.slice(3)} />
      <button type='submit' className="text-w hite bg-green-400 block mt-4 mx-auto px-4 py-2 rounded-md">Update</button>
    </form>
  </div>
}

function FormControl({ title, name, ...props }) {
  return <div className="my-4">
    <label className="text-w hite">{title}</label>
    <input type={props.type || "text"} name={name} className="w-full block focus:outline-none mt-2 px-4 py-2 rounded-md border-2" {...props} />
  </div>
}
