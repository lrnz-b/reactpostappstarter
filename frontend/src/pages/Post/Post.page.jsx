import axios from "axios";
import DOMAIN from "../../services/endpoint";
import { Suspense } from 'react';
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { useLoaderData, defer, Await } from "react-router-dom";
import { 
  SimpleGrid, 
  Container, 
  Loader,
  createStyles 
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    textAlign: 'center',
  },
}));

export const PostPage = () => {
  const { classes } = useStyles();
  const response = useLoaderData();

  return (
    <Container className={classes.wrapper}>
      <Suspense fallback={ <Loader className={classes.loader}/> }>
        <SimpleGrid cols={3}>
          <Await resolve={response.data}>
            {(data) => 
              data.data.map((post) => (
                <ArticleCardImage key={post.id} {...post} />
            ))}
          </Await>
        </SimpleGrid>
      </Suspense>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = axios.get(`${DOMAIN}/api/posts`);
  return defer({ data: res });
};
