import axios from "axios";
import DOMAIN from "../../services/endpoint";
import { decodeToken } from '../../services/jwt.service';
import { useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { IconEditCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import {
  Box,
  createStyles,
  getStylesRef,
  Paper,
  rem,
  Title,
  Text,
  Group,
  Button,
  TextInput, 
  Textarea
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
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

    [`&:hover .${getStylesRef('editBtn')}`]: {
      display: 'block',
    },
  },

  image: {
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: theme.radius.lg,
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
    position: 'relative',
  },

  editBtn: {
    ref: getStylesRef('editBtn'),
    position: 'absolute',
    right: 10,
    top: 10,
    opacity: 0.5,
    lineHeight: 0,
    display: 'none',
    cursor: 'pointer',
  },

  description: {
    opacity: 0.5,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const PostDetailsPage = () => {
  const { classes } = useStyles();
  const [ editing, toggleEditing ] = useState(false);
  const postDetails = useLoaderData();

  return (
    <>
      { editing
        ? <Editing 
            classes={classes} 
            toggleEditing={toggleEditing} 
            postDetails={postDetails} />
        : <Info 
            classes={classes} 
            toggleEditing={toggleEditing} 
            postDetails={postDetails} />
      }
    </>
  );
}

const Info = ({ classes, toggleEditing, postDetails }) => {
  const userId = decodeToken().id;

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.card} shadow="md" radius="lg">
        <Box className={classes.image} sx={{ backgroundImage: `url(${postDetails.image})` }} />

        <div className={classes.details}>
          {
            postDetails.userId === userId 
            ? <div className={classes.editBtn} onClick={toggleEditing}>
                <IconEditCircle size={40} color="red" />
              </div>
            : null
          }
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

const Editing = ({ toggleEditing, postDetails }) => {
  const navigate = useNavigate();

  const { classes } = useStyles();

  const onSaveDetails = async (post) => {
    const res = await axios.post(`${DOMAIN}/api/posts/${post.id}`, post);
    if (res?.data.success) {
      navigate(`/posts/${post.id}`); // triggers useLoaderData(); updates post page with new values
      toggleEditing(); 
    }
  }

  const form = useForm({
    initialValues: {
      title: postDetails.title,
      content: postDetails.content,
      image: postDetails.image,
      category: postDetails.category,
      userId: postDetails.userId,
      id: postDetails.id
    }
  });

  return (
    <div className={classes.wrapper}>
      <Paper 
        className={classes.card} 
        sx={{ justifyContent:'center', paddingBottom: '30px'}} 
        shadow="md" 
        radius="lg">
        <form onSubmit={form.onSubmit(onSaveDetails)}>
          <TextInput
            mt="lg"
            label="Title"
            name="title"
            variant="filled"
            sx={{ width: '25rem'}}
            {...form.getInputProps('title')} />

          <Textarea
            value={postDetails.content}
            mt="sm"
            label="Content"
            maxRows={10}
            minRows={3}
            autosize
            name="content"
            variant="filled" 
            {...form.getInputProps('content')} />

          <TextInput
            label="Image"
            placeholder="Image"
            mt="sm"
            name="image"
            variant="filled"
            {...form.getInputProps('image')} />

          <TextInput
            label="Category"
            placeholder="Category"
            mt="sm"
            name="category"
            variant="filled"
            {...form.getInputProps('category')} />
          
          <Group position="center" mt="xl">
            <Button type="submit" size="md">
              Save
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
