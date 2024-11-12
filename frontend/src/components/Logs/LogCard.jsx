import { MdDelete, MdEdit } from "react-icons/md";

const LogCard = ({ log }) => {
  return (
    <div className="log-card">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <img
          src={`http://localhost:5000/uploads/${log.logImage}`}
          alt="Card"
          className=" object-cover border-gray-300"
        />

        <div className="flex gap-3 justify-end">
          <MdEdit size={24} />
          <MdDelete size={24} />
        </div>
        <div className="px-4">
          <h2 className="text-xl font-semibold">
            Name your trip : {log.tripName}
          </h2>
          <p className="text-gray-800 mb-2">Description: {log.description}</p>
          <p className="text-gray-700 mb-2">Where is it : {log.location}</p>
          <p className="text-gray-600">Date : {log.date}</p>
        </div>
      </div>
    </div>
  );
};

export default LogCard;
