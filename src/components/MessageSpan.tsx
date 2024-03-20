interface props {
  message: {
    text: string;
    error: boolean;
  };
}

const MessageSpan = ({ message }: props) => {
  return (
    <>
      {message.error ? (
        <span className="message error">{message.text}</span>
      ) : (
        <span className="message good">{message.text}</span>
      )}
    </>
  );
};

export default MessageSpan;
