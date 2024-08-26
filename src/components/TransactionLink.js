import React from 'react';
import styled from 'styled-components';

const LinkWrapper = styled.div`
  margin-top: 1rem;
`;

const StyledLink = styled.a`
  color: #3498db;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
function TransactionLink({ txHash }) {
    if (!txHash) return null;
  
    const etherscanUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
  
    return (
      <LinkWrapper>
        <StyledLink href={etherscanUrl} target="_blank" rel="noopener noreferrer">
          View transaction on Etherscan
        </StyledLink>
      </LinkWrapper>
    );
  }
  export default TransactionLink;
