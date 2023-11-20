import React, { useEffect } from 'react';
import { showToastSuccess } from '../utils/toast';
import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';
import { setMessage } from '../redux/slices/MessageSlice';
import {
  joinPaths,
  GET_WS_ACCESS_TOKEN_URL,
  WS_URL,
} from '../config';

function Notification() {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const inChatScreen = useAppSelector(state => state.inChatScreen);
  useEffect(() => {
    if (!user.accessToken) {
      return;
    }
    fetch(GET_WS_ACCESS_TOKEN_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then(async res => res.json()).then(res => {
      const token = res.token;
      const ws = new WebSocket(joinPaths(WS_URL, token));
      const connectSocket = (clearReconect?: () => void) => {
        ws.onopen = () => {
          clearReconect?.();
        };

        ws.onmessage = e => {
          const data = JSON.parse(e.data);
          console.log(data);
          
          // console.log(inChatScreen.friendId, data.message.from_user_id);
          if (inChatScreen.friendId != data.message.from_user_id) {
            showToastSuccess(data.message.title, data.message.body);
          }
          dispatch(setMessage({
            id: data.message.message.id,
            from_user: {
              id: data.message.message.from_user_id,
              name: data.message.message.from_user_name,
            },
            content: data.message.message.content,
            created_at: data.message.message.created_at,
          }));
        };
      }
      connectSocket();
      ws.onerror = () => {
        const reConnect = setInterval(() => {
          connectSocket(() => clearInterval(reConnect));
        }, 500);
      };
      return () => {
        ws.close = () => {
        };
      };
    }).catch(err => console.error(err));
  }, []);
  return <></>;
}

export default Notification;
