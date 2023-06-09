import { useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";

function PostDetailsPage() {
  const postDetails = useLoaderData();

  return (
    <>
      <p>{postDetails.title}</p>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
