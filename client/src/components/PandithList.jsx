import React from "react";
import { useNavigate } from "react-router-dom";

const PandithList = ({ pandith }) => {
  const navigate = useNavigate();
 
  return (
    <>
    <div className="col-md-3 m-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-primary mb-4">
             {pandith.firstName} {pandith.lastName}
          </h5>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">
              <span className="fw-bold">Specialization:</span> {pandith.specialization}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Experience:</span> {pandith.experience}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Timings:</span> {pandith.timings[0]} - {pandith.timings[1]}
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Fee Per Consultation:</span> {pandith.feePerConsultation}
            </li>
          </ul>
          <button
            onClick={() => navigate(`/pandith/book-pooja/${pandith._id}`)}
            className="btn btn-primary w-100"
          >
            Book Pooja
          </button>
        </div>
      </div>
    </div>

    </>
  );
};

export default PandithList;
