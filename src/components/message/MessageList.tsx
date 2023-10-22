import React, {memo, useCallback} from 'react';
import {VirtualizedList} from 'react-native';
import Message from './Message';

interface IMessageListProps {
  messageList: any[];
}

function MessageList(props: IMessageListProps) {
  const {messageList} = props;

  const getItem = useCallback((data: any[], index: number) => {
    return data[index];
  }, []);

  const getItemCount = useCallback((data: any[]) => data.length, []);

  return (
    <VirtualizedList
      inverted
      data={messageList}
      showsVerticalScrollIndicator={false}
      initialNumToRender={20}
      renderItem={({item}) => <Message message={item} />}
      keyExtractor={item => `${item.id}`}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
}

export default memo(MessageList);
