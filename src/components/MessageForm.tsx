import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Message } from "../model/Message";
import UserContext from "../context/UserContext";
import styles from '../styles/MessageForm.module.css';

interface MessageFormProps {
  onNewMessage: (message: Message) => void;
}

const MessageForm = ({ onNewMessage }: MessageFormProps) => {
  const [message, setMessage] = useState("");
  const userContext = useContext(UserContext);
  const handleOnSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (userContext.currentUser) {
      onNewMessage({
        id: Math.random() + "",
        date: new Date(),
        userId: userContext.currentUser.id,
        content: message,
      });
      setMessage("");
    }
  };
  return (
    <div>
      <Form className={styles.MessageForm} inline onSubmit={handleOnSubmit}>
        <Form.Label htmlFor="message" srOnly>
          Message
        </Form.Label>
        <Form.Control
          className="mr-2"
          id="message"
          placeholder="Type a message..."
          type="text"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={!userContext.currentUser}
        />
        <Button
          type="submit"
          className=""
          variant="light"
          disabled={!userContext.currentUser}
        >
          <img src="/SMS.png" alt="Send" />
        </Button>
      </Form>
    </div>
  );
};

export default MessageForm;
