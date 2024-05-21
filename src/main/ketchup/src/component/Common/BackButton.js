import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from "styled-components";

const Icon = styled(IoMdArrowRoundBack)`
  font-size: 3vh;
  color: #c35050;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
`;

const Backbutton = () => {
  const navigate = useNavigate(-1);

  const BackClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <Button onClick={BackClick}>
        <Icon IoMdArrowRoundBack />
      </Button>
    </div>
  );
};

export default Backbutton;
