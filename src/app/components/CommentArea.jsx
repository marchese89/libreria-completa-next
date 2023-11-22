import CommentList from "./CommentsList";
import AddComment from "./AddComment";
import Error from "./Error";
import { useEffect, useState } from "react";
import { token } from "../token";

const CommentArea = ({ selectedBook }) => {
  const [listOfComments, setlistOfComments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedBook !== null) {
      getComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook]);

  const getComments = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + selectedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setlistOfComments(data);
      }
    } catch (err) {
      console.log("ERRORE", err);
      setError(true);
    }
  };
  return (
    <div className="comment-area">
      {error && <Error />}
      <CommentList
        listOfComments={listOfComments}
        update={getComments}
        setError={setError}
      />
      <AddComment
        selectedBook={selectedBook}
        update={getComments}
        // commentArea={this}
      />
    </div>
  );
};

export default CommentArea;
