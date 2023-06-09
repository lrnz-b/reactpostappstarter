import DOMAIN from "../../services/endpoint";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Title,
  Text,
  createStyles,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');
  const postDetails = useLoaderData();

  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },

    card: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      width: '50rem',
      borderRadius: theme.radius.lg,
      padding: rem(4),
      border: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
      }`,
    },

    image: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg,
      backgroundImage: `url(${postDetails.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(280)}`,
      height: '27.5rem',
    },

    details: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,
    },

    description: {
      opacity: 0.5,
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  };
});

const PostDetailsPage = () => {
  const { classes } = useStyles();
  const postDetails = useLoaderData();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.card} shadow="md" radius="lg">
        <div className={classes.image} />

        <div className={classes.details}>
          <Title className={classes.title}>
            {postDetails.title}
          </Title>
          <Text className={classes.description} mt="sm" mb={30}>
            {postDetails.content}
          </Text>
          <Text mt="sm">
            Author: {postDetails.creatorEmail}
          </Text>
          <Text mt="sm">
            Category: {postDetails.category}
          </Text>
        </div> 
      </Paper>
    </div>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;