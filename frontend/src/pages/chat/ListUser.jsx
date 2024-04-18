// import React, { useState } from "react";

// const ListUser = ({ users, onUserSelect }) => {
//   let id = localStorage.getItem("id");

//   const handleClick = (data) => {
//     onUserSelect(data);
//   };
//   console.log(users)

//   return (
//     <div>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user._id}
//             className="flex items-center justify-center"
//             onClick={() => handleClick(user)}
//           >
//             {/* <img
//               src={user.participants[0].name}
//               // alt={user.sender.name}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "50%",
//                 marginRight: "10px",
//               }}
//             /> */}
//             <span>{user.participants[0].name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListUser;










import React from "react";

const ListUser = ({ users, onUserSelect }) => {
  const handleClick = (user) => {
    onUserSelect(user);
  };

  if (!users || users.length === 0) {
    return <div>No users available.</div>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-center"
            onClick={() => handleClick(user)}
          >
            <span>{user.participants[0]?.name || "Unknown User"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUser;
