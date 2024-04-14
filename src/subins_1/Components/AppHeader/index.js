import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useMessage2 } from "../../../MessageContext2";
import './Modal.css'
function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { message2 } = useMessage2();

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const handleClick = () => {
    // Add navigation logic here
    navigate('/'); // Navigate to the signout route
  };
  
  const handleRepo = () => {
    // Retrieve the saved file URL from local storage
    const downloadedReport = localStorage.getItem('downloadedReport');
  
    if (downloadedReport) {
      // Check if the downloaded report is an image
      if (downloadedReport.startsWith('data:image')) {
        // Create a new image element
        const img = new Image();
        // Set the source of the image to the data URL
        img.src = downloadedReport;
  
        // Wait for the image to load
        img.onload = () => {
          // Create a modal container element
          const modalContainer = document.createElement('div');
          modalContainer.classList.add('modal-container');
  
          // Create a modal content element
          const modalContent = document.createElement('div');
          modalContent.classList.add('modal-content');
  
          // Create a close button element
          const closeButton = document.createElement('span');
          closeButton.classList.add('close');
          closeButton.innerHTML = '&times;'; // Close icon
          closeButton.onclick = () => {
            // Close the modal when the close button is clicked
            modalContainer.remove();
          };
  
          // Append the close button and image to the modal content
          modalContent.appendChild(closeButton);
          modalContent.appendChild(img);
  
          // Append the modal content to the modal container
          modalContainer.appendChild(modalContent);
  
          // Append the modal container to the document body
          document.body.appendChild(modalContainer);
        };
      } else {
        // Handle other file types (e.g., PDF, documents)
        // You can open the file in a new tab or use a PDF viewer component
        window.open(downloadedReport, '_blank');
      }
    } else {
      // Handle the case when the file URL is not found in local storage
      console.log('No downloaded report found in local storage.');
    }
  };
  

  return (
    <div className="AppHeader">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTap8M2SIS4STWQetk2jhhV6Gk718EF2TJs5g&usqp=CAU"
        alt="Logo"
        width={60}
      />
      <center><h1>BENGALURU DISTRICT POLICE</h1></center>
      <Space>
        <button onClick={handleClick}>Signout</button>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={message2.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <Typography>
          <ol>
            <li>
              A report from PI is Received : <button onClick={handleRepo}>View Report</button>
            </li>
          </ol>
        </Typography>
      </Drawer>
    </div>
  );
}

export default AppHeader;
