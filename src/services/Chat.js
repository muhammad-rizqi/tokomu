import {api} from './global_var/api';

export const getChatList = (userId, token) => {
  return api('GET', `/user/${userId}/chat`, null, token);
};

export const getChatMessages = (userId, fromId, token) => {
  return api(
    'POST',
    `/chat/user/${userId}`,
    JSON.stringify({from: fromId}),
    token,
  );
};

export const sendMessage = (userId, toId, chat, token) => {
  const body = {
    to: toId,
    chat: chat,
  };

  return api('POST', `/chat/send/${userId}`, JSON.stringify(body), token);
};

export const deleteMessage = (chatId, token) => {
  return api('DELETE', `/chat/${chatId}`, null, token);
};

export const deleteChatMessages = (userId, fromId, token) => {
  return api(
    'POST',
    '/chat/user',
    JSON.stringify({from: fromId, to: userId}),
    token,
  );
};
