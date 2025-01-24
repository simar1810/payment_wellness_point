import { EyeIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { userUpdateDetailConfig } from "@/utils/configData";
import { Modal } from "@mui/material";
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

        <EditCustomerField
          value={detail.name}
          _id={detail._id}
          fieldName="name"
          keyname="name"
          userName={detail.name}
          onMutateDep={onMutateDep}
        />
        <p className="w-[10%] flex justify-center items-center gap-1">
          {detail.rollno}
          <button onClick={() => setEditOpen(true)}>
            <FaEdit c="green" />
          </button>
        </p>
        <EditCustomerField
          value={detail.sponseredByName}
          _id={detail._id}
          fieldName="Sponsor"
          keyname="sponseredByName"
          userName={detail.name}
          onMutateDep={onMutateDep}
        />
        <EditCustomerField
          value={detail.mobileNumber}
          _id={detail._id}
          fieldName="Mobile Number"
          keyname="mobileNumber"
          userName={detail.name}
          onMutateDep={onMutateDep}
        />
        {/* <p className="w-[12%] text-center">{detail.mobileNumber}</p> */}
        {clubSystem === 2 && <>
          <p className="w-[10%] text-center">{parseInt(detail?.activePoints).toFixed(2)}</p>
          <p className="w-[12%] max-w-40 text-center">{Math.round(parseInt(detail?.activePoints) / parseInt(detail?.coachVolumePoint))}</p>
        </>}

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
          ) : clubSystem === 3 ? (
            detail.specialMode?.pointsHistory?.length > 0 ? (
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
        <div className="w-[5%] flex justify-center gap-2 cursor-pointer">
          <button onClick={() => router.push(`/club-clients/${clientId}`)}>
            <EyeIcon
              h={20}
              w={25}
              c={"black"}
            />
          </button>
          <MultipleFields
            detail={detail}
            onMutateDep={onMutateDep}
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#EEEEEE]"></div>
      {editOpen && <EditRollNoComponent
        onMutateDep={onMutateDep}
        detail={detail}
        onDiscardEditing={() => setEditOpen(false)} />}
    </div>
  );
}

function EditRollNoComponent({ detail, onDiscardEditing, onMutateDep }) {
  async function handleEditRollNo(e) {
    try {
      e.preventDefault()
      const data = {
        newRollNumber: e.currentTarget.newRollNumber.value,
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


  return <Modal open={true} className="flex items-center justify-center">
    <div className="w-full max-w-[450px] bg-white p-4 relative rounded-md">
      <button onClick={onDiscardEditing} className="absolute right-4 top-4 rounded-md z-[1000]">
        <FaXmark c="black" className="w-6 h-6" />
      </button>
      <form onSubmit={handleEditRollNo}>
        <FormControl title="Change rollno" name="newRollNumber" defaultValue={detail.rollno} />
        <button type='submit' className="text-white bg-green-800 block mt-4 mx-auto px-4 py-2 rounded-md">Update</button>
      </form>
    </div>
  </Modal>
}

function FormControl({
  title,
  name,
  className,
  ...props
}) {
  return <div className="my-4">
    <label className={`text-w hite ${className}`}>{title}</label>
    <input
      type={props.type || "text"}
      name={name}
      className="input w-full block focus:outline-none mt-2 px-4 py-2 rounded-md border-2"
      {...props}
    />
  </div>
}

function EditCustomerField({
  value,
  fieldName = "name",
  keyname,
  _id,
  userName,
  onMutateDep
}) {
  const [modalOpened, setModalOpened] = useState(false)

  async function updateDetails(e) {
    try {
      e.preventDefault();
      const data = {
        [keyname]: e.currentTarget[keyname].value
      }
      const response = await apiInstance.updateClient(data, _id)
      if (response?.data?.status) {
        toast.success(response?.data?.message || "Updated details successfully");
        onMutateDep()
      } else {
        toast.error(response?.data?.message || "Please try again later!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Please try again later!");
    }
  }

  return <>
    <button
      onClick={() => setModalOpened(true)}
      className="w-[12%] max-w-40 text-center flex items-center justify-center gap-1 cursor-pointer hover:font-semibold [&_.edit]:hover:opacity-100"
    >
      <span>{value}</span>
      <FaEdit className="edit w-[12px] h-[12px] cursor-pointer opacity-60" />
    </button>
    {modalOpened && <Modal
      open={true}
      onClose={() => setModalOpened(false)}
      className="flex items-center justify-center"
    >
      <div className="max-w-[450px] w-full bg-white p-4 rounded-md relative">
        <FaXmark
          onClick={() => setModalOpened(false)}
          className="w-[20px] h-[20px] absolute top-3 right-4 cursor-pointer"
        />
        <h2 className="text-[20px] font-bold leading-tight mb-4">Edit {fieldName} of {userName}</h2>
        <form onSubmit={updateDetails}>
          <FormControl
            title={fieldName}
            className="capitalize"
            name={keyname}
            defaultValue={value}
          />
          <button type="submit" className="bg-green-800 text-white text-[14px] font-semibold leading-[1] px-4 py-2 rounded-md">Update</button>
        </form>
      </div>
    </Modal>}
  </>
}

function MultipleFields({
  detail,
  onMutateDep
}) {
  const [modalOpened, setModalOpened] = useState(false)

  async function updateDetails(e) {
    try {
      e.preventDefault();
      const data = {}
      for (const config of userUpdateDetailConfig) {
        data[config.name] = e.currentTarget[config.name].value
      }
      const response = await apiInstance.updateClient(data, detail._id)
      if (response?.data?.status) {
        toast.success(response?.data?.message || "Updated details successfully");
        onMutateDep()
      } else {
        toast.error(response?.data?.message || "Please try again later!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Please try again later!");
    }
  }

  return <>
    <button
      onClick={() => setModalOpened(true)}
      className="text-center flex items-center justify-center gap-1 cursor-pointer"
    >
      <FaEdit className="w-[16px] h-[16px] cursor-pointer" />
    </button>
    {modalOpened && <Modal
      open={true}
      onClose={() => setModalOpened(false)}
      className="flex items-center justify-center"
    >
      <div className="max-w-[450px] w-full max-h-[70vh] bg-white p-4 pb-0 overflow-y-auto rounded-md relative">
        <FaXmark
          onClick={() => setModalOpened(false)}
          className="w-[20px] h-[20px] absolute top-3 right-4 cursor-pointer"
        />
        <h2 className="text-[20px] font-bold leading-tight mb-4">Edit details of {detail.name}</h2>
        <form onSubmit={updateDetails}>
          {userUpdateDetailConfig.map(config => <FormControl
            key={config.id}
            {...config}
            defaultValue={detail[config.name] || ""}
          />
          )}
          <div className="pt-4 pb-2 bg-white sticky bottom-0">
            <button type="submit" className="bg-green-800 text-white text-[14px] font-semibold leading-[1] px-4 py-2 rounded-md">Update</button>
          </div>
        </form>
      </div>
    </Modal>}
  </>
}