import apiInstance from "@/helpers/api"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Modal } from "@mui/material";
import { FaXmark } from "react-icons/fa6";

export default function SepcialMode({ clubSystem, clientId, fetchClientData }) {
	const [isAddModalOpened, setIsAddModalOpened] = useState(false)
	const [specialPoints, setSpecialPoints] = useState(null);
	const [deps, setDeps] = useState(false)

	async function fetchData() {
		try {
			const { data: { specialPoints }, status } = await apiInstance.getSpecialModeData(clientId);
			if (status === 200) {
				setSpecialPoints(specialPoints)
			}
		} catch (error) {

		}
	}

	useEffect(function () {
		fetchData()
	}, [deps])

	return <div>
		<div className="text-center pl-20 mt-10 flex flex-col justify-between items-start">
			<div className="relative inline-flex flex-col items-center justify-center w-[90px] h-[90px] pt-2 shadow-xl outline outline-[#036231] outline-[20px] outline-offset-[15px] rounded-full">
				<span className="text-2xl font-semibold text-[#505B68]">
					{specialPoints?.totalPoints?.toFixed(2) === "NaN"
						? 0
						: specialPoints?.totalPoints?.toFixed(2)}
				</span>

				<span className="text-[12px] text-[#505B68]">Points</span>
			</div>

			<p className="mt-12 text-sm font-semibold text-[#]">
				Total Points
			</p>
		</div>
		<div className="flex items-center mt-14 space-x-4">
			<Link
				href={`/club-clients/buy-products?clientId=${clientId}`}
				className="px-4 py-2 font-semibold text-[#036231] border-2 border-[#036231] rounded-xl"
			>
				+ Add Products
			</Link>
			<button
				className="font-semibold text-[#036231] px-4 py-2 border-2 border-[#036231] rounded-xl"
				onClick={() => setIsAddModalOpened(true)}
			>
				+ Add Points
			</button>
		</div>
		{isAddModalOpened && <AddSpecialPointsModal
			onCloseModal={() => setIsAddModalOpened(false)}
			refreshData={() => setDeps(prev => !prev)}
			clientId={clientId} />}
	</div>
}

function AddSpecialPointsModal({ onCloseModal, refreshData, clientId }) {
	const [adding, setAdding] = useState(false)

	async function addPoints(e) {
		try {
			e.preventDefault()
			setAdding(true)
			const formData = {
				startDate: e.currentTarget.startDate.value,
				endDate: e.currentTarget.endDate.value,
				paymentMode: e.currentTarget.paymentMode.value,
				invoice: e.currentTarget.invoice.value,
				totalPoints: e.currentTarget.totalPoints.value
			}

			const { status, data } = await apiInstance.addSpecialPoints(formData, clientId);
			if (status === 200) {
				toast.success(data?.message);
				onCloseModal();
				refreshData()
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message)
		} finally {
			setAdding(false)
		}
	}

	return <Modal
		onCloseModal={onCloseModal}
		open={true}
		className="flex items-center justify-center">
		<div className="w-full h-full max-w-[500px] sm:h-auto bg-white rounded-md relative overflow-clip">
			<FaXmark
				onClick={onCloseModal}
				className="text-white w-6 h-6 absolute right-4 top-4 cursor-pointer" />
			<h1 className="text-xl bg-[#03632C] text-white text-center px-4 py-4 mb-6">Volume Points</h1>

			<form className="px-4" onSubmit={addPoints}>
				<div className="mb-4 flex items-center gap-2">
					<label className="w-1/2">
						Start Date
						<input
							type="date"
							name="startDate"
							className="w-full text-[#808080] mt-1 px-4 py-2 focus:outline-none border-2 rounded-md" />
					</label>
					<label className="w-1/2">
						End Date
						<input
							type="date"
							name="endDate"
							className="w-full text-[#808080] mt-1 px-4 py-2 focus:outline-none border-2 rounded-md" />
					</label>
				</div>

				<label className="mb-4 block">
					Payment Mode
					<select
						name="paymentMode"
						className="w-full text-[#808080] mt-1 px-4 py-2 focus:outline-none border-2 rounded-md cursor-pointer">
						<option value="online" selected>Online</option>
						<option value="cash">Cash</option>
					</select>
				</label>

				<label className="mb-4 block">
					Volume Points
					<input
						type="number"
						name="totalPoints"
						placeholder="Enter Points"
						className="w-full text-[#808080] mt-1 px-4 py-2 focus:outline-none border-2 rounded-md"
					/>
				</label>

				<label className="mb-4 block">
					Invoice
					<input
						type="text"
						name="invoice"
						placeholder="Enter Invoice"
						className="w-full text-[#808080] mt-1 px-4 py-2 focus:outline-none border-2 rounded-md"
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-[#03632C] text-white mb-4 py-3 rounded-md"
				>
					{adding ? <div className="h-6 w-4 mx-auto border-b-2 border-white rounded-full animate-spin" /> : <>Add Points</>}
				</button>
			</form>
		</div>
	</Modal>
}