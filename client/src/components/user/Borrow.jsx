// import React from "react";
// const Borrow = () => {
//   return (
//     <div className="borrow-book">
//       <h2>Borrow Book</h2>

//       <div>
//         <form className="borrow-form">
//           <label>
//             Member Name
//             <input type="number" placeholder="Input your Name" />{" "}
//           </label>

//           <label>
//             BookTitle
//             <input type="text" placeholder="BookTitle" required />
//           </label>
//         </form>

//         <button type="submit">Submit</button>
//       </div>
//     </div>
//   );
// };
// export default Borrow;
import React, { useState } from "react";
import "./Borrow.css";
import { Link } from "react-router-dom";

const Borrow = () => {
  const [memberName, setMemberName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNZW1iZXJJRCI6Miwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY4Nzg1MzAwNiwiZXhwIjoxNjg3ODU2NjA2fQ.d8MBf-XIS6kdcrlm6ys1TufOO5n-TNYBfaxoDWWeMJs";

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5050/loans/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        MemberName: memberName,
        BookTitle: bookTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMemberName("");
        setBookTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="borrow-book">
      <h2>Borrow Book</h2>
      <p>Time to escape from reality!.</p>
      <div>
        <form className="borrow-form" onSubmit={handleSubmit}>
          <label>
            Member Name:
            <input
              type="text"
              placeholder="Enter your name..."
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </label>
          <label>
            Book Title:
            <input
              type="text"
              placeholder="Enter the  book Title..."
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </label>
          <button type="submit">
            <Link to="/user/mybooks">Borrow</Link>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Borrow;
//<Link to="/Signup">Sign up</Link>
