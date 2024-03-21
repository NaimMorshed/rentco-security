import React from "react";

export default function Message() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        Large modal
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            CONTENT GOES HERE
          </div>
        </div>
      </div>
    </>
  );
}
