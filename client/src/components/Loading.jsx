import React from "react";

export const Loading = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <div className="loader">
      <img src={loadingImg} width="500" height="500" alt="Loading..." />
    </div>
  );
};
