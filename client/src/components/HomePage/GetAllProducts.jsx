import { useEffect, useState } from "react";
import Axios from "axios";

const GetAllProducts = () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNZW1iZXJJRCI6Mywicm9sZXMiOiJhZG1pbiIsImlhdCI6MTY4Nzg2MzczNCwiZXhwIjoxNjg3ODY3MzM0fQ.V1mc2yV40FPysey4PsSMe3kWS2-PSkbMEpNv8KjK2Xg";
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await Axios.get("http://localhost:5050/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();
  }, []);

  return (
    <div>
      <section className="grid">
        {books.map((book) => {
          const { BookID, Title, Author, PublicationYear, Img } = book;
          return (
            <article key={BookID}>
              <div className="container">
                <img src={Img} alt="BookImg" />
                <div className="about">
                  <h3>{}</h3>
                  <h4>
                    Title: <span>{Title}</span>
                  </h4>
                  <h4>
                    Author: <span>{Author}</span>
                  </h4>
                  <h4>
                    PubYear: <span>{PublicationYear}</span>
                  </h4>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default GetAllProducts;
