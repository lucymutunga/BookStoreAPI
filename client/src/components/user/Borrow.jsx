import React from "react";
const Borrow = () => {
  return (
    <div className="borrow-book">
      <h2>Borrow Book</h2>

      <div>
        <form className="borrow-form">
          <label>
            Member Name
            <input type="number" placeholder="Input your Name" />{" "}
          </label>

          <label>
            BookTitle
            <input type="text" placeholder="BookTitle" required />
          </label>
        </form>

        <button type="submit">Submit</button>
      </div>
    </div>
  );
};
export default Borrow;
