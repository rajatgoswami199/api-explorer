import React, { useState } from 'react';
import styled from 'styled-components';
import { getSubItemList } from '../services/apiService';
interface SidebarProps {
  isOpen: boolean;
  providers: any[];
  onSelectProvider: (provider: string) => void;
  onClose: () => void;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 350px;
  height: 100%;
  background-color: #495f78;
  color: white;
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? '0' : '-450px')};
  top: 0;
  transition: right 0.3s ease;
  z-index: 1001;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fading background */
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')}; /* Disable click-through when closed */
  transition: opacity 0.3s ease;
  z-index: 1000; /* Ensure the overlay is behind the sidebar */
`;

const MenuItem = styled.div<{ isSubMenuOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background: ${props => (props.isSubMenuOpen ? '#1D2631' : '#495f78')}; /* Updated background color */
  color: white; /* Text color set to white */
  margin: 5px 0;
  border: none;
`;

const SubList = styled.ul<{ show: boolean }>`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const ListItem = styled.li`
  padding: 8px;
  margin: 0;
  background: #1d2631;
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 24px; /* Set a fixed width */
  height: 24px; /* Set a fixed height */
  margin-right: 10px; /* Space between image and text */
`;

function Sidebar({ isOpen, providers, onSelectProvider, onClose }: SidebarProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [subList, setSubList] = useState<any[]>([]);
  const handleToggle = async (index: number, item: string) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setSubList([]);
    } else {
      try {
        getSubItemList(item).then(data => {
            const sub =  Object.keys(data.apis).map(key => ({
                name: key,
                logoUrl: data.apis[key].info['x-logo'].url,
                link : data.apis[key].link
              })); 
              setSubList(sub);
            }
            );
        setOpenIndex(index);
      } catch (error) {
        console.error("Error fetching sub-list:", error);
      }
    }
  };
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <div>Select Provider</div>
        {providers.map((item, index) => (
        <div key={index}>
          <MenuItem onClick={() => handleToggle(index, item)} isSubMenuOpen={openIndex === index}>
            <span>{item}</span>
            <span>{openIndex === index ? ' ▲' : ' ▼'}</span>
          </MenuItem>
          <SubList show={openIndex === index}>
            {subList.map((subItem, subIndex) => (
                <ListItem key={subIndex} onClick={() => onSelectProvider(subItem.link)}>
                <ItemImage src={subItem.logoUrl} alt={subItem.name} />
                <span>{subItem.name}</span>
              </ListItem>
            ))}
          </SubList>
        </div>
      ))}
      </SidebarContainer>
      <Overlay isOpen={isOpen} onClick={onClose} />
    </>
  );
}

export default Sidebar;
