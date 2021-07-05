import React, { useRef, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import AppointmentDetailsButton from "components/AppDetailButton/AppointmentDetailsButton";
import axios from "axios";
import { useParams } from "react-router-dom";

function HospitalAppointments() {
  const asignDate = useRef();
  const asignTime = useRef();
  const asignToken = useRef();
  const asignDoc = useRef();

  const [docAssigned, setDocAssigned] = useState("");
  const [assignedTime, setAssignedTime] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [assignedToken, setAssignedToken] = useState("");
  const [approvedList, setApprovedList] = useState([]);

  const [datas, setDatas] = useState([]);

  const id = useParams().hospitalId;
  const local = "http://localhost:5000/api";

  useEffect(() => {
    const getAppoiments = async () => {
      const { data } = await axios.get(
        `${local}/userAppointment/${id}/appointment/hospitalallappointments`
      );
      setDatas(data);
    };
    getAppoiments();
  }, [datas, id]);

  // console.log(datas);
  const setSchedule = {
    token: assignedToken,
    date: assignedDate,
    doctime: assignedTime,
    assignedDoc: docAssigned,
    status: { pending: false, done: true, rejected: false },
  };
  // const handleAppointments = async (res) => {
  //   let id = res?._id;
  //   try {
  //     await axios.put(`${local}/userAppointment/${id}/approved`, setSchedule);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRejectAppointments = async (res) => {
    try {
      await axios.put(`${local}/userAppointment/${res?._id}/rejected`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getApprovedList = async () => {
      const list = await axios.get(
        `${local}/userAppointment/${id}/approvedList`
      );
      setApprovedList(list);
    };
    getApprovedList();
  }, [approvedList, id]);

  console.log(assignedTime);

  return (
    <div>
      <div class="text-gray-900 bg-gray-200">
        <div class="p-4 flex">
          <h1 class="text-xl">Appointments List</h1>
        </div>
        <div class="px-3 py-1 flex justify-around">
          <table
            class="text-md bg-white shadow-md rounded mb-4"
            style={{ fontSize: "15px" }}
          >
            <tbody>
              <tr class="border-b">
                <th class="text-left py-3 px-1 border-2 ">S.N.</th>
                <th class="text-left py-3 px-1 border-2 ">Name</th>
                <th class="text-left py-3 px-1 border-2 ">Contact.No</th>
                <th class="text-left py-3 px-1 border-2 ">Service</th>
                <th class="text-left py-3 px-1 border-2 ">Details</th>
                <th class="text-left py-3 px-1 border-2 ">Doctor Assigned</th>
                <th class="text-left py-3 px-1 border-2 ">Date</th>
                <th class="text-left py-3 px-1 border-2 ">Time</th>
                <th class="text-left py-3 px-1 border-2 ">Token No</th>
              </tr>
              {/* rows of data are below now */}
              <tr
                class="border-b hover:bg-orange-100 bg-gray-100"
                style={{ fontSize: "13px" }}
              >
                <td class="p-2 px-2 border-2">
                  <span>01.</span>
                </td>
                <td class="p-2 px-2 border-2">
                  <span>Madan Bahadur</span>
                </td>
                <td class="p-2 px-2 border-2">
                  <span>9867134457</span>
                </td>
                <td class="p-2 px-2 border-2">
                  <span>Blood Test</span>
                </td>
                <td class="p-2 px-2 border-2">
                  <AppointmentDetailsButton />
                  {/* <Button>View Details</Button> */}
                </td>
                <td class="p-2 px-2 border-2">
                  <select class="bg-transparent" ref={asignDoc}>
                    <option>None</option>
                    <option>Dr.Sanduik Ruit</option>
                    <option>Dr.Pathak</option>
                    <option>Dr.Achaya</option>
                  </select>
                </td>
                <td class="p-2 px-2 border-2">
                  <input type="date" ref={asignDate} />
                </td>
                <td class="p-2 px-2 border-2">
                  <input type="time" ref={asignTime} />
                </td>
                <td class="p-2 border-2">
                  <input
                    type="text"
                    style={{ width: "100px" }}
                    placeholder="token.no"
                  />
                </td>
                <td class="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Reject
                  </button>
                </td>
              </tr>
              {datas.map(
                (res) =>
                  res.status.pending === true &&
                  res.status.done === false && (
                    <tr
                      class="border-b hover:bg-orange-100 bg-gray-100"
                      style={{ fontSize: "13px" }}
                    >
                      <td class="p-2 px-2 border-2">
                        <span>01.</span>
                      </td>
                      <td class="p-2 px-2 border-2">
                        <span>{res.name}</span>
                      </td>
                      <td class="p-2 px-2 border-2">
                        <span>{res.contact}</span>
                      </td>
                      <td class="p-2 px-2 border-2">
                        <span>{res.services}</span>
                      </td>
                      <td class="p-2 px-2 border-2">
                        <AppointmentDetailsButton res={res} />
                      </td>
                      <td class="p-2 px-2 border-2">
                        <select
                          class="bg-transparent"
                          onChange={(e) => {
                            setDocAssigned(e.target.value);
                          }}
                          ref={asignDoc}
                        >
                          <option>None</option>
                          <option>Dr.Sanduik Ruit</option>
                          <option>Dr.Pathak</option>
                          <option>Dr.Achaya</option>
                        </select>
                      </td>
                      <td class="p-2 px-2 border-2">
                        <input
                          type="date"
                          onChange={(e) => {
                            setAssignedDate(e.target.value);
                          }}
                          ref={asignDate}
                        />
                      </td>
                      <td class="p-2 px-2 border-2">
                        <input
                          type="time"
                          ref={asignTime}
                          onChange={(e) => {
                            setAssignedTime(e.target.value);
                          }}
                        />
                      </td>
                      <td class="p-2 border-2">
                        <input
                          type="text"
                          style={{ width: "100px" }}
                          placeholder="token.no"
                          ref={asignToken}
                          onChange={(e) => {
                            setAssignedToken(e.target.value);
                          }}
                        />
                      </td>
                      <td class="p-3 px-5 flex justify-end">
                        <button
                          onClick={async () => {
                            // handleAppointments(res);
                            try {
                              await axios.put(
                                `${local}/userAppointment/${res._id}/approved`,
                                setSchedule
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          type="button"
                          class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Approve
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await axios.put(
                                `${local}/userAppointment/${res?._id}/rejected`
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          type="button"
                          class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HospitalAppointments;
