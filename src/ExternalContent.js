import React, { useState, useEffect } from 'react';

const ExternalContent = () => {
  const [externalContent, setExternalContent] = useState('');

  console.log('Fetching data from:');

  useEffect(() => {
    // Log the current route when the component mounts
    console.log('Current route:', window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchExternalContent = async () => {
      try {
        const response = await fetch('/api'+ window.location.pathname);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const content = await response.text();
        const modifiedContent = modifyContent(content);

        setExternalContent(modifiedContent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExternalContent();
  }, []);

  
  const modifyContent = (htmlContent) => {
    // Create a temporary DOM element to manipulate the HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    // Update links with the 'api/' prefix
    const links = tempElement.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('api/')) {
        link.setAttribute('href', `api/${href}`);
      }
    });

    // Update image sources with the 'api/' prefix
    const images = tempElement.querySelectorAll('img');
    images.forEach((image) => {
      const src = image.getAttribute('src');
      if (src && !src.startsWith('api/')) {
        image.setAttribute('src', `api/${src}`);
      }
    });

    // Return the modified HTML content
    return tempElement.innerHTML;
  };


  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Back 2 Backend</h1>
      <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Kodlayarak çözebileceğiniz bulmaca. Denemeye var mısın ?</h2>
      <div class="link-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a href="/0.html" className="link">Algoritmik bulmaca</a>
          <a href="api/link2" className="link">Teknik Bulmaca.</a>
        </div>
      <div dangerouslySetInnerHTML={{ __html: externalContent }} />
      <style>
        {`
          body {
            color: #FFFFFF;
            background-color: #000000;
            font-family: Arial;
          }
          h1 {
            font-family: Arial;
          }
          a:link {
            color: gold;
          }
          a:visited {
            color: gold;
          }
          a:hover {
            color: #FFFF00;
          }
          a:active {
            color: #FFFFFF;
          }
          .link-container {
            display: flex;
            margin-top: 20px;
          }
          .link {
            text-decoration: none;
            padding: 10px 20px;
            border: 2px solid gold;
            color: gold;
            border-radius: 5px;
            transition: background-color 0.3s, color 0.3s;
            margin-right: 10px; /* Adjust the margin to add space between links */
          }
          .link:last-child {
            margin-right: 0; /* Remove margin for the last link */
          }
          .link:hover {
            background-color: gold;
            color: #000000;
          }
        `}
      </style>
    </div>
  );
};

export default ExternalContent;