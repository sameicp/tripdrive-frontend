import React from "react";
import RideList from "./RideList";

export default function Request({ request, cancelRequest }) {

  return (
    <div className="max-w-2xl mx-auto space-y-20 min-w-90">
      <div className="max-w-screen-md md:w-3/4 mx-auto">
        <RideList
          request={request}
          cancelRequest={cancelRequest}
        />
      </div>
    </div>
  );
}
