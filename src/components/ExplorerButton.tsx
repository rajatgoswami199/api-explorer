import styled from 'styled-components';

const Button = styled.button`
  background-color: #479ED1;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3583a7;
  }
`;

const ExploreButton = ({ onClick }: { onClick: () => void }) => (
  <Button onClick={onClick}>Explore Web APIs</Button>
);

export default ExploreButton;
