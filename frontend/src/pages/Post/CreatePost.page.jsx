import axios from 'axios';
import DOMAIN from '../../services/endpoint';
import { getAccessToken } from '../../services/jwt.service';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { 
  TextInput, 
  Button, 
  Group, 
  Box,
  Paper,
  rem,
  Title,
  createStyles
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  box: {
    justifyContent: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    width: '50rem',
    borderRadius: theme.radius.lg,
    padding: rem(4),
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
  }
}));

function CreatePostPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  const handleSubmit = async (values) => {
    const token = getAccessToken();
    const res = await axios.post(`${DOMAIN}/api/posts`, {...values, token: token});
    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.box} shadow="md" radius="lg">
        <Box maw={300} mx="auto" pt={30} pb={30}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Title sx={{textAlign: 'center'}}>Create Post</Title>

            <TextInput
              mt="lg"
              label="Title"
              placeholder="Enter a Title"
              {...form.getInputProps("title")}
            />

            <TextInput
              label="Category"
              placeholder="Enter a Category"
              {...form.getInputProps("category")}
            />
            <TextInput
              label="Image"
              placeholder="Enter an Image"
              {...form.getInputProps("image")}
            />

            <TextInput
              label="Content"
              placeholder="Enter some content"
              {...form.getInputProps("content")}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Paper>
    </div>
  );
}

export default CreatePostPage;
