import axios from 'axios';
import DOMAIN from '../../services/endpoint';
import { getAccessToken } from '../../services/jwt.service';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { 
  TextInput, 
  Button, 
  Group, 
  Box 
} from '@mantine/core';

function CreatePostPage() {
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
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
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
  );
}

export default CreatePostPage;
