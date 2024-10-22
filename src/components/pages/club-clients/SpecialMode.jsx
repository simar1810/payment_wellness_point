import apiInstance from "@/helpers/api"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Modal } from "@mui/material";
import { FaXmark } from "react-icons/fa6";
import { DeleteIcon, EyeIcon } from "@/components/svgs";

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
					{specialPoints?.totalPoints?.toFixed(2)
						? specialPoints?.totalPoints?.toFixed(2)
						: 0}
				</span>

				<span className="text-[12px] text-[#505B68]">Points</span>
			</div>

			<p className="mt-12 text-sm font-semibold text-[#]">
				Total Points
			</p>
		</div>
		<div className="flex items-center mt-14 space-x-4">
			{/* <Link
				href={`/club-clients/buy-products?clientId=${clientId}`}
				className="px-4 py-2 font-semibold text-[#036231] border-2 border-[#036231] rounded-xl"
			>
				+ Add Products
			</Link> */}
			<button
				className="font-semibold text-[#036231] px-4 py-2 border-2 border-[#036231] rounded-xl"
				onClick={() => setIsAddModalOpened(true)}
			>
				+ Volume Membership
			</button>
		</div>
		{specialPoints?.pointsHistory && <PointsHistory
			pointsHistory={specialPoints?.pointsHistory}
			clientId={clientId}
			refreshData={() => setDeps(prev => !prev)}
		/>}
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
				membershipType: e.currentTarget.membershipType.value,
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
					Membership Type
					<select
						name="membershipType"
						className="w-full text-[#808080] mt-1 px-4 py-2 focus:outline-none border-2 rounded-md cursor-pointer">
						<option value="volume-point" selected>Volume Point</option>
						<option value="membership">Membership</option>
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

function PointsHistory({ pointsHistory, clientId, refreshData }) {
	const [index, setIndex] = useState(null);
	const [isWarningOpened, setIsWarningOpened] = useState(false);

	return <div className="w-full sm:w-[53%] md:w-fit mt-10 border rounded-xl max-h-[350px] overflow-y-scroll scrollbar-hide">
		<h3 className="text-lg font-semibold border-b p-4">
			Points History
		</h3>

		<div className="overflow-x-auto">
			<table className="min-w-full h-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="px-2 py-2 text-center">Order ID</th>
						<th className="px-2 py-2 text-center">Start Date</th>
						<th className="px-2 py-2 text-center">End Date</th>
						<th className="px-2 py-2 text-center">Order Value</th>
						<th className="px-2 py-2 text-center">Points Earned</th>
						<th className="px-2 py-2 text-center">Details</th>
						<th className="py-2 text-center"></th>
					</tr>
				</thead>

				{pointsHistory.length === 0
					? <tbody>
						<tr className="mt-24">
							<td colSpan="5" className="text-center pt-20 ">
								No Points History Found
							</td>
						</tr>
					</tbody>
					: <tbody>
						{pointsHistory.map((entry, index) => (
							<tr key={entry?.orderId} className="text-sm">
								<td className="px-4 py-2 text-center ">
									{entry?.orderId ? entry.orderId : "-"}
								</td>
								<td className="px-4 py-2 text-center ">{entry?.startDate}</td>
								<td className="px-4 py-2 text-center ">{entry?.endDate}</td>
								<td className="px-4 py-2 text-center ">
									{entry?.orderValue ? entry?.orderValue.toFixed(2) : "-"}
								</td>
								<td className="px-4 py-2 text-center">
									{entry.addedPoints.toFixed(2)}
								</td>

								{/* <td className="px-4 py-2 text-center">
									{entry?.orderId ? (
										<button onClick={() => handleOrderDetails(index)}>
											<EyeIcon c="#000" w={20} h={20} />
										</button>
									) : (
										"-"
									)}
								</td> */}
								<td className="px-4 py-2 text-center">
									<button
										onClick={() => {
											setIndex(index)
											setIsWarningOpened(true)
										}}
										className="cursor-pointer"
									>
										<DeleteIcon c="red" w={20} h={20} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				}
			</table>
		</div>
		{isWarningOpened && <DeleteModal
			isWarningOpened={isWarningOpened}
			onCloseModal={() => {
				setIndex(null)
				setIsWarningOpened(false)
			}}
			refreshData={refreshData}
			clientId={clientId}
			index={index}
		/>}
	</div>
}

function DeleteModal({ isWarningOpened, onCloseModal, clientId, index, refreshData }) {
	async function deleteSpecialPointsRecord() {
		try {
			const response = await apiInstance.deleteSpecialPointsRecord(clientId, index);
			if (response.status === 200) {
				onCloseModal()
				refreshData()
				toast.success("Record deleted successfully!")
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message)
		}
	}
	return <Modal
		className="flex items-center justify-center"
		open={isWarningOpened}
		onCloseModal={onCloseModal}>
		<div className="bg-white px-4 py-4 rounded-md">
			<h3 className="text-xl font-semibold">Do you want to delete the record?</h3>
			<div className="mt-4 flex items-center justify-end gap-2">
				<button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={deleteSpecialPointsRecord}>Delete</button>
				<button className="px-4 py-2 rounded-md border-2" onClick={onCloseModal}>Cancel</button>
			</div>
		</div>
	</Modal>
}