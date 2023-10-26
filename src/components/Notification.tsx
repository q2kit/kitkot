import React, { useEffect } from 'react';
import { showToastSuccess } from '../utils/toast';
import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';
import { setNotification } from '../redux/slices/NotificationSlice';
import {
  joinPaths,
  GET_WS_ACCESS_TOKEN_URL,
  WS_URL,
} from '../config';

function Notification() {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
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
          console.log('open socket');
          clearReconect?.();
        };

        ws.onmessage = e => {
          const data = JSON.parse(e.data);
          showToastSuccess(data.message.title, data.message.body);
          dispatch(setNotification({ title: data.message.title }));
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
          console.log('close socket');
        };
      };
    }).catch(err => console.error(err));
  }, []);
  return <></>;
}

export default Notification;
