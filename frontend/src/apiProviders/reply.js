import generateAxios from 'config/axios';
import normalize from 'json-api-normalizer';

const axios = generateAxios('reply');

const fetchAll = async () => {
  const res = await axios({
    method: 'get',
    url: '/',
  });

  const normalizedData = normalize(res.data);

  return {
    replies: normalizedData.reply || {},
  };
};

const reply = async ({ id, text }) => {
  const res = await axios({
    method: 'post',
    url: '/',
    data: { id, text },
  });

  const normalizedData = normalize(res.data);
  return {
    replies: normalizedData.reply || {},
  };
};

const editReply = async ({ id, text }) => {
  const res = await axios({
    method: 'put',
    data: { text },
    url: `/${id}`,
  });

  const normalizedData = normalize(res.data);
  return {
    replies: normalizedData.reply || {},
  };
};

const deleteReply = async ({ id }) => {
  const res = await axios({
    method: 'delete',
    url: `/${id}`,
  });

  const normalizedData = normalize(res.data);
  return {
    replies: normalizedData.reply || {},
  };
};

export default {
  reply,
  fetchAll,
  editReply,
  deleteReply,
};
