import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allLogs, clearError } from "../../redux/features/logSlice";
import LogCard from "./LogCard";

const Logs = (userId) => {
  const { logs, loading, error } = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(allLogs(userId));
  }, [dispatch, error, userId]);

  return (
    <>
      <div className="container h-screen my-[7rem]">
        <div className="grid grid-cols-2 gap-[3rem]">
            {loading ? (
              <span>Loading.....</span>
            ) : (
              logs &&
              logs.map((log) => (
                <div key={log._id} className="mb-2">
                  <LogCard log={log} />
                </div>
              ))
            )}
          </div>
        </div>
    </>
  );
};

export default Logs;
