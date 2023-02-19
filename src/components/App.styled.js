import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
export const LoadMoreBtn = styled.button`
  transition: background 0.8s;
  :hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
      center/15000%;
  }
  :active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
  /* Button style */
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 12px;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: #2196f3;
  box-shadow: 0 0 4px #999;
  outline: none;
`;
