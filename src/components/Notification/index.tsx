import React, {useCallback, useEffect} from 'react';
import {ws} from '../../utils/socket';
import {showToastSuccess} from '../../utils/toast';
import {useAppDispatch} from '../../redux/hooks';
import {setNotification} from '../../redux/slices/NotificationSlice';

function Notification() {
  const dispatch = useAppDispatch();

  const connectSocket = useCallback(
    (clearReconect?: () => void) => {
      ws.onopen = () => {
        console.log('open socket');
        clearReconect?.();
      };

      ws.onmessage = e => {
        showToastSuccess(e.data, 'Xin chào');
        dispatch(setNotification({title: e.data}));
      };
    },
    [dispatch],
  );

  useEffect(() => {
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
  }, [connectSocket]);

  return <></>;
}

export default Notification;
