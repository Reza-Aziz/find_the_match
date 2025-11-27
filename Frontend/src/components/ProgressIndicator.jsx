import React from "react";

export default function ProgressIndicator({ remaining, total }) {
  return (
    <div className="text-sm text-gray-600">
      Tersisa: <strong>{remaining}</strong> / {total}
    </div>
  );
}
